class BootstrapImageGallery {
	constructor() {
		this.data = null;
		this.currentImageIndex = 0;
		this.filteredImages = [];
		this.allTags = new Set();
		this.lightboxModal = null;
		this.init();
	}

	async init() {
		try {
			// Show loading
			document.body.classList.add("loading");

			// Simulate loading delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Load data from your JSON file
			this.data = await this.loadJSON("../site-data/tracetour2025.json");
			// Fallback to sample data if JSON fails to load
			// this.data = sampleData;

			this.filteredImages = this.data.images;
			this.extractTags();
			this.renderFilters();
			this.renderGallery();
			this.initLightbox();

			// Hide loading
			document.body.classList.remove("loading");
		} catch (error) {
			console.error("Error loading gallery:", error);
			document.body.classList.remove("loading");
			this.showError("Failed to load gallery. Please try again.");
		}
	}

	async loadJSON(url) {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	}

	extractTags() {
		this.data.images.forEach((image) => {
			image.tags.forEach((tag) => {
				// Store original case for display, but use lowercase for filtering
				this.allTags.add(tag.toLowerCase());
			});
		});
	}

	renderFilters() {
		const filterContainer = document.getElementById("filterContainer");
		filterContainer.innerHTML = "";

		// Add "All" filter
		const allFilter = this.createFilterButton("All", "all", true);
		filterContainer.appendChild(allFilter);

		// Add individual tag filters
		Array.from(this.allTags)
			.sort()
			.forEach((tag) => {
				const filterBtn = this.createFilterButton(
					tag.charAt(0).toUpperCase() + tag.slice(1),
					tag,
					false
				);
				filterContainer.appendChild(filterBtn);
			});
	}

	createFilterButton(text, tag, isActive) {
		const button = document.createElement("button");
		button.className = `btn filter-pill ${isActive ? "active" : ""}`;
		button.innerHTML = `<i class="bi bi-tag-fill me-1"></i>${text}`;
		button.onclick = () => this.filterImages(tag, button);
		return button;
	}

	filterImages(tag, clickedButton) {
		// Update active filter button
		document.querySelectorAll(".filter-pill").forEach((btn) => {
			btn.classList.remove("active");
		});
		clickedButton.classList.add("active");

		// Filter images with animation - case insensitive
		const cards = document.querySelectorAll(".gallery-card");
		cards.forEach((card) => card.classList.add("fade-out"));

		setTimeout(() => {
			if (tag === "all") {
				this.filteredImages = this.data.images;
			} else {
				this.filteredImages = this.data.images.filter((image) =>
					image.tags.some(
						(imageTag) => imageTag.toLowerCase() === tag.toLowerCase()
					)
				);
			}
			this.renderGallery();
		}, 300);
	}

	renderGallery() {
		const container = document.getElementById("galleryContainer");
		const noResults = document.getElementById("noResults");

		container.innerHTML = "";

		if (this.filteredImages.length === 0) {
			noResults.classList.remove("d-none");
			return;
		} else {
			noResults.classList.add("d-none");
		}

		this.filteredImages.forEach((image, index) => {
			const col = document.createElement("div");
			col.className = "col-lg-3 col-md-4 col-sm-6";
			col.style.animationDelay = `${index * 0.1}s`;

			col.innerHTML = `
                        <div class="card gallery-card h-100" onclick="gallery.openLightbox(${index})">
                            <img src="${image.url}" class="card-img-top gallery-card-img" alt="${image.title}" loading="lazy">
                           
                        </div>
                    `;

			container.appendChild(col);
		});
	}

	initLightbox() {
		this.lightboxModal = new bootstrap.Modal(
			document.getElementById("lightboxModal")
		);

		// Navigation buttons
		document.getElementById("prevBtn").onclick = () =>
			this.navigateLightbox("prev");
		document.getElementById("nextBtn").onclick = () =>
			this.navigateLightbox("next");

		// Keyboard navigation
		document.addEventListener("keydown", (e) => {
			const modal = document.getElementById("lightboxModal");
			if (modal.classList.contains("show")) {
				switch (e.key) {
					case "ArrowLeft":
						this.navigateLightbox("prev");
						break;
					case "ArrowRight":
						this.navigateLightbox("next");
						break;
				}
			}
		});
	}

	openLightbox(index) {
		this.currentImageIndex = index;
		const image = this.filteredImages[index];

		document.getElementById("lightboxModalLabel").textContent = image.title;
		document.getElementById("lightboxImage").src = image.url;
		document.getElementById("lightboxImage").alt = image.title;

		const tagsContainer = document.getElementById("lightboxTags");
		tagsContainer.innerHTML = image.tags
			.map((tag) => `<span class="tag-badge">${tag}</span>`)
			.join("");

		// Update navigation buttons
		document.getElementById("prevBtn").disabled = index === 0;
		document.getElementById("nextBtn").disabled =
			index === this.filteredImages.length - 1;

		this.lightboxModal.show();
	}

	navigateLightbox(direction) {
		if (
			direction === "next" &&
			this.currentImageIndex < this.filteredImages.length - 1
		) {
			this.currentImageIndex++;
		} else if (direction === "prev" && this.currentImageIndex > 0) {
			this.currentImageIndex--;
		} else {
			return; // No navigation possible
		}

		this.openLightbox(this.currentImageIndex);
	}

	showError(message) {
		const container = document.getElementById("galleryContainer");
		container.innerHTML = `
                    <div class="col-12 text-center text-white">
                        <i class="bi bi-exclamation-triangle display-1 mb-3"></i>
                        <h3>Error</h3>
                        <p>${message}</p>
                    </div>
                `;
	}
}

// Initialize gallery when page loads
let gallery;
document.addEventListener("DOMContentLoaded", () => {
	gallery = new BootstrapImageGallery();
});
