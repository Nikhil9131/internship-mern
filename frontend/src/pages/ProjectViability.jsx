import React, { useState, useEffect } from "react";
import "./vendor-planning-dark.css";

const VIABILITY_PROFILES = [
  {
    id: "city_business",
    title: "City / Business Hotel",
    tagline: "Urban Corporate Hospitality",
    description: "Multi-story hotels focused on corporate contracts, business travelers, and high vertical spatial efficiency.",
    icon: "🏢",
    investment: "₹35 - 50 Cr",
    adr: "₹5,500 - 7,500",
    occupancy: "68%",
    ebitda: "36%",
    payback: "8.5 Years",
    capexBreakdown: "Civil Shell (45%) | MEP Installations (25%) | FF&E Furnishing (15%) | OS&E (8%) | Pre-Opening (7%)",
    warnings: [
      "High municipal FAR pressure demands floor plan optimization.",
      "Basement parking structures significantly raise initial civil excavation costs.",
      "Banquet service corridor flows must be physically isolated from corporate guest lobbies."
    ],
    risks: [
      "Heavy reliance on weekday corporate lodging agreements.",
      "Severe room rate competition from local business districts.",
      "Vulnerability to seasonal weekend demand declines."
    ]
  },
  {
    id: "nature_resort",
    title: "Wildlife & Nature Resort",
    tagline: "Eco-Adventure & Wellness",
    description: "Leisure-focused resort destinations centered around ecotourism, environmental conservation, and wellness.",
    icon: "🌳",
    investment: "₹20 - 35 Cr",
    adr: "₹8,500 - 14,000",
    occupancy: "55%",
    ebitda: "38%",
    payback: "7.2 Years",
    capexBreakdown: "Civil Cabins (35%) | Landscaping (20%) | MEP Services (20%) | FF&E (15%) | OS&E (10%)",
    warnings: [
      "Complex environmental clearances and wildlife conservation zones required.",
      "Utility distribution (water, power grid) across expansive sites raises MEP costs.",
      "STP/EIP treatment systems must adhere strictly to environmental parameters."
    ],
    risks: [
      "High seasonality (monsoon months see near-zero booking volumes).",
      "Higher logistics costs and staff housing requirements in remote locations.",
      "High ongoing landscape and cottage restoration maintenance costs."
    ]
  },
  {
    id: "heritage_palace",
    title: "Heritage Palace Restoration",
    tagline: "Royal Experiential Luxury",
    description: "Historic forts, mansions, or palaces restored into luxury heritage experiences for high-net-worth guests.",
    icon: "🏰",
    investment: "₹40 - 60 Cr",
    adr: "₹12,000 - 22,000",
    occupancy: "50%",
    ebitda: "40%",
    payback: "9.2 Years",
    capexBreakdown: "Restoration (50%) | MEP Integration (20%) | Traditional FF&E (18%) | OS&E (12%)",
    warnings: [
      "Strict conservation department guidelines restrict structural alterations.",
      "Fitting central HVAC, fire sprinklers, and wiring without damaging historic plaster is extremely difficult.",
      "Sourcing traditional masonry materials and heritage craft labor adds time."
    ],
    risks: [
      "Extremely long project execution timelines (often 3-5 years).",
      "Unforeseen structural decay requires costly immediate repairs.",
      "Heavy dependency on international high-spend tourism trends."
    ]
  },
  {
    id: "highway_motel",
    title: "Highway Transit Motel",
    tagline: "Route Transit & Dining",
    description: "Transit properties alongside key expressway routes designed for short stays, food courts, and quick turnarounds.",
    icon: "🚗",
    investment: "₹8 - 15 Cr",
    adr: "₹2,500 - 3,800",
    occupancy: "65%",
    ebitda: "30%",
    payback: "5.5 Years",
    capexBreakdown: "Civil Structure (50%) | F&B Setup (18%) | MEP Sizing (20%) | FF&E (12%)",
    warnings: [
      "Clear entry/exit deceleration lane sanctions are required from NHAI.",
      "Large, high-maintenance washrooms and restaurant visibility from roads are critical.",
      "Adequate separate truck and bus driver parking spaces are essential."
    ],
    risks: [
      "Vulnerable to route diversions or bypass construction.",
      "Highly dependent on weekend leisure traffic.",
      "High operations staff turnover due to highway locations."
    ]
  }
];

