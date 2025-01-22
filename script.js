async function loadCompanyData() {
    try {
        const response = await fetch('/companies2024.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Check for saved bookmarks in localStorage
        const savedBookmarks = localStorage.getItem('companyBookmarks');
        if (savedBookmarks) {
            const bookmarkData = JSON.parse(savedBookmarks);
            // Apply saved bookmarks to the loaded data
            data.companies = data.companies.map(company => ({
                ...company,
                bookmarked: bookmarkData[company.id] || false
            }));
        }

        return data.companies;
    } catch (error) {
        console.error('Error loading company data:', error);
        return []; // Return empty array if loading fails
    }
}

// Constants
const ITEMS_PER_PAGE = 30;
let currentPage = 1;
let showingBookmarkedOnly = false;
let locomotiveScroll = null;

// Companies Data


// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeWebsite);

// Main initialization
async function initializeWebsite() {
    // First setup Locomotive Scroll
    await setupLocomotiveScroll();
    // Then initialize navbar
    initNavbar();
    initDropdowns();
    setupTabScrolling(); // Add this line
    setupCounters();
    initializeComponents();
    companies = await loadCompanyData();
    renderCompanies(companies);
    setupEventListeners();
}

// Navigation
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar || !locomotiveScroll) return;

    // Initial check for scroll position
    const scrollTop = locomotiveScroll.scroll.instance.scroll.y;
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    }
    // Add scroll listener
    locomotiveScroll.on('scroll', (args) => {
        if (args.scroll.y > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    // Initial check
    if (locomotiveScroll) {
        // Add scrolled class if already scrolled
        const scrollTop = locomotiveScroll.scroll.instance.scroll.y;
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        }

        // Listen to locomotive scroll events
        locomotiveScroll.on('scroll', (obj) => {
            const scrollTop = obj.scroll.y;
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    } else {
        // Fallback to window scroll for when Locomotive isn't initialized
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        }

        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

function setupLocomotiveScroll() {
    return new Promise((resolve) => {
        if (typeof LocomotiveScroll === 'undefined') {
            console.error('LocomotiveScroll is not loaded');
            resolve();
            return;
        }

        const mainContent = document.querySelector('body');
        mainContent.setAttribute('data-scroll-container', '');

        locomotiveScroll = new LocomotiveScroll({
            el: mainContent,
            smooth: true,
            smoothMobile: true,
            multiplier: 1,
            smartphone: {
                smooth: true,
                multiplier: 0.8,
                breakpoint: 991
            },
            tablet: {
                smooth: true,
                multiplier: 0.8,
                breakpoint: 991
            }
        });

        handleScrollUpdates();
        resolve();
    });
}

// Add this new function
function setupTabScrolling() {
    const tabButtons = document.querySelectorAll('[data-bs-toggle="pill"]');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            setTimeout(() => {
                if (locomotiveScroll) {
                    locomotiveScroll.update();
                }
            }, 100);
        });
    });
}

function handleScrollUpdates() {
    // Update on page load
    setTimeout(() => locomotiveScroll.update(), 1000);

    // Update on image load
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => locomotiveScroll.update());
    });

    // Update on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => locomotiveScroll.update(), 250);
    });
}


// Dropdowns
function initDropdowns() {
    if (window.innerWidth >= 992) {
        // Desktop behavior
        document.querySelectorAll('.nav-item.dropdown').forEach(function (el) {
            el.addEventListener('mouseover', function () {
                const dropdownMenu = this.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.classList.add('show');
                }
            });

            el.addEventListener('mouseout', function () {
                const dropdownMenu = this.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.classList.remove('show');
                }
            });
        });
    } else {
        // Mobile behavior
        document.querySelectorAll('.nav-item.dropdown > a').forEach(function (el) {
            el.addEventListener('click', function (e) {
                const dropdownMenu = this.nextElementSibling;
                if (dropdownMenu) {
                    e.preventDefault();
                    dropdownMenu.classList.toggle('show');
                }
            });
        });
    }
}

// Counter setup
function setupCounters() {
    const counters = document.querySelectorAll('.key-figures-number');
    if (!counters.length) return;

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const speed = 200;
        setupObserver(counter, target, speed);
    });
}

