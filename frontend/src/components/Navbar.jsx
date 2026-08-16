import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, Hotel, LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Hotel size={28} style={{ stroke: "url(#accent-grad)" }} />
        <span style={{ fontSize: "1.25rem", fontWeight: "800", letterSpacing: "0.5px" }}>Sol & Sands</span>
        {/* SVG Gradient definition for lucide icon */}
        <svg width="0" height="0">
          <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(263, 90%, 64%)" />
            <stop offset="100%" stopColor="hsl(245, 80%, 60%)" />
          </linearGradient>
        </svg>
      </div>

      <ul className="nav-links" style={{ gap: "1rem" }}>
        <li>
          <Link
            to="/viabilities"
            className={`nav-link ${isActive("/viabilities") ? "active" : ""}`}
          >
            Project Viability
          </Link>
        </li>
        <li>
          <Link
            to="/brand"
            className={`nav-link ${isActive("/brand") ? "active" : ""}`}
          >
            Brand Insights
          </Link>
        </li>
        <li>
          <Link
            to="/subsidy"
            className={`nav-link ${isActive("/subsidy") ? "active" : ""}`}
          >
            Subsidy & Policy
          </Link>
        </li>
        <li>
          <Link
            to="/vendor-planing"
            className={`nav-link ${isActive("/vendor-planing") ? "active" : ""}`}
          >
            Vendor Planning
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={`nav-link ${isActive("/contact") ? "active" : ""}`}
          >
            Contact Us
          </Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link
                to="/dashboard"
                className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
              >
                Dashboard
              </Link>
            </li>
          </>
        )}
      </ul>

      <div className="nav-user">
        {isAuthenticated && user && (
          <>
            <div 
              onClick={() => navigate("/profile")}
              className={`user-badge ${user.role === "admin" ? "admin" : ""}`}
              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}
              title="View Profile Details"
            >
              <User size={14} />
              <span>
                {user.name} ({user.role})
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{ width: "auto", padding: "0.5rem 1rem", display: "flex", gap: "0.5rem", borderRadius: "var(--radius-sm)" }}
            >
              <LogOut size={16} />
              <span style={{ fontSize: "0.85rem" }}>Logout</span>
            </button>
          </>
        )}
        {!isAuthenticated && (
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link to="/login">
              <button
                className="btn btn-secondary"
                style={{ width: "auto", padding: "0.5rem 1rem", display: "flex", gap: "0.5rem", borderRadius: "var(--radius-sm)" }}
              >
                <LogIn size={16} />
                <span style={{ fontSize: "0.85rem" }}>Sign In</span>
              </button>
            </Link>
            <Link to="/register">
              <button
                className="btn btn-primary"
                style={{ width: "auto", padding: "0.5rem 1rem", display: "flex", gap: "0.5rem", borderRadius: "var(--radius-sm)" }}
              >
                <UserPlus size={16} />
                <span style={{ fontSize: "0.85rem" }}>Join Now</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