const ProjectViability = () => {
  const [selectedProfile, setSelectedProfile] = useState(VIABILITY_PROFILES[0]);
  const [isChartOpen, setIsChartOpen] = useState(false);
  
  // Modal State
  const [rooms, setRooms] = useState(60);
  const [adr, setAdr] = useState(4500);
  const [occupancy, setOccupancy] = useState(60);
  const [projections, setProjections] = useState([]);

  // Recalculate projections whenever inputs change
  useEffect(() => {
    const data = [];
    let currentOcc = occupancy;
    let currentAdr = adr;

    for (let year = 1; year <= 5; year++) {
      const roomNights = rooms * 365 * (currentOcc / 100);
      const roomRev = roomNights * currentAdr;
      const totalRev = roomRev * 1.4; // 40% F&B surcharge
      const ebitda = totalRev * 0.35; // 35% margin
      const debtService = 7500000;
      const netProfit = ebitda - debtService;

      data.push({
        year,
        occ: currentOcc.toFixed(0),
        adr: currentAdr.toFixed(0),
        revenue: (totalRev / 10000000).toFixed(2),
        ebitda: (ebitda / 10000000).toFixed(2),
        profit: (netProfit / 10000000).toFixed(2)
      });

      currentOcc = Math.min(85, currentOcc + 3);
      currentAdr = currentAdr * 1.05;
    }
    setProjections(data);
  }, [rooms, adr, occupancy]);

  return (
    <div className="vendor-planning-scope-root">
      <div className="vendor-planning-scope">
        
        {/* Hero Section */}
        <header className="luxury-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1470&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="hero-overlay"></div>
          <div className="hero-container">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>Project Feasibility & ROI Calculations</span>
            </div>
            <div className="hero-content">
              <h1>Hospitality <span>Project Viability</span></h1>
              <p>
                Analyze capital costs, room rate allocations, average daily rates (ADR), and EBITDA margins across different hospitality asset profiles to forecast project feasibility.
              </p>
            </div>
          </div>
        </header>

        {/* Profiles Grid */}
        <section className="planner-section">
          <div className="project-grid" style={{ marginBottom: "3rem" }}>
            {VIABILITY_PROFILES.map((prof) => (
              <div
                key={prof.id}
                onClick={() => setSelectedProfile(prof)}
                className={`project-card ${selectedProfile.id === prof.id ? "active" : ""}`}
              >
                <div className="project-icon" style={{ fontSize: "1.5rem" }}>{prof.icon}</div>
                <h3>{prof.title}</h3>
                <p>{prof.description}</p>
              </div>
            ))}
          </div>

          {/* Details Panel */}
          <div className="planner-container">
            <div className="project-details-card">
              <div className="details-top">
                <div className="details-left">
                  <div className="details-icon" style={{ fontSize: "1.8rem" }}>{selectedProfile.icon}</div>
                  <div className="details-heading">
                    <h2>{selectedProfile.title} Details</h2>
                    <p>{selectedProfile.tagline}</p>
                  </div>
                </div>
                <div className="staffing-chip">
                  <span>Investment Range</span>
                  <strong>{selectedProfile.investment}</strong>
                </div>
              </div>

              {/* Highlights Stats */}
              <div className="project-highlights">
                <div className="highlight">
                  <h3>{selectedProfile.adr}</h3>
                  <p>Target ADR</p>
                </div>
                <div className="highlight">
                  <h3>{selectedProfile.occupancy}</h3>
                  <p>Stabilized Occupancy</p>
                </div>
                <div className="highlight">
                  <h3>{selectedProfile.ebitda}</h3>
                  <p>EBITDA Margin</p>
                </div>
                <div className="highlight">
                  <h3>{selectedProfile.payback}</h3>
                  <p>Payback Period</p>
                </div>
              </div>

              {/* Grid content */}
              <div className="details-grid">
                
                {/* Warnings Box */}
                <div className="info-box warning-box">
                  <div className="box-head">
                    <span style={{ color: "var(--vp-accent-red)", marginRight: "8px" }}>⚠</span>
                    <h4>Layout Planning Warnings</h4>
                  </div>
                  <ul>
                    {selectedProfile.warnings.map((warn, idx) => (
                      <li key={idx}>{warn}</li>
                    ))}
                  </ul>
                </div>

                {/* Risks Box */}
                <div className="info-box risk-box">
                  <div className="box-head">
                    <span style={{ color: "var(--vp-accent-amber)", marginRight: "8px" }}>✖</span>
                    <h4>Primary Financial Risks</h4>
                  </div>
                  <ul>
                    {selectedProfile.risks.map((risk, idx) => (
                      <li key={idx}>{risk}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* CapEx Breakdown */}
              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--vp-glass-border)", padding: "1.5rem", borderRadius: "12px", marginBottom: "2.5rem" }}>
                <h4 style={{ color: "white", marginBottom: "0.75rem", fontSize: "0.95rem", fontWeight: "600" }}>Typical CapEx Allocation Breakdown</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--vp-text-gray)", lineHeight: "1.6", margin: 0 }}>
                  {selectedProfile.capexBreakdown}
                </p>
              </div>

              <div className="details-buttons" style={{ justifyContent: "center" }}>
                <button
                  onClick={() => setIsChartOpen(true)}
                  className="btn-primary"
                  style={{ border: "none", cursor: "pointer" }}
                >
                  📊 Open Cash Flow ROI Forecaster
                </button>
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* Calculator Modal */}
      {isChartOpen && (
        <div
          onClick={(e) => {
            if (e.target.id === "chartOverlay") setIsChartOpen(false);
          }}
          id="chartOverlay"
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
              maxWidth: "680px",
              width: "100%",
              borderRadius: "var(--radius-lg)",
              padding: "2.5rem",
              position: "relative",
              margin: "auto",
              boxShadow: "0 10px 40px rgba(2, 132, 199, 0.15)"
            }}
          >
            <button
              onClick={() => setIsChartOpen(false)}
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
                Financial Modeling
              </span>
              <h2 style={{ color: "var(--vp-text-white)", fontSize: "1.75rem", marginTop: "0.25rem" }}>5-Year Cash Flow Projections</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", color: "var(--vp-text-gray)", fontSize: "0.8rem", marginBottom: "4px", fontWeight: "500" }}>Inventory Size (Keys)</label>
                  <input
                    type="number"
                    min="10"
                    max="200"
                    value={rooms}
                    onChange={(e) => setRooms(parseInt(e.target.value) || 10)}
                    style={{ background: "rgba(255, 255, 255, 0.85)", border: "1px solid var(--vp-glass-border-active)", borderRadius: "var(--radius-sm)", color: "var(--vp-text-white)", padding: "0.5rem", width: "100%", fontWeight: "500" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--vp-text-gray)", fontSize: "0.8rem", marginBottom: "4px", fontWeight: "500" }}>ADR (₹)</label>
                  <input
                    type="number"
                    min="1500"
                    max="20000"
                    value={adr}
                    onChange={(e) => setAdr(parseInt(e.target.value) || 1500)}
                    style={{ background: "rgba(255, 255, 255, 0.85)", border: "1px solid var(--vp-glass-border-active)", borderRadius: "var(--radius-sm)", color: "var(--vp-text-white)", padding: "0.5rem", width: "100%", fontWeight: "500" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", color: "var(--vp-text-gray)", fontSize: "0.8rem", marginBottom: "4px", fontWeight: "500" }}>Stabilized Occupancy (%)</label>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    step="5"
                    value={occupancy}
                    onChange={(e) => setOccupancy(parseInt(e.target.value))}
                    style={{ flex: 1, accentColor: "var(--vp-accent-purple)" }}
                  />
                  <span style={{ color: "var(--vp-text-white)", fontWeight: "600", fontSize: "0.95rem", width: "45px", textAlign: "right" }}>
                    {occupancy}%
                  </span>
                </div>
              </div>
            </div>

            <div style={{ overflowX: "auto", background: "rgba(2, 132, 199, 0.04)", border: "1px solid var(--vp-glass-border-active)", borderRadius: "8px", padding: "1rem" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.8rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--vp-glass-border-active)", color: "var(--vp-accent-purple)" }}>
                    <th style={{ padding: "8px 4px" }}>Year</th>
                    <th style={{ padding: "8px 4px" }}>Occupancy</th>
                    <th style={{ padding: "8px 4px" }}>ADR</th>
                    <th style={{ padding: "8px 4px" }}>Revenue</th>
                    <th style={{ padding: "8px 4px" }}>EBITDA</th>
                    <th style={{ padding: "8px 4px" }}>Net Profit*</th>
                  </tr>
                </thead>
                <tbody>
                  {projections.map((row) => (
                    <tr key={row.year} style={{ borderBottom: "1px solid rgba(2, 132, 199, 0.08)", color: "var(--vp-text-white)", fontWeight: "500" }}>
                      <td style={{ padding: "10px 4px" }}>Year {row.year}</td>
                      <td style={{ padding: "10px 4px" }}>{row.occ}%</td>
                      <td style={{ padding: "10px 4px" }}>₹{row.adr}</td>
                      <td style={{ padding: "10px 4px" }}>₹{row.revenue} Cr</td>
                      <td style={{ padding: "10px 4px" }}>₹{row.ebitda} Cr</td>
                      <td style={{ padding: "10px 4px", color: parseFloat(row.profit) >= 0 ? "var(--vp-accent-green)" : "var(--vp-accent-red)", fontWeight: "600" }}>
                        ₹{row.profit} Cr
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "1rem", fontSize: "0.7rem", color: "var(--vp-text-gray)", lineHeight: "1.4" }}>
              *Net Profit simulates flat construction financing repayments of **₹75 Lakhs annually**. Projections are based on standard operating multipliers.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectViability;
