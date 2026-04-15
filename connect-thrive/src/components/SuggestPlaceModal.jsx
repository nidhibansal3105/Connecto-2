// src/components/SuggestPlaceModal.jsx
import { useState } from "react";

export default function SuggestPlaceModal({ category, onClose }) {
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    googleMapsUrl: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Suggestion submitted:", { ...form, category });
    setSubmitted(true);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Suggest a Place</h3>
          <p>Category: <strong>{category}</strong></p>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {submitted ? (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h4>Thanks for the suggestion!</h4>
            <p>It will be reviewed and added shortly.</p>
            <button className="btn-primary" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="suggest-form">
            <div className="form-group">
              <label>Place Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Cafe Drip"
                required
              />
            </div>
            <div className="form-group">
              <label>Location / Address *</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Near NIT Gate, Kurukshetra"
                required
              />
            </div>
            <div className="form-group">
              <label>Why do you recommend it?</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="What's special about this place?"
              />
            </div>
            <div className="form-group">
              <label>Google Maps Link (optional)</label>
              <input
                type="url"
                name="googleMapsUrl"
                value={form.googleMapsUrl}
                onChange={handleChange}
                placeholder="https://maps.google.com/..."
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Submit Suggestion
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}