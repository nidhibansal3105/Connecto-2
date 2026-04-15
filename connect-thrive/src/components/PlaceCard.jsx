// src/components/PlaceCard.jsx
export default function PlaceCard({ place, getStars, getPriceLabel, onOpenMaps, categoryIcon }) {
  return (
    <div className="place-card">
      {place.photo ? (
        <div className="card-photo-wrap">
          <img src={place.photo} alt={place.name} className="card-photo" loading="lazy" />
          {place.isOpen !== null && (
            <span className={`open-badge ${place.isOpen ? "open" : "closed"}`}>
              {place.isOpen ? "Open now" : "Closed"}
            </span>
          )}
        </div>
      ) : (
        <div className="card-photo-placeholder">
          <span>{categoryIcon || "📍"}</span>
        </div>
      )}

      <div className="card-body">
        <h3 className="place-name">{place.name}</h3>
        <p className="place-location">📍 {place.location}</p>

        <div className="rating-row">
          {place.rating ? (
            <>
              <span className="stars">{getStars(place.rating)}</span>
              <span className="rating-num">{place.rating.toFixed(1)}</span>
              <span className="rating-count">({place.totalRatings.toLocaleString()})</span>
            </>
          ) : (
            <span className="no-rating">No ratings yet</span>
          )}
          {place.priceLevel !== null && (
            <span className="price-tag">{getPriceLabel(place.priceLevel)}</span>
          )}
        </div>

        {place.types.length > 0 && (
          <div className="type-tags">
            {place.types
              .filter((t) => !["point_of_interest", "establishment"].includes(t))
              .slice(0, 3)
              .map((t) => (
                <span key={t} className="type-tag">
                  {t.replace(/_/g, " ")}
                </span>
              ))}
          </div>
        )}

        {/* Show website/phone if available (from Overpass API) */}
        {(place.website || place.phone) && (
          <div className="extra-info">
            {place.website && (
              <a
                href={place.website}
                target="_blank"
                rel="noopener noreferrer"
                className="place-website"
              >
                🌐 Website
              </a>
            )}
            {place.phone && (
              <a href={`tel:${place.phone}`} className="place-phone">
                📞 {place.phone}
              </a>
            )}
          </div>
        )}

        <div className="card-actions">
          <button className="btn-maps" onClick={onOpenMaps}>
            Open in Maps ↗
          </button>
        </div>
      </div>
    </div>
  );
}
