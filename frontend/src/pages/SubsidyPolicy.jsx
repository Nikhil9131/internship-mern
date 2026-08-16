import React, { useState, useEffect } from "react";
import "./vendor-planning-dark.css";

const SUBSIDY_SCHEMES = [
  {
    id: "capital_subsidy",
    title: "Capital Investment Subsidy",
    tagline: "Infrastructure Grants under Tourism Policy 2025",
    description: "Direct cash back incentive based on capital investments for eligible hospitality projects in designated zones.",
    icon: "💰",
    rate: "15% - 30% of CapEx",
    limit: "Up to ₹5.0 Crores max cap",
    timeline: "Disbursement in 3 installments",
    clearance: "CTE from Pollution Board, Municipal Building clearance",
    warnings: [
      "Invoices for land acquisition are strictly excluded from CapEx calculations.",
      "The claim dossier must be submitted within 180 days of commercial operations date (COD).",
      "Sanitation and fire department NOCs must be cleared prior to final audit."
    ],
    risks: [
      "Subsidies are audited retrospectively; initial financing must cover 100% of construction cost.",
      "Delays in executing building audits by public inspectors delay disbursement.",
      "Non-compliance with local staffing quotas can lead to grant cancellation."
    ]
  },
  {
    id: "stamp_duty",
    title: "Stamp Duty Exemption",
    tagline: "Land Registry Concessions",
    description: "100% refund of stamp duty fees on purchases of land Diversion plots for approved tourism assets.",
    icon: "📜",
    rate: "100% Exemption",
    limit: "Applicable on full registry amount",
    timeline: "Refund within 90 days of claim approval",
    clearance: " Collector's Land Diversion Certificate, Tourism NOC",
    warnings: [
      "Stamp duty must be paid upfront; refund is claimed after registering project with Tourism Board.",
      "Exemption is void if construction fails to commence within 24 months of registration.",
      "Land title must remain under the primary developing firm name."
    ],
    risks: [
      "Disputes regarding land diversion records delay local clearance approvals.",
      "Title search checks can lead to revenue audit delays.",
      "Changes in local municipality stamp duty tariff rules."
    ]
  },
  {
    id: "land_diversion",
    title: "Land Diversion Premium Waiver",
    tagline: "Agricultural to Commercial Diversions",
    description: "Full waiver of land diversion taxes and premium charges when converting land for hospitality projects.",
    icon: "🗺",
    rate: "100% Diversion Waiver",
    limit: "Saves ₹5L to ₹50L based on plot size",
    timeline: "Immediate clearance upon layout approval",
    clearance: "Town & Country Planning layout approval, Revenue NOC",
    warnings: [
      "Applies only to plots registered in the state Master Tourism Plan zones.",
      "Wayside amenities must offer deceleration lanes matching expressway rules.",
      "Subleasing diverted land parcels to third parties requires secondary premium audits."
    ],
    risks: [
      "Overlapping local boundaries can lead to long revenue court disputes.",
      "Diversion is cancelled if land use changes away from hospitality.",
      "Infrastructure development delays if access roads are not cleared."
    ]
  },
  {
    id: "interest_subsidy",
    title: "Interest Term Loan Rebate",
    tagline: "Financing Interest Concessions",
    description: "A quarterly interest rate rebate on term loans secured for tourism infrastructure development.",
    icon: "📈",
    rate: "5% Interest Rebate",
    limit: "Max ₹25 Lakhs per year (for 7 Years)",
    timeline: "Processed on quarterly bank statement audits",
    clearance: "Bank Term Loan Sanction, Chartered Accountant audit",
    warnings: [
      "Term loan must be sourced from SIDBI, nationalized banks, or state corporations.",
      "Rebate applies only to active interest; default interest or penalties are excluded.",
      "Rebate claims require submitting matching CA certificates every quarter."
    ],
    risks: [
      "Requires maintaining non-NPA status with the lender bank.",
      "Variable interest rate fluctuations impact calculated rebate limits.",
      "Complex document filing processes can lead to payment backlogs."
    ]
  }
];

