// Companies Data

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeWebsite);

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
	setupEventListeners();
}

// Navigation
function initNavbar() {
	const navbar = document.querySelector(".navbar");
	if (!navbar || !locomotiveScroll) return;

	// Initial check for scroll position
	const scrollTop = locomotiveScroll.scroll.instance.scroll.y;
	if (scrollTop > 50) {
		navbar.classList.add("scrolled");
	}
	// Add scroll listener
	locomotiveScroll.on("scroll", (args) => {
		if (args.scroll.y > 50) {
			navbar.classList.add("scrolled");
		} else {
			navbar.classList.remove("scrolled");
		}
	});
	// Initial check
	if (locomotiveScroll) {
		// Add scrolled class if already scrolled
		const scrollTop = locomotiveScroll.scroll.instance.scroll.y;
		if (scrollTop > 50) {
			navbar.classList.add("scrolled");
		}

		// Listen to locomotive scroll events
		locomotiveScroll.on("scroll", (obj) => {
			const scrollTop = obj.scroll.y;
			if (scrollTop > 50) {
				navbar.classList.add("scrolled");
			} else {
				navbar.classList.remove("scrolled");
			}
		});
	} else {
		// Fallback to window scroll for when Locomotive isn't initialized
		if (window.pageYOffset > 50) {
			navbar.classList.add("scrolled");
		}

		window.addEventListener("scroll", function () {
			if (window.pageYOffset > 50) {
				navbar.classList.add("scrolled");
			} else {
				navbar.classList.remove("scrolled");
			}
		});
	}
}

function setupLocomotiveScroll() {
	return new Promise((resolve) => {
		if (typeof LocomotiveScroll === "undefined") {
			console.error("LocomotiveScroll is not loaded");
			resolve();
			return;
		}

		const mainContent = document.querySelector("body");
		mainContent.setAttribute("data-scroll-container", "");

		locomotiveScroll = new LocomotiveScroll({
			el: mainContent,
			smooth: true,
			smoothMobile: true,
			multiplier: 1,
			smartphone: {
				smooth: true,
				multiplier: 0.8,
				breakpoint: 991,
			},
			tablet: {
				smooth: true,
				multiplier: 0.8,
				breakpoint: 991,
			},
		});

		handleScrollUpdates();
		resolve();
	});
}

