import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import { Shield, Mail, Calendar, Key, CheckCircle, AlertCircle, Edit, Activity, Check } from "lucide-react";

const UserProfile = () => {
  const { user, updateCurrentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await API.put(`/users/${user.id}`, { name, email });
      if (response.data?.success) {
        updateCurrentUser(response.data.user);
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile details");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="main-content" style={{ textAlign: "center" }}>
        <span className="spinner"></span>
      </div>
    );
  }

  // Initials for avatar
  const avatarInitials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  // Mock activity logs
  const MOCK_ACTIVITIES = [
    { text: "Estimated Capital Subsidy for Zone C project", time: "10 mins ago" },
    { text: "Matched brand franchise for 80-key Business Hotel", time: "1 hour ago" },
    { text: "Generated 5-Year cash flow feasibility projection", time: "Yesterday" },
    { text: "Logged into Sol & Sands Portal", time: "2 days ago" }
  ];

  return (
    <div className="main-content" style={{ minHeight: "calc(100vh - 80px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", width: "100%", maxWidth: "900px" }}>
        
        {/* Profile Info & Edit Panel */}
        <div className="glass-panel" style={{ padding: "2.5rem", borderRadius: "var(--radius-lg)", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          
          <div style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--vp-accent-purple), var(--vp-accent-indigo))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.2rem",
            fontWeight: "800",
            color: "white",
            marginBottom: "1.5rem",
            boxShadow: "0 0 25px rgba(2, 132, 199, 0.25)",
            border: "2px solid rgba(255, 255, 255, 0.1)"
          }}>
            {avatarInitials}
          </div>

          <h2 style={{ fontSize: "1.75rem", fontWeight: "700", color: "var(--vp-text-white)", marginBottom: "0.25rem" }}>{user.name}</h2>
          
          <div 
            className={`user-badge ${user.role === "admin" ? "admin" : ""}`}
            style={{ display: "inline-flex", gap: "6px", alignItems: "center", padding: "0.35rem 0.85rem", borderRadius: "30px", marginBottom: "2rem" }}
          >
            {user.role === "admin" ? <Shield size={14} /> : <Calendar size={14} />}
            <span style={{ textTransform: "capitalize", fontSize: "0.8rem", fontWeight: "600" }}>{user.role} Advisor</span>
          </div>

          {error && (
            <div className="alert alert-error" style={{ width: "100%", marginBottom: "1rem" }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-success" style={{ width: "100%", marginBottom: "1rem" }}>
              <CheckCircle size={18} />
              <span>{success}</span>
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleUpdate} style={{ textAlign: "left", width: "100%" }}>
              <div className="form-group">
                <label className="form-label" style={{ color: "hsl(var(--text-secondary))", fontSize: "0.75rem" }}>Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: "1rem" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                <label className="form-label" style={{ color: "hsl(var(--text-secondary))", fontSize: "0.75rem" }}>Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: "1rem" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Details"}
                </button>
              </div>
            </form>
          ) : (
            <div style={{ width: "100%", textAlign: "left" }}>
              <div className="profile-details-grid" style={{ marginBottom: "1.5rem" }}>
                <div className="profile-detail-row">
                  <span className="detail-label">Account E-mail</span>
                  <span className="detail-value" style={{ color: "var(--vp-text-white)" }}>{user.email}</span>
                </div>
                <div className="profile-detail-row">
                  <span className="detail-label">Advisor ID</span>
                  <span className="detail-value" style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--vp-text-white)" }}>{user.id || user._id}</span>
                </div>
                <div className="profile-detail-row">
                  <span className="detail-label">Portal Authority</span>
                  <span className="detail-value" style={{ textTransform: "capitalize", color: "var(--vp-text-white)" }}>{user.role} Privilege</span>
                </div>
              </div>

              {user.role === "admin" ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary"
                >
                  <Edit size={16} />
                  <span>Modify Account Details</span>
                </button>
              ) : (
                <p style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", margin: 0, textAlign: "center", lineHeight: "1.4" }}>
                  ℹ Account changes require administrator permissions. If modifications are required, submit an advisory ticket.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Clearances & Activities Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Active Clearances */}
          <div className="glass-panel" style={{ padding: "2rem", borderRadius: "var(--radius-lg)" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--vp-text-white)", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "8px" }}>
              🛡 Portal Access Clearances
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifycontent: "space-between", background: "rgba(255, 255, 255, 0.02)", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
                <span style={{ fontSize: "0.85rem", color: "hsl(var(--text-secondary))" }}>Project Viability Models</span>
                <span className="user-badge" style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--vp-accent-green)", borderColor: "rgba(16, 185, 129, 0.3)", fontSize: "0.7rem", padding: "0.15rem 0.5rem" }}>✓ Approved</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifycontent: "space-between", background: "rgba(255, 255, 255, 0.02)", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
                <span style={{ fontSize: "0.85rem", color: "hsl(var(--text-secondary))" }}>Franchise Brand Auditing</span>
                <span className="user-badge" style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--vp-accent-green)", borderColor: "rgba(16, 185, 129, 0.3)", fontSize: "0.7rem", padding: "0.15rem 0.5rem" }}>✓ Approved</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifycontent: "space-between", background: "rgba(255, 255, 255, 0.02)", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
                <span style={{ fontSize: "0.85rem", color: "hsl(var(--text-secondary))" }}>Tourism Government Subsidies</span>
                <span className="user-badge" style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--vp-accent-green)", borderColor: "rgba(16, 185, 129, 0.3)", fontSize: "0.7rem", padding: "0.15rem 0.5rem" }}>✓ Approved</span>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="glass-panel" style={{ padding: "2rem", borderRadius: "var(--radius-lg)", flexGrow: 1 }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--vp-text-white)", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <Activity size={18} style={{ color: "var(--vp-accent-purple)" }} />
              Recent Audit Log
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {MOCK_ACTIVITIES.map((act, idx) => (
                <div key={idx} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--vp-accent-purple)", marginTop: "6px", boxShadow: "0 0 8px var(--vp-accent-purple)" }}></div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--vp-text-white)" }}>{act.text}</span>
                    <span style={{ fontSize: "0.7rem", color: "hsl(var(--text-muted))" }}>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default UserProfile;
