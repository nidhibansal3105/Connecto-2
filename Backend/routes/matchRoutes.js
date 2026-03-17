const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// ============================================
// Middleware: Authenticate Token
// ============================================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// ============================================
// ROUTE 1: Find Hometown Buddies
// ============================================
router.get("/hometown-buddies", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const db = req.db;

    // Get current user's hometown and coordinates
    const [currentUser] = await db.query(
      "SELECT username, hometown, latitude, longitude FROM users WHERE id = ?",
      [userId],
    );

    if (!currentUser || currentUser.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userHometown = currentUser[0].hometown;
    const userLat = currentUser[0].latitude;
    const userLng = currentUser[0].longitude;

    // Check if user has set hometown
    if (!userHometown || userHometown.trim() === "") {
      return res.json({
        success: true,
        count: 0,
        buddies: [],
        userLocation: {
          hometown: null,
          lat: null,
          lng: null,
        },
        message: "Please set your hometown in your profile to find buddies",
      });
    }

    let query;
    let params;

    // Strategy 1: If user has GPS coordinates, find nearby users within 50km
    if (userLat && userLng) {
      query = `
        SELECT 
          u.id,
          u.username,
          u.email,
          u.hometown,
          u.bio,
          u.profile_picture,
          u.latitude,
          u.longitude,
          (6371 * acos(
            cos(radians(?)) * 
            cos(radians(u.latitude)) * 
            cos(radians(u.longitude) - radians(?)) + 
            sin(radians(?)) * 
            sin(radians(u.latitude))
          )) AS distance_km,
          (
            SELECT GROUP_CONCAT(c.name SEPARATOR ',')
            FROM user_communities uc
            JOIN communities c ON uc.community_id = c.id
            WHERE uc.user_id = u.id
          ) AS communities
        FROM users u
        WHERE u.id != ? 
        AND u.latitude IS NOT NULL 
        AND u.longitude IS NOT NULL
        HAVING distance_km <= 50
        ORDER BY distance_km ASC
        LIMIT 50
      `;
      params = [userLat, userLng, userLat, userId];
    } else {
      // Strategy 2: Fallback - Match by hometown string (case-insensitive)
      query = `
        SELECT 
          u.id,
          u.username,
          u.email,
          u.hometown,
          u.bio,
          u.profile_picture,
          (
            SELECT GROUP_CONCAT(c.name SEPARATOR ',')
            FROM user_communities uc
            JOIN communities c ON uc.community_id = c.id
            WHERE uc.user_id = u.id
          ) AS communities
        FROM users u
        WHERE u.id != ? 
        AND LOWER(TRIM(u.hometown)) = LOWER(TRIM(?))
        LIMIT 50
      `;
      params = [userId, userHometown];
    }

    const [buddies] = await db.query(query, params);

    // Format response
    const formattedBuddies = buddies.map((buddy) => ({
      id: buddy.id,
      username: buddy.username,
      email: buddy.email,
      hometown: buddy.hometown,
      bio: buddy.bio || "",
      profilePicture: buddy.profile_picture || null,
      distance: buddy.distance_km ? Math.round(buddy.distance_km) : null,
      communities: buddy.communities ? buddy.communities.split(",") : [],
    }));

    res.json({
      success: true,
      count: formattedBuddies.length,
      buddies: formattedBuddies,
      userLocation: {
        hometown: userHometown,
        lat: userLat,
        lng: userLng,
      },
    });
  } catch (error) {
    console.error("❌ Hometown buddies error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to find hometown buddies",
      message: error.message,
    });
  }
});

// ============================================
// ROUTE 2: Find Matches (Based on Communities)
// ============================================
router.get("/find-matches", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const db = req.db;

    // Get user's communities
    const [userCommunities] = await db.query(
      "SELECT community_id FROM user_communities WHERE user_id = ?",
      [userId],
    );

    if (userCommunities.length === 0) {
      return res.json({
        success: true,
        count: 0,
        matches: [],
        message: "Join communities to find matches",
      });
    }

    const communityIds = userCommunities.map((uc) => uc.community_id);

    // Find users with matching communities
    const [matches] = await db.query(
      `
      SELECT 
        u.id,
        u.username,
        u.email,
        u.hometown,
        u.bio,
        u.profile_picture,
        COUNT(DISTINCT uc.community_id) AS shared_communities,
        GROUP_CONCAT(DISTINCT c.name) AS community_names
      FROM users u
      INNER JOIN user_communities uc ON u.id = uc.user_id
      INNER JOIN communities c ON uc.community_id = c.id
      WHERE u.id != ? 
      AND uc.community_id IN (?)
      GROUP BY u.id
      ORDER BY shared_communities DESC
      LIMIT 50
    `,
      [userId, communityIds],
    );

    const formattedMatches = matches.map((match) => ({
      id: match.id,
      username: match.username,
      email: match.email,
      hometown: match.hometown,
      bio: match.bio || "",
      profilePicture: match.profile_picture || null,
      sharedCommunities: match.shared_communities,
      communities: match.community_names
        ? match.community_names.split(",")
        : [],
    }));

    res.json({
      success: true,
      count: formattedMatches.length,
      matches: formattedMatches,
    });
  } catch (error) {
    console.error("❌ Find matches error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to find matches",
      message: error.message,
    });
  }
});

module.exports = router;
