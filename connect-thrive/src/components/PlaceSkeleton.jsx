export default function PlaceSkeleton() {
  return (
    <div className="place-card skeleton-card">
      <div className="skeleton card-photo-placeholder" />
      <div className="card-body">
        <div className="skeleton skeleton-line" style={{ width: "70%", height: 18, marginBottom: 8 }} />
        <div className="skeleton skeleton-line" style={{ width: "90%", height: 13, marginBottom: 10 }} />
        <div className="skeleton skeleton-line" style={{ width: "50%", height: 13, marginBottom: 10 }} />
        <div style={{ display: "flex", gap: 6 }}>
          <div className="skeleton skeleton-line" style={{ width: 60, height: 22 }} />
          <div className="skeleton skeleton-line" style={{ width: 60, height: 22 }} />
        </div>
      </div>
    </div>
  );
}