const SubsidyPolicy = () => {
  const [selectedScheme, setSelectedScheme] = useState(SUBSIDY_SCHEMES[0]);
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  // Estimator State
  const [investment, setInvestment] = useState(10);
  const [zone, setZone] = useState("Zone B");
  const [type, setType] = useState("nature_resort");
  const [result, setResult] = useState({ subsidy: 0, stampDuty: "100%", approvals: "9-15 approvals required" });

  useEffect(() => {
    let rate = 0.20;
    let maxLimit = 3.0;

    if (zone === "Zone A") {
      rate = 0.15;
      maxLimit = 2.0;
    } else if (zone === "Zone C") {
      rate = 0.30;
      maxLimit = 5.0;
    }

    if (type === "heritage_hotel") {
      rate += 0.05;
      maxLimit += 1.0;
    }

    let calculated = investment * rate;
    if (calculated > maxLimit) {
      calculated = maxLimit;
    }

    setResult({
      subsidy: calculated.toFixed(2),
      stampDuty: type === "heritage_hotel" || zone === "Zone C" ? "100% (Fully Waived)" : "100% (Refund on registry)",
      approvals: type === "heritage_hotel" ? "15+ Heritage-tier clearances" : "9-12 Standard clearances"
    });
  }, [investment, zone, type]);

  return (
    <div className="vendor-planning-scope-root">
      <div className="vendor-planning-scope">
        
        {/* Hero Section */}
        <header className="luxury-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1470&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="hero-overlay"></div>
          <div className="hero-container">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>Tourism Policy & Incentives</span>
            </div>
            <div className="hero-content">
              <h1>Hospitality <span>Subsidy & Policy</span></h1>
              <p>
                Secure financial subsidies, stamp duty refunds, and diversion fee waivers under the MP Tourism Policy 2025 to optimize your project development yields.
              </p>
            </div>
          </div>
        </header>

        {/* Schemes Selection Grid */}
        <section className="planner-section">
          <div className="project-grid" style={{ marginBottom: "3rem" }}>
            {SUBSIDY_SCHEMES.map((scheme) => (
              <div
                key={scheme.id}
                onClick={() => setSelectedScheme(scheme)}
                className={`project-card ${selectedScheme.id === scheme.id ? "active" : ""}`}
              >
                <div className="project-icon" style={{ fontSize: "1.5rem" }}>{scheme.icon}</div>
                <h3>{scheme.title}</h3>
                <p>{scheme.description}</p>
              </div>
            ))}
          </div>

          {/* Details Panel */}
          <div className="planner-container">
            <div className="project-details-card">
              <div className="details-top">
                <div className="details-left">
                  <div className="details-icon" style={{ fontSize: "1.8rem" }}>{selectedScheme.icon}</div>
                  <div className="details-heading">
                    <h2>{selectedScheme.title} Parameters</h2>
                    <p>{selectedScheme.tagline}</p>
                  </div>
                </div>
                <div className="staffing-chip">
                  <span>Incentive Rate</span>
                  <strong>{selectedScheme.rate}</strong>
                </div>
              </div>

              {/* Highlights Stats */}
              <div className="project-highlights">
                <div className="highlight">
                  <h3>{selectedScheme.limit}</h3>
                  <p>Incentive Limit Cap</p>
                </div>
                <div className="highlight">
                  <h3>{selectedScheme.timeline}</h3>
                  <p>Processing Timeline</p>
                </div>
                <div className="highlight" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  <h3 style={{ fontSize: "1rem", paddingTop: "0.5rem" }}>{selectedScheme.clearance}</h3>
                  <p>Primary Clearances Required</p>
                </div>
              </div>

              {/* Info Box Grid */}
              <div className="details-grid">
                
                {/* Warnings Box */}
                <div className="info-box warning-box">
                  <div className="box-head">
                    <span style={{ color: "var(--vp-accent-red)", marginRight: "8px" }}>⚠</span>
                    <h4>Clearance NOC & Filing Warnings</h4>
                  </div>
                  <ul>
                    {selectedScheme.warnings.map((warn, idx) => (
                      <li key={idx}>{warn}</li>
                    ))}
                  </ul>
                </div>

                {/* Risks Box */}
                <div className="info-box risk-box">
                  <div className="box-head">
                    <span style={{ color: "var(--vp-accent-amber)", marginRight: "8px" }}>✖</span>
                    <h4>Disbursement & Audit Risks</h4>
                  </div>
                  <ul>
                    {selectedScheme.risks.map((risk, idx) => (
                      <li key={idx}>{risk}</li>
                    ))}
                  </ul>
                </div>

              </div>

              <div className="details-buttons" style={{ justifyContent: "center" }}>
                <button
                  onClick={() => setIsCalcOpen(true)}
                  className="btn-primary"
                  style={{ border: "none", cursor: "pointer" }}
                >
                  🧮 Open Capital Subsidy Calculator
                </button>
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* Subsidy Calculator Modal */}
      {isCalcOpen && (
        <div
          onClick={(e) => {
            if (e.target.id === "calcOverlay") setIsCalcOpen(false);
          }}
          id="calcOverlay"
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
              onClick={() => setIsCalcOpen(false)}
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
                Interactive Estimator
              </span>
              <h2 style={{ color: "var(--vp-text-white)", fontSize: "1.75rem", marginTop: "0.25rem" }}>Capital Subsidy Calculator</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
              <div>
                <label style={{ display: "block", color: "var(--vp-text-gray)", fontSize: "0.85rem", marginBottom: "0.5rem", fontWeight: "500" }}>
                  Estimated Capital Investment (₹ Crores)
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="0.5"
                    value={investment}
                    onChange={(e) => setInvestment(parseFloat(e.target.value))}
                    style={{ flex: 1, accentColor: "var(--vp-accent-purple)" }}
                  />
                  <span style={{ color: "var(--vp-text-white)", fontWeight: "600", fontSize: "1rem", width: "70px", textAlign: "right" }}>
                    ₹{investment} Cr
                  </span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", color: "var(--vp-text-gray)", fontSize: "0.85rem", marginBottom: "0.5rem", fontWeight: "500" }}>
                    MP Tourism Zone Rating
                  </label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    style={{ background: "rgba(255, 255, 255, 0.85)", border: "1px solid var(--vp-glass-border-active)", borderRadius: "var(--radius-sm)", color: "var(--vp-text-white)", padding: "0.6rem", width: "100%", fontWeight: "500" }}
                  >
                    <option value="Zone A" style={{ color: "var(--vp-text-white)" }}>Zone A (15% Subsidy)</option>
                    <option value="Zone B" style={{ color: "var(--vp-text-white)" }}>Zone B (20% Subsidy)</option>
                    <option value="Zone C" style={{ color: "var(--vp-text-white)" }}>Zone C (30% Subsidy)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", color: "var(--vp-text-gray)", fontSize: "0.85rem", marginBottom: "0.5rem", fontWeight: "500" }}>
                    Hotel Asset Category
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    style={{ background: "rgba(255, 255, 255, 0.85)", border: "1px solid var(--vp-glass-border-active)", borderRadius: "var(--radius-sm)", color: "var(--vp-text-white)", padding: "0.6rem", width: "100%", fontWeight: "500" }}
                  >
                    <option value="nature_resort" style={{ color: "var(--vp-text-white)" }}>Wildlife / Nature Resort</option>
                    <option value="city_hotel" style={{ color: "var(--vp-text-white)" }}>City Business Hotel</option>
                    <option value="heritage_hotel" style={{ color: "var(--vp-text-white)" }}>Heritage Restoration (+5% Bonus)</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ background: "rgba(2, 132, 199, 0.04)", border: "1px solid var(--vp-glass-border-active)", padding: "1.5rem", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifycontent: "space-between", borderBottom: "1px solid rgba(2, 132, 199, 0.08)", paddingBottom: "8px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--vp-text-gray)", fontWeight: "500" }}>Estimated Capital Grant:</span>
                <strong style={{ fontSize: "1rem", color: "var(--vp-accent-green)", fontWeight: "700" }}>₹{result.subsidy} Crores</strong>
              </div>
              <div style={{ display: "flex", justifycontent: "space-between", borderBottom: "1px solid rgba(2, 132, 199, 0.08)", paddingBottom: "8px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--vp-text-gray)", fontWeight: "500" }}>Stamp Duty Concession:</span>
                <strong style={{ fontSize: "0.85rem", color: "var(--vp-text-white)", fontWeight: "600" }}>{result.stampDuty}</strong>
              </div>
              <div style={{ display: "flex", justifycontent: "space-between" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--vp-text-gray)", fontWeight: "500" }}>Regulatory Timeline:</span>
                <strong style={{ fontSize: "0.85rem", color: "var(--vp-text-white)", fontWeight: "600" }}>{result.approvals}</strong>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "var(--vp-text-gray)", textAlign: "center" }}>
              *This estimate is indicative and subject to MP Tourism Department audit clearance.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubsidyPolicy;
