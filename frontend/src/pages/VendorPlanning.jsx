import React, { useState, useEffect } from "react";
import "./vendor-planning-dark.css";

const PROJECT_PROFILES = [
  {
    id: "city_business",
    title: "City / Business Hotel",
    tagline: "City Business Hotel",
    description: "Urban business hotels focused on efficiency, conferences and corporate travellers.",
    icon: "fa-city",
    subtitle: "Premium hospitality planning profile for urban corporate hotels.",
    staffing: "Upper Midscale / Full Service",
    warning: "High FAR pressure requires efficient planning.|Basement parking significantly impacts cost.|Banquet circulation should be isolated.|Service corridors must remain hidden.|Lift planning affects operational efficiency.",
    vendors: "MEP Consultant|HVAC Specialist|Technology (PMS)|Kitchen Planner|Laundry Vendor|Fire Consultant|Interior Designer|Lighting Expert",
    experts: "Hospitality Architect|Revenue Consultant|Hotel Operator|Brand Advisor",
    risks: "Corporate demand dependency.|Competitive pricing pressure.|Weekday occupancy fluctuations.|Higher operational staffing costs.|Parking capacity limitations."
  },
  {
    id: "budget_hotel",
    title: "Budget Hotel",
    tagline: "Budget Hotel",
    description: "Lean operation with cost-efficient planning, quick delivery and optimized investment.",
    icon: "fa-building",
    subtitle: "Lean hospitality planning for economy hotels with optimized investment.",
    staffing: "Limited Service",
    warning: "Avoid oversized public areas.|Control construction cost.|Optimize room efficiency.|Keep circulation simple.|Reduce unnecessary finishes.",
    vendors: "Civil Contractor|Furniture Vendor|Laundry Vendor|Electrical Consultant|Security System|Signage Vendor",
    experts: "Hotel Planner|Cost Consultant|Operations Expert|Procurement Advisor",
    risks: "Low ADR.|Price competition.|High maintenance sensitivity.|Thin operating margins.|Occupancy dependence."
  },
  {
    id: "luxury_boutique",
    title: "Luxury Boutique Hotel",
    tagline: "Luxury Boutique",
    description: "Experience-driven hospitality with premium interiors, exclusivity and personalized service.",
    icon: "fa-gem",
    subtitle: "Experience-driven luxury hospitality with premium interiors and highly personalized guest experiences.",
    staffing: "Luxury Lifestyle",
    warning: "Premium finish quality mandatory.|Lighting design is critical.|Spa and wellness planning required.|Guest privacy must be protected.|Luxury landscape design should match brand positioning.",
    vendors: "Luxury Interior Designer|Spa Consultant|Lighting Designer|Automation Vendor|Premium Kitchen Planner|Landscape Designer|Art Consultant|Luxury Furniture Supplier",
    experts: "Luxury Hotel Consultant|Brand Advisor|Interior Architect|Experience Designer",
    risks: "Higher CapEx investment.|Premium staffing requirements.|Longer ROI period.|Luxury guest expectations.|Brand positioning risk."
  },
  {
    id: "nature_resort",
    title: "Nature Resort",
    tagline: "Nature Resort",
    description: "Eco-inspired destination projects focused on wellness, sustainability and recreation.",
    icon: "fa-tree",
    subtitle: "Destination resort focused on wellness, recreation and sustainable hospitality experiences.",
    staffing: "Resort Operations",
    warning: "Environmental approvals are essential.|Landscape planning impacts cost.|Storm water management required.|Guest circulation must be seamless.|Utility backup planning is critical.",
    vendors: "Landscape Consultant|Swimming Pool Vendor|Solar Consultant|STP Consultant|Adventure Equipment Vendor|Irrigation Specialist|Spa Vendor|Outdoor Furniture Supplier",
    experts: "Resort Planner|Ecology Consultant|Landscape Architect|Wellness Advisor",
    risks: "Seasonal demand fluctuations.|Weather dependency.|Remote staffing challenges.|Infrastructure costs.|High landscape maintenance."
  },
  {
    id: "marriage_garden",
    title: "Marriage Garden & Banquet",
    tagline: "Marriage Garden",
    description: "Event-led destination with banquet halls, celebrations and high seasonal occupancy.",
    icon: "fa-glass-cheers",
    subtitle: "Large event destination focused on weddings, banquets and celebration venues.",
    staffing: "Banquet Operations",
    warning: "Large parking area required.|Traffic movement planning is essential.|Kitchen capacity must match event size.|Soundproof banquet halls recommended.|Rain backup planning required.",
    vendors: "Banquet Kitchen Consultant|Stage Vendor|AV System Vendor|Lighting Vendor|Landscape Consultant|Tent Supplier|Cold Storage Vendor|Furniture Vendor",
    experts: "Banquet Consultant|Kitchen Designer|Event Planner|Operations Advisor",
    risks: "Seasonal business demand.|Weekend dependency.|Weather impact.|High utility consumption.|Event cancellation risk."
  },
  {
    id: "highway_hotel",
    title: "Highway Hotel",
    tagline: "Highway Hotel",
    description: "Transit-oriented properties designed for travellers, restaurants and quick stays.",
    icon: "fa-road",
    subtitle: "Transit-oriented hospitality project designed for highway travellers and restaurants.",
    staffing: "Transit Hospitality",
    warning: "Truck parking must be separated.|Restaurant visibility is critical.|Fuel station safety norms.|Highway entry planning.|Washroom maintenance planning.",
    vendors: "Restaurant Planner|Fuel Consultant|Parking Contractor|Kitchen Equipment Supplier|Security Vendor|Outdoor Signage Vendor|Electrical Consultant|Landscape Vendor",
    experts: "Highway Hospitality Consultant|Restaurant Advisor|Architect|Operations Consultant",
    risks: "Traffic dependency.|Fuel price impact.|Night staffing challenges.|Road competition.|Maintenance costs."
  },
  {
    id: "heritage_hotel",
    title: "Heritage Hotel",
    tagline: "Heritage Hotel",
    description: "Restored heritage assets delivering authentic cultural experiences with luxury positioning.",
    icon: "fa-landmark",
    subtitle: "Historic hospitality property delivering authentic heritage experiences with luxury positioning.",
    staffing: "Luxury Heritage",
    warning: "Conservation approvals required.|Structural restoration needed.|Traditional material sourcing.|Accessibility planning.|Fire compliance for heritage structures.",
    vendors: "Conservation Architect|Stone Contractor|Heritage Interior Designer|Lighting Consultant|Museum Consultant|Luxury Furniture Vendor|Landscape Architect|Restoration Contractor",
    experts: "Heritage Architect|Restoration Consultant|Luxury Brand Advisor|Hospitality Planner",
    risks: "Higher restoration costs.|Approval delays.|Limited structural modifications.|Tourism dependency.|Long project duration."
  }
];