// Add this new function
function setupTabScrolling() {
	const tabButtons = document.querySelectorAll('[data-bs-toggle="pill"]');

	tabButtons.forEach((button) => {
		button.addEventListener("click", () => {
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
	document.querySelectorAll("img").forEach((img) => {
		img.addEventListener("load", () => locomotiveScroll.update());
	});

	// Update on resize
	let resizeTimer;
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => locomotiveScroll.update(), 250);
	});
}

// Dropdowns
function initDropdowns() {
	if (window.innerWidth >= 992) {
		// Desktop behavior
		document.querySelectorAll(".nav-item.dropdown").forEach(function (el) {
			el.addEventListener("mouseover", function () {
				const dropdownMenu = this.querySelector(".dropdown-menu");
				if (dropdownMenu) {
					dropdownMenu.classList.add("show");
				}
			});

			el.addEventListener("mouseout", function () {
				const dropdownMenu = this.querySelector(".dropdown-menu");
				if (dropdownMenu) {
					dropdownMenu.classList.remove("show");
				}
			});
		});
	} else {
		// Mobile behavior
		document.querySelectorAll(".nav-item.dropdown > a").forEach(function (el) {
			el.addEventListener("click", function (e) {
				const dropdownMenu = this.nextElementSibling;
				if (dropdownMenu) {
					e.preventDefault();
					dropdownMenu.classList.toggle("show");
				}
			});
		});
	}
}

// Counter setup
function setupCounters() {
	const counters = document.querySelectorAll(".key-figures-number");
	if (!counters.length) return;

	counters.forEach((counter) => {
		const target = parseInt(counter.getAttribute("data-target"), 10);
		const speed = 200;
		setupObserver(counter, target, speed);
	});
}

function setupObserver(element, target, speed) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					incrementCounter(element, target, speed);
					observer.unobserve(element);
				}
			});
		},
		{ threshold: 0.5 }
	);

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

	Array.from(links).forEach((link) => {
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

	modalImage.addEventListener(
		"mousemove",
		throttle((e) => moveLens(e, modalImage, lens), 20)
	);
	lens.addEventListener(
		"mousemove",
		throttle((e) => moveLens(e, modalImage, lens), 20)
	);
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

	lens.style.left = x + "px";
	lens.style.top = y + "px";
	lens.style.backgroundImage = `url('${modalImage.src}')`;
	lens.style.backgroundRepeat = "no-repeat";
	lens.style.backgroundSize = `${modalImage.offsetWidth * 3}px ${
		modalImage.offsetHeight * 3
	}px`;
	lens.style.backgroundPosition = `-${x * 3}px -${y * 3}px`;
	lens.style.display = "block";
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
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

// Lightbox functionality
function initLightbox() {
	const lightbox = document.getElementById("lightbox");
	const lightboxClose = document.querySelector(".lightbox-close");

	if (!lightbox || !lightboxClose) return;

	document.querySelectorAll(".tentative-button").forEach((button) => {
		button.addEventListener("click", (event) => {
			event.preventDefault();
			lightbox.style.display = "block";
		});
	});

	lightboxClose.addEventListener("click", () => {
		lightbox.style.display = "none";
	});

	window.addEventListener("click", (event) => {
		if (event.target === lightbox) {
			lightbox.style.display = "none";
		}
	});
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
fetch("/carousel2024.json")
	.then((response) => response.json())
	.then((data) => {
		generateCarousel(data);
	})
	.catch((error) => {
		console.error("Error loading carousel data:", error);
	});

// Animate elements when they come into view
const animateOnScroll = () => {
	const elements = document.querySelectorAll(".fade-up");
	elements.forEach((element) => {
		const elementTop = element.getBoundingClientRect().top;
		const windowHeight = window.innerHeight;
		if (elementTop < windowHeight * 0.85) {
			element.classList.add("visible");
		}
	});
};

// JSON Array of video data
const videos = [
	{
		id: "MLD5Obw-xBM",
		title:
			"TRACE 2024 INTERVIEW | Tan Sri Datuk Seri Panglima Sulong Matjeraie",
	},
	{ id: "ej9aVYDFt8c", title: "TRACE 2024 INTERVIEW | Syazwan" },
	{
		id: "7LFRbW69zL8",
		title: "TRACE 2024 INTERVIEW | Prof Dr Ahmad Hata Rasit",
	},
	{
		id: "mPeTwvbcv2U ",
		title: "TRACE 2024 INTERVIEW | Muhammad Zikri Bin Roslan",
	},
	{
		id: "JDZ5JTT5hfQ",
		title: "TRACE 2024 INTERVIEW | Datuk Len Talif Salleh",
	},
	{
		id: "cjGWvEgl_U4",
		title: "TRACE 2024 INTERVIEW | Armansha Bin Surman",
	},
];

// Generate carousel items
const carouselContent = document.getElementById("carouselContent");
videos.forEach((video, index) => {
	const isActive = index === 0 ? "active" : "";
	const carouselItem = `
          <div class="carousel-item ${isActive}">
              <div class="ratio ratio-16x9">
                  <iframe id="video${index}" 
                          src="https://www.youtube.com/embed/${video.id}?enablejsapi=1" 
                          title="${video.title}" 
                          allow="autoplay; encrypted-media" 
                          allowfullscreen></iframe>
              </div>
          </div>
      `;
	carouselContent.insertAdjacentHTML("beforeend", carouselItem);
});

// Pause and resume carousel based on video play/pause
const carousel = new bootstrap.Carousel(
	document.getElementById("youtubeCarousel")
);

function onPlayerStateChange(event) {
	if (event.data === 1) {
		// Video is playing
		carousel.pause();
	} else if (event.data === 2) {
		// Video is paused or stopped
		carousel.cycle();
	}
}

// Initialize YouTube IFrame API
function onYouTubeIframeAPIReady() {
	videos.forEach((video, index) => {
		new YT.Player(`video${index}`, {
			events: {
				onStateChange: onPlayerStateChange,
			},
		});
	});
}

// Load the IFrame Player API asynchronously
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Update iframe height for all videos
function updateIframeHeight() {
	const navbar = document.querySelector(".navbar");
	const navbarHeight = navbar.offsetHeight;
	const iframes = document.querySelectorAll(".carousel-item iframe");
	iframes.forEach((iframe) => {
		iframe.style.height = `calc(100vh - ${navbarHeight}px)`;
	});
}

// Update height on page load and when window is resized
window.addEventListener("load", updateIframeHeight);
window.addEventListener("resize", updateIframeHeight);