function setupObserver(element, target, speed) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                incrementCounter(element, target, speed);
                observer.unobserve(element);
            }
        });
    }, {threshold: 0.5});

    observer.observe(element);
}

function incrementCounter(element, target, speed) {
    let current = 0;
    const step = target / speed;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = `${Math.ceil(current)}+`;
            setTimeout(updateCounter, 1);
        } else {
            element.textContent = `${target}+`;
        }
    };

    updateCounter();
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const lens = document.getElementById("magnifier-lens");
    const links = document.getElementsByClassName("modal-link");
    const closeButton = document.getElementsByClassName("close")[0];

    if (!modal || !modalImage || !lens || !closeButton) return;

    Array.from(links).forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            openModal(this.href);
        });
    });

    closeButton.addEventListener("click", () => closeModal(modal));

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });

    modalImage.addEventListener('mousemove', throttle((e) => moveLens(e, modalImage, lens), 20));
    lens.addEventListener('mousemove', throttle((e) => moveLens(e, modalImage, lens), 20));
}

function openModal(imageSrc) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    modal.style.display = "block";
    modalImage.src = imageSrc;
}

function closeModal(modal) {
    modal.style.display = "none";
}

function moveLens(e, modalImage, lens) {
    const rect = modalImage.getBoundingClientRect();
    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;
    const size = lens.offsetWidth / 2;
    const x = Math.max(0, Math.min(modalImage.offsetWidth - size, posX - size));
    const y = Math.max(0, Math.min(modalImage.offsetHeight - size, posY - size));

    lens.style.left = x + 'px';
    lens.style.top = y + 'px';
    lens.style.backgroundImage = `url('${modalImage.src}')`;
    lens.style.backgroundRepeat = 'no-repeat';
    lens.style.backgroundSize = `${modalImage.offsetWidth * 3}px ${modalImage.offsetHeight * 3}px`;
    lens.style.backgroundPosition = `-${x * 3}px -${y * 3}px`;
    lens.style.display = 'block';
}

// Utility function
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (!lightbox || !lightboxClose) return;

    document.querySelectorAll('.tentative-button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            lightbox.style.display = 'block';
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

// Modify the renderCompanies function to handle pagination more smoothly
function renderCompanies(companiesData) {
    const filteredCompanies = showingBookmarkedOnly ?
        companiesData.filter(company => company.bookmarked) :
        companiesData;

    const companiesContainer = document.getElementById('companyList');
    if (!companiesContainer) {
        console.error('Company container not found!');
        return;
    }

    // Clear existing content
    companiesContainer.innerHTML = '';

    // Get paginated companies
    const paginatedCompanies = getPaginatedCompanies(filteredCompanies, currentPage);

    // Create a document fragment for better performance
    const fragment = document.createDocumentFragment();

    // Add the cards
    paginatedCompanies.forEach(company => {
        const card = document.createElement('div');
        card.className = 'company-card';
        const imgOnError = `this.onerror=null; this.src='../Assets/company-logo/placeholder.png';`;

        card.innerHTML = `
            <div class="company-info">
                <img src="${company.logo}" 
                     alt="${company.name}" 
                     class="company-logo"
                     onerror="${imgOnError}">
                <div>
                    <div class="exhibitor-badge">${company.exhibitorLevel} Exhibitor</div>
                    <h3>${company.name}</h3>
                </div>
            </div>
            <div class="card-actions">
                <span class="location-badge">${company.location}</span>
                <button class="bookmark-btn" data-id="${company.id}">
                    ${company.bookmarked ? '★' : '☆'}
                </button>
            </div>
        `;
        fragment.appendChild(card);
    });

    // Add pagination controls to the fragment
    const paginationControls = createPaginationControls(filteredCompanies);
    fragment.appendChild(paginationControls);

    // Append everything at once
    companiesContainer.appendChild(fragment);

    // Update Locomotive Scroll to handle the new content
    if (locomotiveScroll) {
        locomotiveScroll.update();
    }
}


// Pagination Controls
function createPaginationControls(totalCompanies) {
    const totalPages = Math.ceil(totalCompanies.length / ITEMS_PER_PAGE);
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination-controls';

    const prevButton = document.createElement('button');
    prevButton.innerText = '←';
    prevButton.className = 'pagination-btn';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderCompanies(companies);
        }
    };

    const nextButton = document.createElement('button');
    nextButton.innerText = '→';
    nextButton.className = 'pagination-btn';
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderCompanies(companies);
        }
    };

    const pageNumbers = document.createElement('div');
    pageNumbers.className = 'page-numbers';
    pageNumbers.innerText = `Page ${currentPage} of ${totalPages}`;

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(pageNumbers);
    paginationContainer.appendChild(nextButton);

    return paginationContainer;
}

