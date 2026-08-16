import React, { useState, useEffect } from "react";
import "./vendor-planning-dark.css";

const ADVISORS = [
  {
    id: "nikhil",
    name: "Nikhil Kumar Rathore",
    role: "Founder & Hospitality Specialist",
    tagline: "Brand Negotiations & Feasibility Audits",
    description: "Expert in brand contracts, franchise tier selection, civil Capex structures, and hospitality viability audits.",
    icon: "👤",
    stat1: "20+ Launched",
    stat2: "12+ Brand Deals",
    stat3: "15+ Years Exp",
    stat4: "5+ Handbooks",
    bio: "Nikhil has over 15 years of transaction and advisory experience in hospitality. He has advised top developers in franchise tier evaluation, brand standard compliance, and arbitrating technical agreements with international brands like Marriott, Radisson, and IHG.",
    warnings: [
      "Avoid signed brand agreements without securing local area exclusion protection.",
      "Property Improvement Plan (PIP) clauses must have pre-negotiated budget limits.",
      "Verify room carpet area compliance with local town planning laws first."
    ],
    risks: [
      "Brand royalty fees escalations can squeeze operational margins.",
      "Delays in brand standard approvals can delay initial opening timelines.",
      "Incorrect F&B space allocations impact banquet sales capacities."
    ],
    achievements: ["Successfully launched 20+ hotels", "Arbitrated 12+ brand agreements", "Authored hospitality feasibility playbooks"],
    email: "nikhil.rathore@forthehotelier.com"
  },
  {
    id: "hitesh",
    name: "Hitesh Kumar",
    role: "Principal Advisory Partner",
    tagline: "Government Subsidies & Clearances",
    description: "Specializes in Tourism Policy 2025 compliance, capital subsidy applications, and government clearances.",
    icon: "💼",
    stat1: "40+ Audits Done",
    stat2: "₹50 Cr+ Secured",
    stat3: "100% Stamp SD",
    stat4: "10+ Years Exp",
    bio: "Hitesh is a policy liaison expert specializing in capital subsidy compliance and government concessions. He has guided developers through complex fire, pollution, and municipal building sanctions, securing over ₹50 Cr+ in policy benefits under MP Tourism regulations.",
    warnings: [
      "Diversion application records must match physical revenue survey markers precisely.",
      "Filing claims past the 180-day operational margin immediately invalidates subsidies.",
      "Environmental consent to operate (CTO) must be active prior to subsidy audits."
    ],
    risks: [
      "Changes in state tourism policy boundaries can impact zone ratings.",
      "Lengthy municipal inspector schedules can delay stamp duty refund checks.",
      "Non-compliance with local employment quotas can lead to subsidy cancellation."
    ],
    achievements: ["Audited 40+ policy subsidy cases", "Secured ₹50 Cr+ in capital concessions", "100% success rate in stamp duty refunds"],
    email: "hitesh@forthehotelier.com"
  },
  {
    id: "mayank",
    name: "Mayank Rathore",
    role: "Revenue Yield Consultant",
    tagline: "RevPAR & Distribution Strategy",
    description: "Expert in GDS configuration, room rate yield optimization, OTA channel audits, and PMS integrations.",
    icon: "📈",
    stat1: "+22% RevPAR",
    stat2: "30+ PMS Networks",
    stat3: "100-Day Target",
    stat4: "8+ Years Exp",
    bio: "Mayank Rathore specializes in rate modeling, distribution system (GDS) configurations, and OTA demand yields. He helps hotel owners optimize pricing tiers, manage commission percentages, and stabilize room yields within the first 100 days of hotel launch.",
    warnings: [
      "Ensure PMS database fields are integrated with brand loyalty channels prior to launch.",
      "OTA commissions must be audited monthly to prevent margin leakage.",
      "Dynamic rate engines should have set floor pricing parameters to protect yields."
    ],
    risks: [
      "Heavy reliance on OTA bookings can dilute gross room yield margins.",
      "PMS sync failures lead to overbookings and guest relocation costs.",
      "Aggressive local rate wars can force ADR below breakeven contribution limits."
    ],
    achievements: ["Boosted RevPAR by average 22%", "Configured 30+ PMS/POS networks", "100-day occupancy stabilization expert"],
    email: "mayank@forthehotelier.com"
  }
];