const JOURNEY_STEPS = [
  {
    step: "1",
    label: "Idea",
    icon: "fa-lightbulb",
    decideTitle: "Define Your Hotel Vision",
    decideDesc: "Decide what to build, which hospitality segment to target, expected investment and who your ideal guest will be.",
    decideItems: ["Hotel Category", "Target Market", "Budget Planning", "Revenue Strategy"],
    outputTitle: "Concept Brief",
    outputDesc: "A clear project concept that becomes the foundation for land selection, feasibility study and investor discussions.",
    outputVal: "Hospitality Concept Note",
    flow: [
      { stage: "Idea Stage", text: "Finalize hotel category, target customer and investment objective." },
      { stage: "Land Available", text: "Check access road, utilities, zoning regulations and tourism potential." },
      { stage: "Design Ready", text: "Review architecture, guest flow, BOH planning, kitchen and MEP layouts." },
      { stage: "Construction", text: "Finalize contractor, BOQ, procurement strategy and approvals." },
      { stage: "Pre Opening", text: "Recruit team, install PMS, marketing launch and trial operations." },
      { stage: "First 100 Days", text: "Monitor occupancy, RevPAR, guest reviews, staffing and cash flow." }
    ]
  },
  {
    step: "2",
    label: "Land",
    icon: "fa-location-dot",
    decideTitle: "Evaluate Site & Location",
    decideDesc: "Validate site accessibility, connectivity, high FAR guidelines, stamp duty exemptions, and utility alignments.",
    decideItems: ["Zoning Check", "FAR Allowances", "Utility Access", "Road Access"],
    outputTitle: "Land Due Diligence Report",
    outputDesc: "Legal title search and master zoning clearances from state town planning boards.",
    outputVal: "Zoning & Title Clearance Certificate",
    flow: [
      { stage: "Title Search", text: "Execute full independent registry checks before making site advances." },
      { stage: "Utility Mapping", text: "Coordinate electrical grid connectivity and municipal water sizing." }
    ]
  },
  {
    step: "3",
    label: "Feasibility",
    icon: "fa-chart-column",
    decideTitle: "Establish Project Viability",
    decideDesc: "Conduct detailed financial demand modeling, analyze competitor rates (ADR/RevPAR), and project stabilization.",
    decideItems: ["ADR Estimates", "Stabilization Metrics", "Debt Capacity", "Subsidies Evaluation"],
    outputTitle: "Feasibility Report",
    outputDesc: "DPR (Detailed Project Report) containing financial estimations, ROI, and debt payback period analysis.",
    outputVal: "Detailed Feasibility & DPR",
    flow: [
      { stage: "DPR Audit", text: "Review Capex estimation spreadsheets with professional auditors." },
      { stage: "State Subsidy", text: "Verify eligibility for tourism capital and stamp duty concessions." }
    ]
  },
  {
    step: "4",
    label: "Design",
    icon: "fa-pencil-ruler",
    decideTitle: "Develop Architectural Concept",
    decideDesc: "Create spatial zoning schematic layouts, guest room prototypes, circulation designs, and MEP schematic routing.",
    decideItems: ["Guestroom Layouts", "Kitchen flow zoning", "MEP integration", "Exterior landscaping"],
    outputTitle: "Architectural Schematic Design",
    outputDesc: "Complete architectural flow blueprint defining structural positioning and public/private zoning boundaries.",
    outputVal: "Schematic Architectural Blueprint",
    flow: [
      { stage: "Interior Theme", text: "Lock FF&E interior finishes and lighting design frameworks." },
      { stage: "MEP Sizing", text: "Define HVAC plant positioning, electrical kVA, and STP locations." }
    ]
  },
  {
    step: "5",
    label: "Approvals",
    icon: "fa-file-circle-check",
    decideTitle: "Obtain Permissions & NOCs",
    decideDesc: "Apply for municipal construction sanctions, fire department NOC, pollution board consents, and water grid connection approvals.",
    decideItems: ["Building Sanction", "Fire Dept NOC", "Pollution CTO/CTE", "Power Allocation"],
    outputTitle: "Approvals Matrix & NOCs",
    outputDesc: "Consolidated list of active permits allowing civil excavation and installation of services.",
    outputVal: "Municipal Building Permission Certificate",
    flow: [
      { stage: "Fire Audit", text: "Ensure escape staircases and wet-riser loops align with code requirements." }
    ]
  },
  {
    step: "6",
    label: "Construction",
    icon: "fa-building",
    decideTitle: "Manage Civil Execution",
    decideDesc: "Coordinate excavation, concrete pouring, MEP piping containment, drywall partitioning, and finish detailing.",
    decideItems: ["Civil Shell", "Drywall Containment", "MEP Plant Install", "Facade Finishing"],
    outputTitle: "As-Built Civil Drawings",
    outputDesc: "Construction reports detailing physical execution records and structural stability stamps.",
    outputVal: "Structural Stability Certification",
    flow: [
      { stage: "Quality Audits", text: "Verify concrete strength ratings and pressure test plumbing stacks." }
    ]
  },
  {
    step: "7",
    label: "Procurement",
    icon: "fa-truck-fast",
    decideTitle: "Manage Sourcing & FF&E",
    decideDesc: "Purchase furniture, fixtures, commercial kitchen ranges, guest laundry washers, PMS databases, and room OS&E items.",
    decideItems: ["FF&E Procurement", "OS&E Supply Logs", "POS Software", "BOH Equipment"],
    outputTitle: "Procurement Manifests",
    outputDesc: "Vendor purchase summaries, shipment delivery sheets, and material warranty cards.",
    outputVal: "Purchase Order Manifest & Asset Registry",
    flow: [
      { stage: "Supplier Audit", text: "Check custom finishes and verify delivery timelines." }
    ]
  },
  {
    step: "8",
    label: "Pre Opening",
    icon: "fa-key",
    decideTitle: "Execute Operational Readiness",
    decideDesc: "Onboard executive leadership, dry-run kitchen operations, test PMS integrations, and roll out marketing campaigns.",
    decideItems: ["Staff Onboarding", "Dry-Run Operations", "PMS Integration", "PR Campaign Launch"],
    outputTitle: "Operational Readiness Clearance",
    outputDesc: "Final operational audit report verifying brand standards compliance and licensing compliance.",
    outputVal: "Brand Standard License Certificate",
    flow: [
      { stage: "Soft Launch", text: "Host test events and guest trials to tune services." }
    ]
  },
  {
    step: "9",
    label: "First 100 Days",
    icon: "fa-flag-checkered",
    decideTitle: "Optimize Market Stabilization",
    decideDesc: "Measure occupancy performance, monitor daily RevPAR, coordinate sales pipelines, and address guest review scores.",
    decideItems: ["RevPAR Tracking", "Review Score Audits", "Staff Optimization", "Cash Flow Audits"],
    outputTitle: "100-Day Performance Audit",
    outputDesc: "Operational report detailing stabilization yields, guest satisfaction metrics, and cash flow results.",
    outputVal: "100-Day Stabilization Review",
    flow: [
      { stage: "Yield Management", text: "Re-tune dynamic pricing bands on OTA channels based on demand." }
    ]
  }
];

