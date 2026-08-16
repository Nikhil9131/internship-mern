import React, { useState } from "react";
import API from "../utils/api";
import { AlertCircle } from "lucide-react";

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", projectType: "city_business", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await API.post("/inquiries", formData);
      if (response.data?.success) {
        setSubmitted(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit advisory request. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ maxWidth: "600px", margin: "6rem auto", padding: "3rem", borderRadius: "var(--radius-lg)" }}>
      <span className="badge" style={{ color: "hsl(var(--accent-primary))", letterSpacing: "2px", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: "700" }}>
        Get In Touch
      </span>
      <h1 style={{ fontSize: "2.5rem", marginTop: "1rem", marginBottom: "1.5rem", background: "linear-gradient(to right, hsl(var(--text-primary)), hsl(var(--accent-primary)))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Connect with an Advisor
      </h1>

      {error && (
        <div className="alert alert-error" style={{ marginBottom: "1.5rem" }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {submitted ? (
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✉️</div>
          <h3 style={{ color: "hsl(var(--text-primary))", marginBottom: "0.5rem" }}>Inquiry Submitted!</h3>
          <p style={{ color: "hsl(var(--text-secondary))" }}>
            Thank you for reaching out. A hospitality project consultant will review your message and contact you within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="form-group">
            <label className="form-label" style={{ display: "block", marginBottom: "0.5rem" }}>Your Name</label>
            <input
              type="text"
              required
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: "block", marginBottom: "0.5rem" }}>Email Address</label>
            <input
              type="email"
              required
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@company.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: "block", marginBottom: "0.5rem" }}>Project Profile</label>
            <select
              className="form-control"
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              style={{ width: "100%", cursor: "pointer" }}
            >
              <option value="city_business">City Business Hotel</option>
              <option value="budget_hotel">Budget Hotel</option>
              <option value="luxury_boutique">Luxury Boutique Hotel</option>
              <option value="nature_resort">Nature Resort</option>
              <option value="marriage_garden">Marriage Garden & Banquet</option>
              <option value="highway_hotel">Highway Transit Hotel</option>
              <option value="heritage_hotel">Heritage Restoration Hotel</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: "block", marginBottom: "0.5rem" }}>Project Description / Inquiry</label>
            <textarea
              rows="4"
              required
              className="form-control"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your site location, room target, or general questions..."
              style={{ resize: "none" }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem" }} disabled={loading}>
            {loading ? "Submitting Request..." : "Submit Advisory Request"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;