const AboutUs = () => {
  const [selectedAdvisor, setSelectedAdvisor] = useState(ADVISORS[0]);
  const [isBioOpen, setIsBioOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsBioOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="vendor-planning-scope-root">
      <div className="vendor-planning-scope">
        
        {/* Hero Section */}
        <header className="luxury-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1470&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="hero-overlay"></div>
          <div className="hero-container">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>Advisory Panel Directory</span>
            </div>
            <div className="hero-content">
              <h1>Architects of <span>Hospitality Excellence</span></h1>
              <p>
                An elite advisory council bridging the gap between bold development visions and high-yield operational realities.
              </p>
            </div>
          </div>
        </header>

        {/* Advisor Grid */}
        <section className="planner-section">
          <div className="project-grid" style={{ marginBottom: "3rem" }}>
            {ADVISORS.map((adv) => (
              <div
                key={adv.id}
                onClick={() => setSelectedAdvisor(adv)}
                className={`project-card ${selectedAdvisor.id === adv.id ? "active" : ""}`}
              >
                <div className="project-icon" style={{ fontSize: "1.5rem" }}>{adv.icon}</div>
                <h3>{adv.name}</h3>
                <p>{adv.role}</p>
              </div>
            ))}
          </div>

          {/* Details Panel */}
          <div className="planner-container">
            <div className="project-details-card">
              <div className="details-top">
                <div className="details-left">
                  <div className="details-icon" style={{ fontSize: "1.8rem" }}>{selectedAdvisor.icon}</div>
                  <div className="details-heading">
                    <h2>{selectedAdvisor.name}</h2>
                    <p>{selectedAdvisor.role}</p>
                  </div>
                </div>
                <div className="staffing-chip">
                  <span>Primary Specialization</span>
                  <strong>{selectedAdvisor.tagline}</strong>
                </div>
              </div>

              {/* Highlights Stats */}
              <div className="project-highlights">
                <div className="highlight">
                  <h3>{selectedAdvisor.stat1}</h3>
                  <p>Project Track Record</p>
                </div>
                <div className="highlight">
                  <h3>{selectedAdvisor.stat2}</h3>
                  <p>Franchise & Liaison Deals</p>
                </div>
                <div className="highlight">
                  <h3>{selectedAdvisor.stat3}</h3>
                  <p>Core Industry Experience</p>
                </div>
                <div className="highlight">
                  <h3>{selectedAdvisor.stat4}</h3>
                  <p>Advisory Manuals Authored</p>
                </div>
              </div>

              {/* Info Box Grid */}
              <div className="details-grid">
                
                {/* Warnings Box */}
                <div className="info-box warning-box">
                  <div className="box-head">
                    <span style={{ color: "var(--vp-accent-red)", marginRight: "8px" }}>⚠</span>
                    <h4>Core Advisory Caveats</h4>
                  </div>
                  <ul>
                    {selectedAdvisor.warnings.map((warn, idx) => (
                      <li key={idx}>{warn}</li>
                    ))}
                  </ul>
                </div>

                {/* Risks Box */}
                <div className="info-box risk-box">
                  <div className="box-head">
                    <span style={{ color: "var(--vp-accent-amber)", marginRight: "8px" }}>✖</span>
                    <h4>Primary Industry Risks</h4>
                  </div>
                  <ul>
                    {selectedAdvisor.risks.map((risk, idx) => (
                      <li key={idx}>{risk}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Bio Summary */}
              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--vp-glass-border)", padding: "1.5rem", borderRadius: "12px", marginBottom: "2.5rem" }}>
                <h4 style={{ color: "white", marginBottom: "0.75rem", fontSize: "0.95rem", fontWeight: "600" }}>Consultant Overview</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--vp-text-gray)", lineHeight: "1.6", margin: 0 }}>
                  {selectedAdvisor.bio}
                </p>
              </div>

              <div className="details-buttons" style={{ justifyContent: "center" }}>
                <button
                  onClick={() => setIsBioOpen(true)}
                  className="btn-primary"
                  style={{ border: "none", cursor: "pointer" }}
                >
                  👤 View Bio & Send Message
                </button>
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* Bio Modal */}
      {isBioOpen && (
        <div
          onClick={(e) => {
            if (e.target.id === "bioOverlay") setIsBioOpen(false);
          }}
          id="bioOverlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(30, 37, 64, 0.6)",
            backdropFilter: "blur(16px)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem"
          }}
        >
          <div
            style={{
              background: "var(--vp-glass-bg-hover)",
              border: "1px solid var(--vp-glass-border-active)",
              color: "var(--vp-text-white)",
              maxWidth: "600px",
              width: "100%",
              borderRadius: "var(--radius-lg)",
              padding: "2.5rem",
              position: "relative",
              margin: "auto",
              boxShadow: "0 10px 40px rgba(2, 132, 199, 0.15)"
            }}
          >
            <button
              onClick={() => setIsBioOpen(false)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "transparent",
                border: "none",
                color: "var(--vp-text-gray)",
                fontSize: "1.25rem",
                cursor: "pointer"
              }}
            >
              ✖
            </button>

            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "3rem" }}>{selectedAdvisor.icon}</div>
              <div>
                <h2 style={{ color: "white", fontSize: "1.75rem", margin: 0 }}>{selectedAdvisor.name}</h2>
                <span style={{ fontSize: "0.85rem", color: "var(--vp-accent-purple)", fontWeight: "600" }}>
                  {selectedAdvisor.role}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ color: "white", marginBottom: "0.5rem", fontSize: "0.9rem", letterSpacing: "1px", textTransform: "uppercase" }}>Biography</h4>
              <p style={{ fontSize: "0.9rem", color: "var(--vp-text-gray)", lineHeight: "1.5" }}>
                {selectedAdvisor.bio}
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h4 style={{ color: "white", marginBottom: "0.75rem", fontSize: "0.9rem", letterSpacing: "1px", textTransform: "uppercase" }}>Key Achievements</h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: "8px", padding: 0, margin: 0 }}>
                {selectedAdvisor.achievements.map((ach, idx) => (
                  <li key={idx} style={{ fontSize: "0.85rem", color: "var(--vp-text-gray)", display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ color: "var(--vp-accent-purple)" }}>✔</span> {ach}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--vp-text-gray)" }}>
                📧 {selectedAdvisor.email}
              </span>
              <a
                href={`mailto:${selectedAdvisor.email}`}
                style={{
                  background: "linear-gradient(135deg, var(--vp-accent-purple), var(--vp-accent-indigo))",
                  color: "white",
                  padding: "8px 20px",
                  borderRadius: "50px",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(2, 132, 199, 0.25)"
                }}
              >
                Send Message
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