const ASSUMPTIONS_DATA = [
  { title: "Capex Per Key", val: "₹55L – ₹1.2 Cr", desc: "Estimated investment required per hotel room.", badge1: "Industry Benchmark", badge2: "Consultant", status: "Verified", statusColor: "verified" },
  { title: "Breakeven Occupancy", val: "50–58%", desc: "Expected occupancy to achieve operational breakeven.", badge1: "Operator", badge2: "Benchmark", status: "Stable", statusColor: "green" },
  { title: "Approval Lead Time", val: "9–18 Months", desc: "Government approvals and statutory permissions.", badge1: "Government", badge2: "Consultant", status: "Official", statusColor: "blue" },
  { title: "Construction Timeline", val: "16–22 Months", desc: "Construction duration from groundbreaking to handover.", badge1: "Contractor", badge2: "PMC", status: "Verified", statusColor: "verified" },
  { title: "Staff Per Key", val: "0.8–1.5", desc: "Staffing ratio based on hotel positioning.", badge1: "Operations", badge2: "HR", status: "Standard", statusColor: "green" },
  { title: "Electrical Load", val: "7–9 kVA", desc: "Electrical requirement per room.", badge1: "MEP", badge2: "Consultant", status: "Technical", statusColor: "blue" },
  { title: "Guest Room Size", val: "240–360 sqft", desc: "Typical guest room area for business hotels.", badge1: "Brand Standard", badge2: "Architect", status: "Premium", statusColor: "verified" },
  { title: "Pre-opening Cost", val: "5–7%", desc: "Budget before opening operations.", badge1: "Finance", badge2: "Operator", status: "Planning", statusColor: "green" }
];

