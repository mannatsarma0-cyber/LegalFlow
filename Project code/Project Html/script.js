console.log("LegalFlow JavaScript is working!");

// ==================================
// 1. DASHBOARD ELEMENTS
// ==================================

const searchInput = document.getElementById("documentSearch");
const documentFormContainer = document.querySelector(".document-form-container");
const documentTable = document.querySelector(".documents tbody");

const addDocumentBtn = document.getElementById("addDocumentBtn");
const documentForm = document.getElementById("documentForm");
const cancelDocumentBtn = document.getElementById("cancelDocumentBtn");

// Store document details
const documentDetails = {
    "Employment Contract": {
        reviewer: "Rahul Sharma",
        status: "Pending",
        priority: "High"
    },
    "Service Agreement": {
        reviewer: "Priya Singh",
        status: "In Review",
        priority: "Medium"
    },
    "Partnership Deed": {
        reviewer: "Aman Verma",
        status: "Approved",
        priority: "Low"
    },
    "Confidentiality Agreement": {
        reviewer: "Neha Kapoor",
        status: "Pending",
        priority: "High"
    }
};

// ==================================
// 2. SEARCH DOCUMENTS
// ==================================

if (searchInput && documentTable) {

    searchInput.addEventListener("input", function () {

        const searchText = searchInput.value.toLowerCase().trim();
        const rows = documentTable.querySelectorAll("tr");

        rows.forEach(function (row) {

            const rowText = row.textContent.toLowerCase();

            row.style.display = rowText.includes(searchText) ? "" : "none";

        });
    });
}

// ==================================
// 3. OPEN AND CLOSE ADD DOCUMENT FORM
// ==================================

if (addDocumentBtn && documentFormContainer) {

    addDocumentBtn.addEventListener("click", function () {
        documentFormContainer.hidden = false;
    });
}

if (cancelDocumentBtn && documentForm && documentFormContainer) {

    cancelDocumentBtn.addEventListener("click", function () {

        documentForm.reset();
        documentFormContainer.hidden = true;

    });
}

// ==================================
// 4. SAVE NEW DOCUMENT
// ==================================

if (documentForm && documentTable) {

    documentForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("documentName").value.trim();
        const reviewer = document.getElementById("reviewerName").value.trim();
        const status = document.getElementById("documentStatus").value;
        const priority = document.getElementById("documentPriority").value;

        if (!name || !reviewer) {
            alert("Please enter the document name and reviewer.");
            return;
        }

        // Create a new row

        const row = document.createElement("tr");

        // Document name

        const nameCell = document.createElement("td");

        const nameButton = document.createElement("button");

        nameButton.className = "document-link";
        nameButton.textContent = name;
        nameButton.dataset.document = name;

        nameCell.appendChild(nameButton);

        // Reviewer

        const reviewerCell = document.createElement("td");
        reviewerCell.textContent = reviewer;

        // Status

        const statusCell = document.createElement("td");
        const statusBadge = document.createElement("span");

        statusBadge.className = "status " + status;

        const statusLabels = {
            pending: "Pending",
            reviewing: "In Review",
            approved: "Approved"
        };

        statusBadge.textContent = statusLabels[status] || status;

        statusCell.appendChild(statusBadge);

        // Priority

        const priorityCell = document.createElement("td");
        const priorityBadge = document.createElement("span");

        priorityBadge.className = "priority " + priority;

        const priorityLabels = {
            high: "High",
            medium: "Medium",
            low: "Low"
        };

        priorityBadge.textContent = priorityLabels[priority] || priority;

        priorityCell.appendChild(priorityBadge);

        // Add cells to row

        row.append(nameCell, reviewerCell, statusCell, priorityCell);

        documentTable.appendChild(row);

        // Save details for popup

        documentDetails[name] = {
            reviewer: reviewer,
            status: statusLabels[status] || status,
            priority: priorityLabels[priority] || priority
        };

        // Reset and close form

        documentForm.reset();

        if (documentFormContainer) {
            documentFormContainer.hidden = true;
        }

        // Update search and statistics

        if (searchInput) {
            searchInput.dispatchEvent(new Event("input"));
        }

        updateDashboardStats();

        alert("Document added successfully!");

    });
}

