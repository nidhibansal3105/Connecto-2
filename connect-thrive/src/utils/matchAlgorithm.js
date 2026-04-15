// ─────────────────────────────────────────────────────────────
//  matchingAlgorithm.js
//  Pure function that computes a match score (0-100) between
//  the current user's profile and any other student profile.
//
//  WEIGHTS (must sum to 100):
//    interests / fields  → 25
//    hobbies             → 20
//    sports              → 15
//    travel style        → 15
//    food preferences    → 10
//    personality / vibe  → 10
//    campus proximity    → 5
// ─────────────────────────────────────────────────────────────

/**
 * Returns how many items two arrays share.
 * @param {string[]} a
 * @param {string[]} b
 * @returns {number}
 */
function sharedCount(a = [], b = []) {
  return a.filter((x) => b.includes(x)).length;
}

/**
 * Overlap score 0-1 for two arrays.
 * Uses Jaccard-style: intersection / max(|a|, |b|, 1)
 */
function overlapScore(a = [], b = []) {
  if (!a.length && !b.length) return 0;
  const shared = sharedCount(a, b);
  return shared / Math.max(a.length, b.length, 1);
}

/**
 * Computes a 0-100 integer match score.
 *
 * @param {object} myProfile     - Current user's onboarding answers
 * @param {object} otherProfile  - Another student's stored profile
 * @returns {{ score: number, reasons: string[] }}
 */
export function computeMatchScore(myProfile, otherProfile) {
  const reasons = [];

  // 1. Field / career interests (weight 25)
  const fieldOverlap = overlapScore(myProfile.fieldPref, otherProfile.fieldPref);
  const fieldScore = fieldOverlap * 25;
  if (fieldOverlap > 0.4) reasons.push("Similar career interests");

  // 2. Hobbies (weight 20)
  const hobbyOverlap = overlapScore(myProfile.hobbies, otherProfile.hobbies);
  const hobbyScore = hobbyOverlap * 20;
  if (hobbyOverlap > 0.3) reasons.push("Shared hobbies & passions");

  // 3. Sports (weight 15)
  const sportsOverlap = overlapScore(myProfile.sports, otherProfile.sports);
  const sportsScore = sportsOverlap * 15;
  if (sportsOverlap > 0.3) reasons.push("Love the same sports");

  // 4. Travel style (weight 15)
  const travelOverlap = overlapScore(myProfile.placePref, otherProfile.placePref);
  const travelScore = travelOverlap * 15;
  if (travelOverlap > 0.3) reasons.push("Compatible travel vibes");

  // 5. Food preferences (weight 10)
  const foodOverlap = overlapScore(myProfile.food, otherProfile.food);
  const foodScore = foodOverlap * 10;
  if (foodOverlap > 0.3) reasons.push("Similar food tastes");

  // 6. Personality match (weight 10)
  // Extrovert ↔ Extrovert = 1.0, Ambivert = 0.6, Introvert = 0.2
  const personalityMatrix = {
    E: { E: 1.0, A: 0.6, I: 0.2 },
    A: { E: 0.6, A: 1.0, I: 0.6 },
    I: { E: 0.2, A: 0.6, I: 1.0 },
  };
  const myP = myProfile.personality || "A";
  const otherP = otherProfile.personality || "A";
  const personalityScore =
    ((personalityMatrix[myP]?.[otherP]) ?? 0.5) * 10;

  // 7. Campus proximity: same year & same dept (weight 5)
  let proximityScore = 0;
  if (myProfile.year === otherProfile.year) proximityScore += 2.5;
  if (myProfile.dept === otherProfile.dept) {
    proximityScore += 2.5;
    reasons.push("Same department");
  }

  const total = Math.round(
    fieldScore + hobbyScore + sportsScore +
    travelScore + foodScore + personalityScore + proximityScore
  );

  // Cap between 0 and 100
  const score = Math.min(100, Math.max(0, total));

  // Build a short human-readable "why" string
  const why =
    reasons.length > 0
      ? reasons.slice(0, 3).join(" · ")
      : "You might enjoy getting to know each other!";

  return { score, why };
}

/**
 * Ranks an array of student profiles against myProfile.
 * Returns them sorted highest → lowest with score + why attached.
 *
 * @param {object}   myProfile
 * @param {object[]} students
 * @returns {object[]}  students with { ...student, score, why }
 */
export function rankMatches(myProfile, students) {
  return students
    .map((s) => ({ ...s, ...computeMatchScore(myProfile, s) }))
    .sort((a, b) => b.score - a.score);
}