const VendorPlanning = () => {
  const [activeProject, setActiveProject] = useState(PROJECT_PROFILES[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeJourneyStep, setActiveJourneyStep] = useState(JOURNEY_STEPS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNavTab, setActiveNavTab] = useState("step1");

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter assumptions based on search
  const filteredAssumptions = ASSUMPTIONS_DATA.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="vendor-planning-scope-root">
      <div className="vendor-planning-scope">
        {/* HERO SECTION */}
        <section className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop')`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="hero-overlay"></div>
          <div className="hero-container">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              HOSPITALITY PROJECT PLANNING & DEVELOPMENT
            </div>
            <div className="hero-content">
              <h1>
                Plan Hospitality Projects
                <br />
                With <span>Confidence.</span>
              </h1>
              <p>
                From concept to completion, we help you plan, develop and launch successful hospitality projects.
              </p>
              <div className="hero-buttons">
                <a href="#step1" className="btn-primary">
                  Start Your Project
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: "8px" }}>→</i>
                </a>
                <a href="#step2" className="btn-outline">
                  Book Free Consultation
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PLANNER WRAPPER */}
        <section className="planner-wrapper">
          <div className="planner-container">
            <nav className="planner-nav">
              <div className="planner-nav-inner">
                <a
                  href="#step1"
                  className={`planner-tab ${activeNavTab === "step1" ? "active" : ""}`}
                  onClick={() => setActiveNavTab("step1")}
                >
                  <span>01</span>
                  <strong>Project Type</strong>
                </a>
                <a
                  href="#step2"
                  className={`planner-tab ${activeNavTab === "step2" ? "active" : ""}`}
                  onClick={() => setActiveNavTab("step2")}
                >
                  <span>02</span>
                  <strong>Planning Numbers</strong>
                </a>
                <a
                  href="#step3"
                  className={`planner-tab ${activeNavTab === "step3" ? "active" : ""}`}
                  onClick={() => setActiveNavTab("step3")}
                >
                  <span>03</span>
                  <strong>Project Journey</strong>
                </a>
                <a
                  href="#step4"
                  className={`planner-tab ${activeNavTab === "step4" ? "active" : ""}`}
                  onClick={() => setActiveNavTab("step4")}
                >
                  <span>04</span>
                  <strong>Assumptions</strong>
                </a>
                <a
                  href="#step1"
                  className="planner-tab"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("projectDetails")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span>05</span>
                  <strong>Experts</strong>
                </a>
                <a
                  href="#step4"
                  className="planner-tab"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("step4")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span>06</span>
                  <strong>Owner Excel</strong>
                </a>
                <a
                  href="#step4"
                  className="planner-tab"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("step4")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span>07</span>
                  <strong>Final Review</strong>
                </a>
              </div>
            </nav>
          </div>
        </section>

        {/* STEP 1: PROJECT TYPE */}
        <section id="step1" className="planner-section">
          <div className="planner-container">
            <div className="step-header">
              <span className="step-badge">STEP 01</span>
              <h2>
                Start with your <span>Project Type</span>
              </h2>
              <p>
                Select the hospitality project that best matches your vision. Every selection updates planning assumptions, staffing, consultants, investment priorities and operational guidance.
              </p>
            </div>

            {/* PROJECT CARDS GRID */}
            <div className="project-grid">
              {PROJECT_PROFILES.map((profile) => (
                <div
                  key={profile.id}
                  className={`project-card ${activeProject.id === profile.id ? "active" : ""}`}
                  onClick={() => {
                    setActiveProject(profile);
                    setActiveNavTab("step1");
                  }}
                >
                  <div className="project-icon">
                    <i className={`fas ${profile.icon}`}></i>
                  </div>
                  <h3>{profile.tagline}</h3>
                  <p>{profile.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PROJECT DETAILS CARD */}
          <div className="project-details-card" id="projectDetails" style={{ maxWidth: "1200px", margin: "2.5rem auto" }}>
            <div className="details-top">
              <div className="details-left">
                <div className="details-icon">
                  <i className={`fas ${activeProject.icon}`}></i>
                </div>
                <div className="details-heading">
                  <h2>{activeProject.title}</h2>
                  <p>{activeProject.subtitle}</p>
                </div>
              </div>

              <div className="staffing-chip">
                <span>Staffing Band</span>
                <strong>{activeProject.staffing}</strong>
              </div>
            </div>

            <div className="details-grid">
              {/* DESIGN WARNINGS */}
              <div className="info-box warning-box">
                <div className="box-head">
                  <i className="fas fa-triangle-exclamation"></i>
                  <h4>Design Warnings</h4>
                </div>
                <ul>
                  {activeProject.warning.split("|").map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* VENDOR PRIORITIES */}
              <div className="info-box vendor-box">
                <div className="box-head">
                  <i className="fas fa-layer-group"></i>
                  <h4>Vendor Priorities</h4>
                </div>
                <div className="chip-group">
                  {activeProject.vendors.split("|").map((item, idx) => (
                    <span key={idx}>{item}</span>
                  ))}
                </div>

                <h5 className="expert-title">Recommended Experts</h5>
                <div className="expert-list">
                  {activeProject.experts.split("|").map((item, idx) => (
                    <span key={idx}>{item}</span>
                  ))}
                </div>
              </div>

              {/* PLANNING RISKS */}
              <div className="info-box risk-box">
                <div className="box-head">
                  <i className="fas fa-shield-halved"></i>
                  <h4>Planning Risks</h4>
                </div>
                <ul>
                  {activeProject.risks.split("|").map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* HIGHLIGHT STATS */}
            <div className="project-highlights">
              <div className="highlight">
                <h3>120+</h3>
                <p>Planning Parameters</p>
              </div>
              <div className="highlight">
                <h3>35+</h3>
                <p>Expert Categories</p>
              </div>
              <div className="highlight">
                <h3>100%</h3>
                <p>Owner Focused</p>
              </div>
              <div className="highlight">
                <h3>AI</h3>
                <p>Smart Recommendations</p>
              </div>
            </div>

            <div className="details-buttons">
              <a href="#step2" className="btn-primary" onClick={() => setActiveNavTab("step2")}>
                View Planning Numbers
                <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}>→</i>
              </a>
              <a href="#step1" className="btn-primary" onClick={() => {
                document.getElementById("projectDetails")?.scrollIntoView({ behavior: "smooth" });
              }}>
                Browse Expert Categories
              </a>
            </div>
          </div>
        </section>

        {/* STEP 2: PLANNING NUMBERS */}
        <section id="step2" className="planner-section planner-step2">
          <div className="step2-container">
            <div className="step2-heading">
              <span className="step-label">STEP 02</span>
              <h2>
                Know the <span>8 Planning Numbers</span>
              </h2>
              <p>
                These planning ranges help estimate investment, approvals, staffing and operational requirements before detailed feasibility.
              </p>
            </div>

            <div className="planning-grid">
              {/* Card 1: Capex */}
              <div className="plan-card">
                <div className="card-top">
                  <div className="icon-box">
                    <i className="fa-solid fa-sack-dollar"></i>
                  </div>
                  <span className="info" onClick={() => setIsModalOpen(true)}>
                    <i className="fa-solid fa-circle-info">ℹ</i>
                  </span>
                </div>
                <small>CAPEX PER KEY</small>
                <h3>₹55L – ₹1.2 Cr</h3>
                <p>Estimated investment required per hotel room.</p>
                <button className="assumption-btn" onClick={() => setIsModalOpen(true)}>
                  View Assumptions
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: "6px" }}>→</i>
                </button>
              </div>

              {/* Card 2: Breakeven Occupancy */}
              <div className="plan-card">
                <div className="card-top">
                  <div className="icon-box">
                    <i className="fa-solid fa-chart-line"></i>
                  </div>
                  <span className="info">
                    <i className="fa-solid fa-circle-info">ℹ</i>
                  </span>
                </div>
                <small>BREAK-EVEN OCCUPANCY</small>
                <h3>50–58%</h3>
                <p>Approximate occupancy required for breakeven.</p>
                <button className="assumption-btn" onClick={() => setIsModalOpen(true)}>
                  View Assumptions
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: "6px" }}>→</i>
                </button>
              </div>

              {/* Card 3: Approvals */}
              <div className="plan-card">
                <div className="card-top">
                  <div className="icon-box">
                    <i className="fa-solid fa-hourglass-half"></i>
                  </div>
                  <span className="info">
                    <i className="fa-solid fa-circle-info">ℹ</i>
                  </span>
                </div>
                <small>APPROVAL LEAD TIME</small>
                <h3>9–18 Months</h3>
                <p>Government approvals and compliance timeline.</p>
                <button className="assumption-btn" onClick={() => setIsModalOpen(true)}>
                  View Assumptions
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: "6px" }}>→</i>
                </button>
              </div>

              {/* Card 4: Construction Time */}
              <div className="plan-card">
                <div className="card-top">
                  <div className="icon-box">
                    <i className="fa-solid fa-building"></i>
                  </div>
                  <span className="info">
                    <i className="fa-solid fa-circle-info">ℹ</i>
                  </span>
                </div>
                <small>CONSTRUCTION TIME</small>
                <h3>16–22 Months</h3>
                <p>Average construction period for project completion.</p>
                <button className="assumption-btn" onClick={() => setIsModalOpen(true)}>
                  View Assumptions
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: "6px" }}>→</i>
                </button>
              </div>

              {/* Card 5: Staffing */}
              <div className="plan-card">
                <div className="card-top">
                  <div className="icon-box">
                    <i className="fa-solid fa-users"></i>
                  </div>
                  <span className="info">
                    <i className="fa-solid fa-circle-info">ℹ</i>
                  </span>
                </div>
                <small>STAFF PER KEY</small>
                <h3>0.80 – 1.50</h3>
                <p>Recommended staffing ratio per hotel room.</p>
                <button className="assumption-btn" onClick={() => setIsModalOpen(true)}>
                  View Assumptions
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: "6px" }}>→</i>
                </button>
              </div>

              {/* Card 6: Electrical Load */}
              <div className="plan-card">
                <div className="card-top">
                  <div className="icon-box">
                    <i className="fa-solid fa-bolt"></i>
                  </div>
                  <span className="info">
                    <i className="fa-solid fa-circle-info">ℹ</i>
                  </span>
                </div>
                <small>ELECTRICAL LOAD</small>
                <h3>7–9 kVA / Key</h3>
                <p>Typical electrical demand for hotel operations.</p>
                <button className="assumption-btn" onClick={() => setIsModalOpen(true)}>
                  View Assumptions
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: "6px" }}>→</i>
                </button>
              </div>

              {/* Card 7: Room Size */}
              <div className="plan-card">
                <div className="card-top">
                  <div className="icon-box">
                    <i className="fa-solid fa-bed"></i>
                  </div>
                  <span className="info">
                    <i className="fa-solid fa-circle-info">ℹ</i>
                  </span>
                </div>
                <small>GUEST ROOM SIZE</small>
                <h3>240–360 sqft</h3>
                <p>Typical guest room area for business hotels.</p>
                <button className="assumption-btn" onClick={() => setIsModalOpen(true)}>
                  View Assumptions
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: "6px" }}>→</i>
                </button>
              </div>

              {/* Card 8: Pre-Opening */}
              <div className="plan-card">
                <div className="card-top">
                  <div className="icon-box">
                    <i className="fa-solid fa-wallet"></i>
                  </div>
                  <span className="info">
                    <i className="fa-solid fa-circle-info">ℹ</i>
                  </span>
                </div>
                <small>PRE-OPENING COST</small>
                <h3>5–7% of Capex</h3>
                <p>Estimated pre-opening operational expenses.</p>
                <button className="assumption-btn" onClick={() => setIsModalOpen(true)}>
                  View Assumptions
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: "6px" }}>→</i>
                </button>
              </div>
            </div>

            <div className="planning-note">
              <i className="fa-solid fa-triangle-exclamation">⚠</i>
              <div>
                <h4>Read this first</h4>
                <p>
                  These are planning ranges and not final estimates. Actual values depend on location, approvals, design, consultant inputs and project scope.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STEP 3: PROJECT JOURNEY */}
        <section id="step3" className="planner-section journey-section">
          <div className="journey-container">
            <div className="journey-bg-circle bg1"></div>
            <div className="journey-bg-circle bg2"></div>

            <div className="journey-heading">
              <span className="journey-label">STEP 03</span>
              <h2>
                Understand Your <span>Project Journey</span>
              </h2>
              <p>
                Follow the complete hospitality development roadmap—from selecting the right opportunity to opening your hotel. Every stage tells you what to decide, what to prepare, and what comes next.
              </p>
            </div>

            {/* JOURNEY TABS */}
            <div className="journey-tabs">
              {JOURNEY_STEPS.map((step) => (
                <button
                  key={step.step}
                  className={`journey-tab ${activeJourneyStep.step === step.step ? "active" : ""}`}
                  onClick={() => {
                    setActiveJourneyStep(step);
                    setActiveNavTab("step3");
                  }}
                >
                  <span className="step-no">0{step.step}</span>
                  <div className="step-icon">
                    <i className={`fa-solid ${step.icon}`}></i>
                  </div>
                  <span className="step-text">{step.label}</span>
                </button>
              ))}
            </div>

            {/* DYNAMIC JOURNEY CONTENT */}
            <div id="journeyContent">
              <div className="journey-panel active">
                <div className="journey-cards">
                  <div className="journey-card">
                    <span className="card-label">WHAT YOU DECIDE</span>
                    <h3>{activeJourneyStep.decideTitle}</h3>
                    <p>{activeJourneyStep.decideDesc}</p>
                    <ul>
                      {activeJourneyStep.decideItems.map((item, idx) => (
                        <li key={idx}>✔ {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="journey-card">
                    <span className="card-label">OUTPUT EXPECTED</span>
                    <h3>{activeJourneyStep.outputTitle}</h3>
                    <p>{activeJourneyStep.outputDesc}</p>
                    <div className="output-box">
                      <i className="fa-solid fa-file-lines">📄</i>
                      <div>
                        <strong>Deliverable</strong>
                        <p>{activeJourneyStep.outputVal}</p>
                      </div>
                    </div>
                  </div>

                  <div className="journey-card decision-card">
                    <span className="card-label">DECISION FLOW</span>
                    <h3>Ready to Continue?</h3>
                    <p>If your hotel development stage is clear, align with our consultant team to lock resources.</p>
                    <a href="#step1" className="expert-btn">
                      Find The Right Expert
                      <i className="fa-solid fa-arrow-right" style={{ marginLeft: "8px" }}>→</i>
                    </a>
                  </div>
                </div>

                <div className="decision-flow">
                  <h3>Owner Decision Flow</h3>
                  <div className="flow-table">
                    {activeJourneyStep.flow.map((row, idx) => (
                      <div key={idx} className="flow-row">
                        <div className="flow-stage">{row.stage}</div>
                        <div className="flow-text">{row.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STEP 4: ASSUMPTIONS */}
        <section id="step4" className="planner-section assumptions-section">
          <div className="assumption-container">
            <div className="assumption-heading">
              <span className="step-tag">STEP 04</span>
              <h2>
                Check The <span>Planning Assumptions</span>
              </h2>
              <p>
                Every planning number is based on assumptions. Review the benchmark, source and confidence level before making any investment decision.
              </p>
            </div>

            {/* SEARCH BOX */}
            <div className="assumption-search" style={{ position: "relative" }}>
              <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dark-muted)" }}>🔍</i>
              <input
                type="text"
                placeholder="Search assumption..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveNavTab("step4");
                }}
                style={{ paddingLeft: "40px" }}
              />
            </div>

            {/* ASSUMPTION CARDS GRID */}
            <div className="assumption-grid">
              {filteredAssumptions.map((ass, idx) => (
                <div key={idx} className="assumption-card">
                  <div className="card-head">
                    <h3>{ass.title}</h3>
                    <span className={`status ${ass.statusColor}`}>{ass.status}</span>
                  </div>
                  <h4>{ass.val}</h4>
                  <p>{ass.desc}</p>
                  <div className="badge-row">
                    <span>{ass.badge1}</span>
                    <span>{ass.badge2}</span>
                  </div>
                </div>
              ))}
              {filteredAssumptions.length === 0 && (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "2rem", color: "var(--text-dark-muted)" }}>
                  No assumptions found matching "{searchQuery}"
                </div>
              )}
            </div>

            <div className="assumption-note">
              <i className="fa-solid fa-circle-info">ℹ</i>
              <div>
                <h4>Important Note</h4>
                <p>
                  These values are planning assumptions only. Actual project costs depend on location, brand, approvals, market conditions, consultants and project scope.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="innsight-footer">
          <div className="footer-container">
            <div className="footer-brand" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <h2>Sol & Sands</h2>
              <h4>Hospitality Investment Advisory · MP Tourism Policy 2025</h4>
              <p>
                Indicative advisory platform. Not official government guidance. For discrepancies, Hindi version of the policy prevails. Verify with MP Tourism Department before filing.
              </p>
            </div>
            <div className="footer-col">
              <h5>NAVIGATION</h5>
              <a href="/">Home</a>
              <a href="#step1" onClick={() => setActiveNavTab("step1")}>Project Type</a>
              <a href="#step2" onClick={() => setActiveNavTab("step2")}>Planning Numbers</a>
              <a href="#step3" onClick={() => setActiveNavTab("step3")}>Project Journey</a>
            </div>
            <div className="footer-col">
              <h5>HOSPITALITY</h5>
              <a href="#step1">Hotel Properties</a>
              <a href="#step2">Wayside Amenities</a>
              <a href="#step3">Subsidy NOCs</a>
              <a href="#step4">Vendor Connect</a>
            </div>
            <div className="footer-col official">
              <h5>OFFICIAL SOURCES</h5>
              <a href="https://tourism.mp.gov.in/" target="_blank" rel="noopener noreferrer">MP Tourism Board ↗</a>
              <a href="https://tourism.gov.in/" target="_blank" rel="noopener noreferrer">Ministry of Tourism ↗</a>
            </div>
          </div>
        </footer>

        {/* ASSUMPTIONS MODAL */}
        {isModalOpen && (
          <div className="assumption-modal-overlay active" id="assumptionModal" onClick={(e) => {
            if (e.target.id === "assumptionModal") setIsModalOpen(false);
          }}>
            <div className="assumption-modal">
              <button className="assumption-close" onClick={() => setIsModalOpen(false)}>
                <i className="fa-solid fa-xmark">✖</i>
              </button>

              <div className="assumption-header">
                <span className="modal-label">THE MATH BEHIND THE NUMBER</span>
                <h2>Capex per key</h2>
              </div>

              <div className="assumption-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                <div className="modal-block">
                  <h4>WHAT THIS NUMBER MEANS</h4>
                  <p>
                    Total capital expenditure to build one key — land development, civil works, MEP, interiors, FF&E, OS&E, soft costs and pre-opening burn. Excludes land cost unless stated.
                  </p>
                </div>

                <div className="selected-range">
                  <span>FOR YOUR SELECTED PROJECT: {activeProject.title.toUpperCase()}</span>
                  <h3>₹55L – ₹1.2 Cr</h3>
                </div>

                <div className="range-title">TYPICAL RANGE BY PROJECT TYPE</div>

                <div className="range-table">
                  <div className="range-row">
                    <div className="range-left">🏢 City / Business Hotel</div>
                    <div className="range-right">₹55L – ₹1.2 Cr</div>
                  </div>
                  <div className="range-row">
                    <div className="range-left">🏨 Budget / Midscale Hotel</div>
                    <div className="range-right">₹28L – ₹55L</div>
                  </div>
                  <div className="range-row">
                    <div className="range-left">✨ Luxury / Boutique Hotel</div>
                    <div className="range-right">₹1.5 Cr – ₹3 Cr+</div>
                  </div>
                  <div className="range-row">
                    <div className="range-left">🌿 Wildlife / Nature Resort</div>
                    <div className="range-right">₹45L – ₹1.5 Cr</div>
                  </div>
                  <div className="range-row">
                    <div className="range-left">💒 Marriage Garden / Banquet</div>
                    <div className="range-right">Use per-sqft / event</div>
                  </div>
                  <div className="range-row">
                    <div className="range-left">🛣 Highway / Transit Property</div>
                    <div className="range-right">₹30L – ₹70L</div>
                  </div>
                  <div className="range-row">
                    <div className="range-left">🏛 Boutique / Heritage / Experiential</div>
                    <div className="range-right">₹80L – ₹2.5 Cr</div>
                  </div>
                </div>

                <div className="drivers-wrapper">
                  <div className="driver-card">
                    <div className="driver-title" style={{ color: "#721a1a" }}>WHAT DRIVES IT UP</div>
                    <ul>
                      <li>Luxury positioning & premium FF&E</li>
                      <li>Tier-1 land development</li>
                      <li>Larger built-up area per key</li>
                      <li>Imported materials & finishes</li>
                      <li>High-end MEP & HVAC systems</li>
                      <li>Slow construction / financing delays</li>
                    </ul>
                  </div>

                  <div className="driver-card">
                    <div className="driver-title" style={{ color: "#1a5428" }}>WHAT DRIVES IT DOWN</div>
                    <ul>
                      <li>Mid-scale / budget positioning</li>
                      <li>Tier-2 / Tier-3 location</li>
                      <li>Efficient room layouts</li>
                      <li>Local FF&E sourcing</li>
                      <li>Disciplined construction management</li>
                      <li>Standard specifications</li>
                    </ul>
                  </div>
                </div>

                <div className="assumption-note" style={{ marginTop: "1rem" }}>
                  <strong>What you should not assume.</strong>
                  <p>
                    Don't assume a competitor's cost per key automatically applies to your project. Every hotel has different land conditions, civil scope, design standards, operating model and consultant strategy.
                  </p>
                </div>

                <div className="assumption-warning" style={{ marginTop: "1rem" }}>
                  <strong>⚠ Manual review required</strong>
                  <p>
                    Flag for manual review if your project involves heritage restoration, hill stations, imported heavy specification, complex structural systems, unusual site conditions, or luxury branded developments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorPlanning;
