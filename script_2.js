const cards = document.querySelectorAll(".project-card");

const projectTitle = document.getElementById("projectTitle");
const projectSubtitle = document.getElementById("projectSubtitle");
const projectIcon = document.getElementById("projectIcon");
const staffingBand = document.getElementById("staffingBand");

const warningList = document.getElementById("warningList");
const vendorList = document.getElementById("vendorList");
const expertList = document.getElementById("expertList");
const riskList = document.getElementById("riskList");

cards.forEach(card => {

    card.addEventListener("click", function () {

        // Active Card
        cards.forEach(c => c.classList.remove("active"));
        this.classList.add("active");

        // Top Details
        projectTitle.textContent = this.dataset.title;
        projectSubtitle.textContent = this.dataset.subtitle;
        staffingBand.textContent = this.dataset.staffing;

        projectIcon.className = "fas " + this.dataset.icon;

        // Warning List
        warningList.innerHTML = "";
        this.dataset.warning.split("|").forEach(item => {
            warningList.innerHTML += `<li>${item}</li>`;
        });

        // Vendors
        vendorList.innerHTML = "";
        this.dataset.vendors.split("|").forEach(item => {
            vendorList.innerHTML += `<span>${item}</span>`;
        });

        // Experts
        expertList.innerHTML = "";
        this.dataset.experts.split("|").forEach(item => {
            expertList.innerHTML += `<span>${item}</span>`;
        });

        // Risks
        riskList.innerHTML = "";
        this.dataset.risks.split("|").forEach(item => {
            riskList.innerHTML += `<li>${item}</li>`;
        });

    });

});


const assumptionModal =
document.getElementById("assumptionModal");

const openAssumption =
document.getElementById("openAssumptionModal");

const closeAssumption =
document.getElementById("closeAssumptionModal");

// OPEN

openAssumption.addEventListener("click", () => {

    assumptionModal.classList.add("active");

    document.body.style.overflow = "hidden";

});

// CLOSE BUTTON

closeAssumption.addEventListener("click", () => {

    assumptionModal.classList.remove("active");

    document.body.style.overflow = "";

});

// CLICK OUTSIDE

assumptionModal.addEventListener("click", function(e){

    if(e.target === assumptionModal){

        assumptionModal.classList.remove("active");

        document.body.style.overflow = "";

    }

});

// ESC KEY

document.addEventListener("keydown", function(e){

    if(e.key === "Escape"){

        assumptionModal.classList.remove("active");

        document.body.style.overflow = "";

    }

});