// exhibitorList.js

// Constants
const ITEMS_PER_PAGE = 30;
let currentPage = 1;
let showingBookmarkedOnly = false;
let companies = [];

function getPageName() {
	const path = window.location.pathname;
	const page = path
		.substring(path.lastIndexOf("/") + 1)
		.split("?")[0]
		.split("#")[0];
	return page.replace(".html", "");
}

// Load company data from a specific JSON file
async function loadCompanyData(filePath) {
	try {
		const response = await fetch(filePath);
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
		const text = await response.text();
		console.log("Raw response:", text); // Log the raw response
		const jsonData = JSON.parse(text);

		// Check if the data contains a "companies" key
		if (jsonData.companies) {
			return jsonData.companies;
		}
		return jsonData;
	} catch (error) {
		console.error("Error loading company data:", error);
		return [];
	}
}

// Priority map for exhibitor levels
const levelPriority = {
	Platinum: 1,
	Gold: 2,
	Silver: 3,
	Standard: 4,
};

// Extract numeric part from location
function getLocationNumber(location) {
	const match = location.match(/\d+/);
	return match ? parseInt(match[0], 10) : Infinity;
}

// Sort companies based on exhibitor level and location
function sortCompaniesByLevelAndLocation(companies) {
	return companies.sort((a, b) => {
		// Compare levels first
		const priorityA = levelPriority[a.exhibitorLevel] || 5;
		const priorityB = levelPriority[b.exhibitorLevel] || 5;
		if (priorityA !== priorityB) {
			return priorityA - priorityB;
		}

		// If levels are equal, compare by numeric location
		const locA = getLocationNumber(a.location);
		const locB = getLocationNumber(b.location);
		return locA - locB;
	});
}

// Render the company cards dynamically
function renderCompanies(companiesData) {
	// Sort companies by level and location before filtering or pagination
	const sortedCompanies = sortCompaniesByLevelAndLocation(companiesData);

	const filteredCompanies = showingBookmarkedOnly
		? sortedCompanies.filter((company) => company.bookmarked)
		: sortedCompanies;

	const companiesContainer = document.getElementById("companyList");
	if (!companiesContainer) {
		console.error("Company container not found!");
		return;
	}

	companiesContainer.innerHTML = ""; // Clear existing content

	// Get paginated companies for the current page
	const paginatedCompanies = getPaginatedCompanies(
		filteredCompanies,
		currentPage
	);
	const fragment = document.createDocumentFragment();

	paginatedCompanies.forEach((company) => {
		const card = document.createElement("div");
		card.className = "company-card";
		const imgOnError = `this.onerror=null; this.src='../Assets/company-logo/placeholder.png';`;

		card.innerHTML = `
            <div class="company-info">
                <img src="${company.logo}" 
                     alt="${company.name}" 
                     class="company-logo"
                     onerror="${imgOnError}">
                <div>
                    <div class="exhibitor-badge">${
											company.exhibitorLevel
										} Exhibitor</div>
                    <h3>${company.name}</h3>
                </div>
            </div>
            <div class="card-actions">
                <span class="location-badge">${company.location}</span>
                <button class="bookmark-btn" data-id="${company.id}">
                    ${company.bookmarked ? "★" : "☆"}
                </button>
            </div>
        `;
		fragment.appendChild(card);
	});

	companiesContainer.appendChild(fragment);

	// Update locomotive scroll if applicable
	if (typeof locomotiveScroll !== "undefined") {
		locomotiveScroll.update();
	}
}

// Get paginated companies for the current page
function getPaginatedCompanies(companies, page) {
	const startIndex = (page - 1) * ITEMS_PER_PAGE;
	return companies.slice(startIndex, startIndex + ITEMS_PER_PAGE);
}

// Event listeners for search and bookmark functionality
function setupExhibitorEventListeners() {
	const searchInput = document.getElementById("searchInput");
	const bookmarkFilterBtn = document.getElementById("showBookmarked");

	if (searchInput) {
		searchInput.addEventListener(
			"input",
			debounce((e) => {
				const searchTerm = e.target.value.toLowerCase();
				const filteredCompanies = companies.filter(
					(company) =>
						company.name.toLowerCase().includes(searchTerm) ||
						company.exhibitorLevel.toLowerCase().includes(searchTerm) ||
						company.location.toLowerCase().includes(searchTerm)
				);
				currentPage = 1;
				renderCompanies(filteredCompanies);
			}, 300)
		);
	}

	if (bookmarkFilterBtn) {
		bookmarkFilterBtn.addEventListener("click", () => {
			showingBookmarkedOnly = !showingBookmarkedOnly;
			bookmarkFilterBtn.textContent = showingBookmarkedOnly
				? "Show All ★"
				: "Show Bookmarked ☆";
			currentPage = 1;
			renderCompanies(companies);
		});
	}
}

// Debounce function to optimize input handling
function debounce(func, delay) {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), delay);
	};
}

// Initialize the exhibitor list based on the current page
async function initializeExhibitorList() {
	const pageName = getPageName();
	let filePath;

	// Dynamically set the file path with an absolute path from the root
	filePath = `${window.location.origin}/site-data/${pageName}.json`;

	try {
		companies = await loadCompanyData(filePath);
		console.log(`Page name: ${pageName}`);
		console.log(`File path: ${filePath}`);
		console.log(`Loaded companies: ${companies.length}`);
		console.log(
			"Container element exists:",
			!!document.getElementById("companyList")
		);

		if (companies.length > 0) {
			renderCompanies(companies);
			setupExhibitorEventListeners();
		} else {
			console.error("No companies loaded. Check file path or data format.");
		}
	} catch (error) {
		console.error("Error initializing exhibitor list:", error);
	}
}

// Change the current page and re-render companies
function changePage(direction) {
	currentPage += direction;
	if (currentPage < 1) currentPage = 1;
	renderCompanies(companies);
}

// Expose the initialization function globally
window.initializeExhibitorList = initializeExhibitorList;

document.addEventListener("DOMContentLoaded", function () {
	initializeExhibitorList();
});

// Add these to your initializeExhibitorList function
console.log("Page name:", pageName);
console.log("File path:", filePath);
console.log("Loaded companies:", companies.length);
console.log(
	"Container element exists:",
	!!document.getElementById("companyList")
);
console.log("Page Name:", getPageName());
