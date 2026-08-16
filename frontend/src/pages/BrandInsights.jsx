import React, { useState, useEffect } from "react";
import "./vendor-planning-dark.css";

const BRAND_TIERS = [
  {
    id: "luxury_lifestyle",
    title: "Luxury / Experiential",
    tagline: "Ultra-Premium Luxury Segments",
    description: "Iconic luxury chains focused on high-spend leisure travelers, gourmet dining, and global guest recognition.",
    icon: "💎",
    royalty: "6.5% - 8.0%",
    marketing: "2.5% of Gross Room Rev",
    roomSize: "38 - 45 sq. m. (Keys)",
    ceilingHeight: "3.2 meters minimum",
    examples: "Taj Palaces, Oberoi Hotels, Marriott Autograph Collection, Ritz-Carlton",
    warnings: [
      "Brand technical audits require 5-fixture bathroom formats (independent tub + double vanity).",
      "Central IP automation systems and bespoke architectural lighting layouts are mandatory.",
      "Lobbies must feature high structural ceiling clearances and bespoke artwork curation."
    ],
    risks: [
      "Extremely high Property Improvement Plan (PIP) Capex standards.",
      "Global distribution system (GDS) and loyalty program commission surcharges average 8-12%.",
      "Requires high operational staff-to-room service ratios (typically 1.8x)."
    ]
  },
  {
    id: "upscale_full",
    title: "Upscale Full Service",
    tagline: "Corporate & Event Flagships",
    description: "Premium business hotels offering comprehensive F&B facilities, extensive conference rooms, and high inventory volumes.",
    icon: "🏢",
    royalty: "5.0% - 6.5%",
    marketing: "2.0% of Gross Room Rev",
    roomSize: "28 - 32 sq. m. (Keys)",
    ceilingHeight: "2.9 meters minimum",
    examples: "Radisson Blu, Courtyard by Marriott, Novotel, Crowne Plaza",
    warnings: [
      "Requires a minimum of 2 specialty multi-cuisine restaurants and an all-day coffee shop.",
      "Banquet facilities must offer column-free layouts with independent pre-function access.",
      "Heavy acoustic insulation STC ratings (min 52) required for guest room walls."
    ],
    risks: [
      "Severe local competition from other business chains in industrial corridors.",
      "High F&B setup cost and raw kitchen inventory overheads.",
      "High energy utility costs due to large central HVAC air-conditioning loads."
    ]
  },
  {
    id: "midscale_select",
    title: "Midscale / Select Service",
    tagline: "Yield-Driven Efficiency",
    description: "Smart, efficient lodging properties optimized for business travelers, compact banquet requirements, and fast construction.",
    icon: "⚡",
    royalty: "4.5% - 5.5%",
    marketing: "1.5% of Gross Room Rev",
    roomSize: "24 - 28 sq. m. (Keys)",
    ceilingHeight: "2.75 meters minimum",
    examples: "Fairfield by Marriott, Radisson Park Inn, Fortune Select, Lemon Tree Premier",
    warnings: [
      "Compact bathroom layouts must optimize service shafts to reduce piping runs.",
      "F&B is restricted to a single all-day dining restaurant and room service.",
      "Public areas must be kept compact to maximize room inventory footprint."
    ],
    risks: [
      "Requires high local corporate hub penetration to maintain stable ADR yields.",
      "Prone to pricing compression from budget-tier aggregators.",
      "Lacks the high wedding event revenues of full-service flagships."
    ]
  },
  {
    id: "economy_chain",
    title: "Limited Service Economy",
    tagline: "Lean Operations & High Yields",
    description: "No-frills budget hospitality focused on clean lodging, smart kiosks, and highly optimized staffing structures.",
    icon: "🏷",
    royalty: "3.0% - 4.5%",
    marketing: "1.0% of Gross Room Rev",
    roomSize: "18 - 22 sq. m. (Keys)",
    ceilingHeight: "2.6 meters minimum",
    examples: "Ginger by Taj, Red Fox by Lemon Tree, Ibis Budget, Holiday Inn Express",
    warnings: [
      "Modular bathroom pods are highly recommended to accelerate site execution.",
      "Minimal back-of-house storage planning; relies on quick local vendors.",
      "Lobbies are lean, replacing traditional check-in counters with self-service iPad desks."
    ],
    risks: [
      "Extremely price-sensitive customer demographic.",
      "Low average room yield limits cash flow safety margins.",
      "Heavy reliance on OTA booking channels (which take 15-20% commissions)."
    ]
  }
];

