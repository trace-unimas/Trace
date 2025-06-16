// exhibitorList.js

// Constants
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

function extractLocationParts(location) {
	if (!location) return ["", Infinity]; // defensive check

	location = location.toUpperCase(); // normalize

	const match = location.match(/^([A-Z]+)(\d+)/);
	if (match) {
		return [match[1], parseInt(match[2], 10)];
	}

	const compoundMatch = location.match(/^([A-Z]+)(\d+\/\d+)/);
	if (compoundMatch) {
		const nums = compoundMatch[2].split("/").map((n) => parseInt(n, 10));
		return [compoundMatch[1], Math.min(...nums)];
	}

	return ["", Infinity];
}

const locationPrefixOrder = {
	A: 1,
	B: 2,
	G: 3,
	S: 4,
	P: 5,
	Z: 99, // fallback
};

function sortCompaniesByLevelAndLocation(companies) {
	return companies.sort((a, b) => {
		const priorityA = levelPriority[a.exhibitorLevel] || 99;
		const priorityB = levelPriority[b.exhibitorLevel] || 99;

		if (priorityA !== priorityB) return priorityA - priorityB;

		const [prefixA, numA] = extractLocationParts(a.location);
		const [prefixB, numB] = extractLocationParts(b.location);

		const orderA = locationPrefixOrder[prefixA] || 99;
		const orderB = locationPrefixOrder[prefixB] || 99;

		if (orderA !== orderB) return orderA - orderB;

		return numA - numB;
	});
}

// Render the company cards dynamically
function renderCompanies(companiesData) {
	// Sort companies by level and location before filtering
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

	// Show all companies (no pagination)
	const fragment = document.createDocumentFragment();

	filteredCompanies.forEach((company, index) => {
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
                <button class="bookmark-btn" data-id="${
									company.id
								}" style="cursor: pointer; border: none; background: none; font-size: 20px; padding: 5px;">
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

// Event listeners for search and bookmark functionality
function setupExhibitorEventListeners() {
	const searchInput = document.getElementById("searchInput");
	const bookmarkFilterBtn = document.getElementById("showBookmarked");
	const companiesContainer = document.getElementById("companyList");

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
			renderCompanies(companies);
		});
	}

	// Event delegation for bookmark buttons (since they're created dynamically)
	if (companiesContainer) {
		companiesContainer.addEventListener("click", (e) => {
			if (e.target.classList.contains("bookmark-btn")) {
				const companyId = e.target.getAttribute("data-id");
				toggleBookmark(companyId);
			}
		});
	} else {
		console.error("Companies container not found for event delegation!");
	}
}

// Toggle bookmark status for a company
function toggleBookmark(companyId) {
	// Convert string ID to number for comparison (since HTML data attributes are strings)
	const numericId = parseInt(companyId, 10);
	const company = companies.find(
		(c) => c.id === numericId || c.id === companyId
	);

	if (company) {
		company.bookmarked = !company.bookmarked;

		// Save bookmarks to localStorage
		const bookmarkedCompanies = companies
			.filter((c) => c.bookmarked)
			.map((c) => c.id);
		localStorage.setItem(
			"bookmarkedCompanies",
			JSON.stringify(bookmarkedCompanies)
		);

		// Re-render to update the display
		renderCompanies(companies);
	} else {
		console.error("Company not found with ID:", companyId);
	}
}

// Load bookmarks from localStorage
function loadBookmarks() {
	const saved = localStorage.getItem("bookmarkedCompanies");
	if (saved) {
		const bookmarkedIds = JSON.parse(saved);
		companies.forEach((company) => {
			// Handle both string and number IDs
			company.bookmarked =
				bookmarkedIds.includes(company.id) ||
				bookmarkedIds.includes(String(company.id));
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
			loadBookmarks(); // Load saved bookmarks
			renderCompanies(companies);
			setupExhibitorEventListeners();
		} else {
			console.error("No companies loaded. Check file path or data format.");
		}
	} catch (error) {
		console.error("Error initializing exhibitor list:", error);
	}
}

// Expose the initialization function globally
window.initializeExhibitorList = initializeExhibitorList;

document.addEventListener("DOMContentLoaded", function () {
	initializeExhibitorList();
});

console.log("Page Name:", getPageName());