// Utility functions
function loadBookmarks() {
    const savedCompanies = localStorage.getItem('companies');
    if (savedCompanies) {
        const parsedCompanies = JSON.parse(savedCompanies);
        if (parsedCompanies.length === companies.length) {
            return parsedCompanies;
        }
    }
    return companies;
}

// Modified saveBookmarks function to only save bookmark state
function saveBookmarks() {
    const bookmarkData = {};
    companies.forEach(company => {
        if (company.bookmarked) {
            bookmarkData[company.id] = true;
        }
    });
    localStorage.setItem('companyBookmarks', JSON.stringify(bookmarkData));
}

function getPaginatedCompanies(companies, page) {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return companies.slice(startIndex, endIndex);
}

function setupEventListeners() {
    // Debounce search input to prevent too many rapid updates
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredCompanies = companies.filter(company =>
                    company.name.toLowerCase().includes(searchTerm) ||
                    company.exhibitorLevel.toLowerCase().includes(searchTerm) ||
                    company.location.toLowerCase().includes(searchTerm)
                );
                currentPage = 1; // Reset to first page on search
                renderCompanies(filteredCompanies);
            }, 300); // Wait 300ms after user stops typing
        });
    }

    // Bookmark filter with smoother transitions
    const bookmarkFilterBtn = document.getElementById('showBookmarked');
    if (bookmarkFilterBtn) {
        bookmarkFilterBtn.addEventListener('click', () => {
            showingBookmarkedOnly = !showingBookmarkedOnly;
            bookmarkFilterBtn.innerHTML = showingBookmarkedOnly ?
                'Show All ★' : 'Show Bookmarked ☆';
            currentPage = 1; // Reset to first page when toggling bookmarks
            renderCompanies(companies);
        });
    }
}


function updateScroll() {
    if (locomotiveScroll) {
        setTimeout(() => {
            locomotiveScroll.update();
        }, 100);
    }
}

// Initialize components
function initializeComponents() {
    if (document.getElementById("modal")) initializeModal();
    if (document.getElementById("lightbox")) initLightbox();
    if (document.getElementById("gallery")) initGallery();
}


// Function to generate carousel dynamically
function generateCarousel(images) {
    const carouselInner = document.getElementById("carouselInner");
    const carouselIndicators = document.getElementById("carouselIndicators");

    // Loop through images and create carousel items
    images.forEach((image, index) => {
        // Create carousel items
        const item = document.createElement("div");
        item.classList.add("carousel-item");
        if (index === 0) item.classList.add("active");

        const img = document.createElement("img");
        img.src = `../Assets/images/${image.image}`;
        img.classList.add("d-block", "w-100");
        img.alt = image.alt_text;
        item.appendChild(img);

        // Append to carousel-inner
        carouselInner.appendChild(item);

        // Create carousel indicators
        const indicator = document.createElement("button");
        indicator.type = "button";
        indicator.setAttribute("data-bs-target", "#carouselExampleIndicators");
        indicator.setAttribute("data-bs-slide-to", index);
        indicator.setAttribute("aria-label", `Slide ${index + 1}`);
        if (index === 0) indicator.classList.add("active");
        carouselIndicators.appendChild(indicator);
    });
}

// Fetch the JSON data and generate the carousel
fetch('/carousel2024.json')
    .then(response => response.json())
    .then(data => {
        generateCarousel(data);
    })
    .catch(error => {
        console.error('Error loading carousel data:', error);
    });

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeWebsite);