const BrandInsights = () => {
  const [selectedTier, setSelectedTier] = useState(BRAND_TIERS[0]);
  const [isMatcherOpen, setIsMatcherOpen] = useState(false);
  
  // Quiz State
  const [adr, setAdr] = useState(5000);
  const [rooms, setRooms] = useState(60);
  const [fbScale, setFbScale] = useState("banquet");
  const [recommendation, setRecommendation] = useState({ segment: "", brands: "", royalty: "" });

  useEffect(() => {
    let segment = "Midscale / Full Service";
    let brands = "Four Points by Sheraton, Radisson Park Inn, Fortune Select";
    let royalty = "4.5% - 5.5% of Gross Room Revenue";

    if (adr >= 10000) {
      segment = "Luxury Lifestyle / Experiential";
      brands = "Marriott Autograph Collection, Taj Selection, IHG InterContinental";
      royalty = "6.5% - 8.0% of Gross Room Revenue";
    } else if (adr >= 6000) {
      segment = "Upscale / Upper Midscale";
      brands = "Radisson Blu, Courtyard by Marriott, Novotel";
      royalty = "5.0% - 6.5% of Gross Room Revenue";
    } else if (adr < 3500) {
      segment = "Limited Service Economy";
      brands = "Ginger, Red Fox by Lemon Tree, Ibis Budget";
      royalty = "3.0% - 4.5% of Gross Room Revenue";
    }

    setRecommendation({ segment, brands, royalty });
  }, [adr, rooms, fbScale]);

  return (
    <div className="vendor-planning-scope-root">
      <div className="vendor-planning-scope">
        
        {/* Hero Section */}
        <header className="luxury-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540553016722-983e48a2cd10?q=80&w=1470&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="hero-overlay"></div>
          <div className="hero-container">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>Franchise & Brand Advisory</span>
            </div>
            <div className="hero-content">
              <h1>Hospitality <span>Brand Insights</span></h1>
              <p>
                Evaluate global hotel franchise structures, royalty percentages, space requirement standards, and Property Improvement Plans (PIP) to select the ideal brand alignment.
              </p>
            </div>
          </div>
        </header>

        {/* Brand Tiers Selection Grid */}
        <section className="planner-section">
          <div className="project-grid" style={{ marginBottom: "3rem" }}>
            {BRAND_TIERS.map((tier) => (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier)}
                className={`project-card ${selectedTier.id === tier.id ? "active" : ""}`}
              >
                <div className="project-icon" style={{ fontSize: "1.5rem" }}>{tier.icon}</div>
                <h3>{tier.title}</h3>
                <p>{tier.description}</p>
              </div>
            ))}
          </div>

          {/* Details Panel */}
          <div className="planner-container">
            <div className="project-details-card">
              <div className="details-top">
                <div className="details-left">
                  <div className="details-icon" style={{ fontSize: "1.8rem" }}>{selectedTier.icon}</div>
                  <div className="details-heading">
                    <h2>{selectedTier.title} Alignment</h2>
                    <p>{selectedTier.tagline}</p>
                  </div>
                </div>
                <div className="staffing-chip">
                  <span>Room Size Standard</span>
                  <strong>{selectedTier.roomSize}</strong>
                </div>
              </div>

              {/* Highlights Stats */}
              <div className="project-highlights">
                <div className="highlight">
                  <h3>{selectedTier.royalty}</h3>
                  <p>Base Royalty Fee</p>
                </div>
                <div className="highlight">
                  <h3>{selectedTier.marketing}</h3>
                  <p>Marketing & GDS Levy</p>
                </div>
                <div className="highlight">
                  <h3>{selectedTier.ceilingHeight}</h3>
                  <p>Min Ceiling Clearance</p>
                </div>
                <div className="highlight" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  <h3 style={{ fontSize: "1.2rem", paddingTop: "0.5rem" }}>Taj / Marriott</h3>
                  <p>Standard Brands</p>
                </div>
              </div>

              {/* Info Box Grid */}
              <div className="details-grid">
                
                {/* Warnings Box */}
                <div className="info-box warning-box">
                  <div className="box-head">
                    <span style={{ color: "var(--vp-accent-red)", marginRight: "8px" }}>⚠</span>
                    <h4>Brand Standards Audit Warnings</h4>
                  </div>
                  <ul>
                    {selectedTier.warnings.map((warn, idx) => (
                      <li key={idx}>{warn}</li>
                    ))}
                  </ul>
                </div>

                {/* Risks Box */}
                <div className="info-box risk-box">
                  <div className="box-head">
                    <span style={{ color: "var(--vp-accent-amber)", marginRight: "8px" }}>✖</span>
                    <h4>PIP & Financial Fee Risks</h4>
                  </div>
                  <ul>
                    {selectedTier.risks.map((risk, idx) => (
                      <li key={idx}>{risk}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Examples Summary */}
              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--vp-glass-border)", padding: "1.5rem", borderRadius: "12px", marginBottom: "2.5rem" }}>
                <h4 style={{ color: "white", marginBottom: "0.75rem", fontSize: "0.95rem", fontWeight: "600" }}>Market Target Brand Examples</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--vp-text-gray)", lineHeight: "1.6", margin: 0 }}>
                  {selectedTier.examples}
                </p>
              </div>

              <div className="details-buttons" style={{ justifyContent: "center" }}>
                <button
                  onClick={() => setIsMatcherOpen(true)}
                  className="btn-primary"
                  style={{ border: "none", cursor: "pointer" }}
                >
                  🔍 Open Franchise Tier Matcher
                </button>
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* Brand Matcher Modal */}
      {isMatcherOpen && (
        <div
          onClick={(e) => {
            if (e.target.id === "matcherOverlay") setIsMatcherOpen(false);
          }}
          id="matcherOverlay"
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
              onClick={() => setIsMatcherOpen(false)}
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

            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: "700", color: "var(--vp-accent-purple)", letterSpacing: "1px", textTransform: "uppercase" }}>
                Franchise Alignment
              </span>
              <h2 style={{ color: "var(--vp-text-white)", fontSize: "1.75rem", marginTop: "0.25rem" }}>Franchise Tier Matcher</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
              <div>
                <label style={{ display: "block", color: "var(--vp-text-gray)", fontSize: "0.85rem", marginBottom: "0.5rem", fontWeight: "500" }}>
                  Targeted Average Daily Rate (ADR in ₹)
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="range"
                    min="2000"
                    max="15000"
                    step="250"
                    value={adr}
                    onChange={(e) => setAdr(parseInt(e.target.value))}
                    style={{ flex: 1, accentColor: "var(--vp-accent-purple)" }}
                  />
                  <span style={{ color: "var(--vp-text-white)", fontWeight: "600", fontSize: "1rem", width: "95px", textAlign: "right" }}>
                    ₹{adr}
                  </span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", color: "var(--vp-text-gray)", fontSize: "0.85rem", marginBottom: "0.5rem", fontWeight: "500" }}>
                    Inventory Size (Keys)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    value={rooms}
                    onChange={(e) => setRooms(parseInt(e.target.value) || 10)}
                    style={{ background: "rgba(255, 255, 255, 0.85)", border: "1px solid var(--vp-glass-border-active)", borderRadius: "var(--radius-sm)", color: "var(--vp-text-white)", padding: "0.6rem", width: "100%", fontWeight: "500" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", color: "var(--vp-text-gray)", fontSize: "0.85rem", marginBottom: "0.5rem", fontWeight: "500" }}>
                    F&B Scale
                  </label>
                  <select
                    value={fbScale}
                    onChange={(e) => setFbScale(e.target.value)}
                    style={{ background: "rgba(255, 255, 255, 0.85)", border: "1px solid var(--vp-glass-border-active)", borderRadius: "var(--radius-sm)", color: "var(--vp-text-white)", padding: "0.6rem", width: "100%", fontWeight: "500" }}
                  >
                    <option value="none" style={{ color: "var(--vp-text-white)" }}>Limited Service (Coffee Shop)</option>
                    <option value="restaurant" style={{ color: "var(--vp-text-white)" }}>Full Service Restaurant</option>
                    <option value="banquet" style={{ color: "var(--vp-text-white)" }}>Large Banqueting & Event Spaces</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ background: "rgba(2, 132, 199, 0.04)", border: "1px solid var(--vp-glass-border-active)", padding: "1.5rem", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--vp-accent-purple)", display: "block", marginBottom: "4px", fontWeight: "600" }}>RECOMMENDED POSITIONING:</span>
                <strong style={{ fontSize: "1.1rem", color: "var(--vp-text-white)", fontWeight: "700" }}>{recommendation.segment}</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--vp-accent-purple)", display: "block", marginBottom: "4px", fontWeight: "600" }}>SUGGESTED BRANDS:</span>
                <strong style={{ fontSize: "0.9rem", color: "var(--vp-text-white)", fontWeight: "600" }}>{recommendation.brands}</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--vp-accent-purple)", display: "block", marginBottom: "4px", fontWeight: "600" }}>ESTIMATED ROYALTIES:</span>
                <strong style={{ fontSize: "0.9rem", color: "var(--vp-accent-green)", fontWeight: "700" }}>{recommendation.royalty}</strong>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "var(--vp-text-gray)", textAlign: "center" }}>
              *Franchise estimates reflect brand entry parameters for active Indian states.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandInsights;