// ==================================
// 5. DOCUMENT DETAILS POPUP
// ==================================

const documentModal = document.getElementById("documentModal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalReviewer = document.getElementById("modalReviewer");
const modalStatus = document.getElementById("modalStatus");
const modalPriority = document.getElementById("modalPriority");

// Use event delegation so new documents work too

if (documentTable && documentModal) {

    documentTable.addEventListener("click", function (event) {

        const link = event.target.closest(".document-link");

        if (!link) return;

        const name = link.dataset.document;
        const details = documentDetails[name];

        if (!details) return;

        modalTitle.textContent = name;
        modalReviewer.textContent = details.reviewer;
        modalStatus.textContent = details.status;
        modalPriority.textContent = details.priority;

        documentModal.hidden = false;

    });
}

// Close popup

if (closeModal && documentModal) {

    closeModal.addEventListener("click", function () {
        documentModal.hidden = true;
    });
}

if (documentModal) {

    documentModal.addEventListener("click", function (event) {

        if (event.target === documentModal) {
            documentModal.hidden = true;
        }

    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            documentModal.hidden = true;
        }

    });
}

// ==================================
// 6. UPDATE DASHBOARD STATISTICS
// ==================================

function updateDashboardStats() {

    if (!documentTable) return;

    const rows = documentTable.querySelectorAll("tr");

    let total = rows.length;
    let pending = 0;
    let approved = 0;
    let high = 0;

    rows.forEach(function (row) {

        const status = row.querySelector(".status");
        const priority = row.querySelector(".priority");

        if (status && status.classList.contains("pending")) {
            pending++;
        }

        if (status && status.classList.contains("approved")) {
            approved++;
        }

        if (priority && priority.classList.contains("high")) {
            high++;
        }

    });

    const totalElement = document.getElementById("totalDocuments");
    const pendingElement = document.getElementById("pendingReviews");
 const approvedElement = document.getElementById("approved");
    const highElement = document.getElementById("highPriority");

    if (totalElement) totalElement.textContent = total;
    if (pendingElement) pendingElement.textContent = pending;
    if (approvedElement) approvedElement.textContent = approved;
    if (highElement) highElement.textContent = high;

}

// Run statistics when the page loads

updateDashboardStats();
// ==================================
// 7. ADD REVIEWER FUNCTIONALITY
// ==================================

const addReviewerBtn = document.getElementById("addReviewerBtn");
const reviewerFormContainer = document.getElementById("reviewerFormContainer");
const reviewerForm = document.getElementById("reviewerForm");
const cancelReviewer = document.getElementById("cancelReviewer");

if (addReviewerBtn && reviewerFormContainer) {
    addReviewerBtn.addEventListener("click", function () {
        reviewerFormContainer.hidden = false;
    });
}

if (cancelReviewer && reviewerForm && reviewerFormContainer) {
    cancelReviewer.addEventListener("click", function () {
        reviewerForm.reset();
        reviewerFormContainer.hidden = true;
    });
}

if (reviewerForm && reviewerFormContainer) {
    reviewerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("reviewerName").value.trim();
        const email = document.getElementById("reviewerEmail").value.trim();
        const role = document.getElementById("reviewerRole").value.trim();
        const availability = document.getElementById("reviewerAvailability").value;

        const reviewerContainer = document.querySelector(".reviewer-container");

        if (!reviewerContainer) return;

        const card = document.createElement("div");
        card.className = "reviewer-card";

        card.innerHTML = `
            <h3>${name}</h3>
            <p>${email}</p>
            <p>${role}</p>
            <span>${availability}</span>
        `;

        reviewerContainer.appendChild(card);

        reviewerForm.reset();
        reviewerFormContainer.hidden = true;

        alert("Reviewer added successfully!");
    });
}