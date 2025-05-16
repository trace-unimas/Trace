// 👇 Handles scroll update for Locomotive Scroll users
window.addEventListener("load", () => {
	if (window.scrollInstance?.update) window.scrollInstance.update();
});

function scheduleScrollUpdate(delay = 100) {
	setTimeout(() => window.scrollInstance?.update?.(), delay);
}

function showLightboxCarousel(entries) {
	const inner = document.getElementById("lightboxCarouselInner");
	inner.innerHTML = "";

	entries.forEach((job, idx) => {
		const item = document.createElement("div");
		item.className = "carousel-item" + (idx === 0 ? " active" : "");

		const img = document.createElement("img");
		img.src = job.src;
		img.alt = job.title;
		img.className = "d-block w-100";
		img.style.maxHeight = "90vh";
		img.style.objectFit = "contain";

		item.appendChild(img);
		inner.appendChild(item);
	});

	const multiple = entries.length > 1;
	document.querySelector("#lightboxCarouselPrev").style.display = multiple
		? "block"
		: "none";
	document.querySelector("#lightboxCarouselNext").style.display = multiple
		? "block"
		: "none";

	const modal = new bootstrap.Modal(document.getElementById("lightboxModal"));
	modal.show();
}

function createImageWithLightbox(src, alt, entries = null) {
	const wrapper = document.createElement("div");
	wrapper.className = "fixed-image-wrapper";

	const img = new Image();
	img.src = src;
	img.alt = alt;
	img.className = "w-100 h-100 object-fit-cover";

	img.addEventListener("click", () => {
		showLightboxCarousel(entries ? entries : [{ src, title: alt }]);
	});

	wrapper.appendChild(img);
	return wrapper;
}

Promise.all([
	fetch("../site-data/vacancy.json").then((res) => res.json()),
	fetch("../site-data/companieswebsite.json").then((res) => res.json()),
]).then(([jobs, companyLinks]) => {
	const grouped = jobs.reduce((acc, job) => {
		acc[job.company] = acc[job.company] || [];
		acc[job.company].push(job);
		return acc;
	}, {});

	const grid = document.getElementById("company-grid");

	Object.entries(grouped).forEach(([company, entries], index) => {
		const col = document.createElement("div");
		col.className = "col-md-6 col-lg-3";

		const card = document.createElement("div");
		card.className = "company-card text-center position-relative";

		const title = document.createElement("h5");
		title.className = "fw-bold mb-3";
		title.textContent = company;
		card.appendChild(title);

		const displayArea = document.createElement("div");
		displayArea.className = "mb-3 position-relative";

		if (entries.length === 1) {
			const image = createImageWithLightbox(entries[0].src, entries[0].title);
			displayArea.appendChild(image);
		} else {
			const carouselId = `carousel-${index}`;
			const counterId = `counter-${index}`;

			const counter = document.createElement("div");
			counter.className = "slide-counter";
			counter.id = counterId;
			counter.textContent = `1 / ${entries.length}`;
			displayArea.appendChild(counter);

			const carousel = document.createElement("div");
			carousel.id = carouselId;
			carousel.className = "carousel slide";
			carousel.setAttribute("data-bs-ride", "false");

			const indicators = document.createElement("div");
			indicators.className = "carousel-indicators";
			entries.forEach((_, dotIndex) => {
				const dot = document.createElement("button");
				dot.type = "button";
				dot.setAttribute("data-bs-target", `#${carouselId}`);
				dot.setAttribute("data-bs-slide-to", dotIndex);
				if (dotIndex === 0) dot.className = "active";
				indicators.appendChild(dot);
			});

			const inner = document.createElement("div");
			inner.className = "carousel-inner";

			entries.forEach((job, idx) => {
				const item = document.createElement("div");
				item.className = "carousel-item" + (idx === 0 ? " active" : "");
				const image = createImageWithLightbox(job.src, job.title, entries);
				item.appendChild(image);
				inner.appendChild(item);
			});

			carousel.appendChild(indicators);
			carousel.appendChild(inner);

			if (entries.length > 1) {
				const prevBtn = document.createElement("button");
				prevBtn.className = "carousel-control-prev";
				prevBtn.setAttribute("type", "button");
				prevBtn.setAttribute("data-bs-target", `#${carouselId}`);
				prevBtn.setAttribute("data-bs-slide", "prev");
				prevBtn.innerHTML = `<span class="carousel-control-prev-icon"></span>`;

				const nextBtn = document.createElement("button");
				nextBtn.className = "carousel-control-next";
				nextBtn.setAttribute("type", "button");
				nextBtn.setAttribute("data-bs-target", `#${carouselId}`);
				nextBtn.setAttribute("data-bs-slide", "next");
				nextBtn.innerHTML = `<span class="carousel-control-next-icon"></span>`;

				carousel.appendChild(prevBtn);
				carousel.appendChild(nextBtn);
			}

			displayArea.appendChild(carousel);

			carousel.addEventListener("slid.bs.carousel", (event) => {
				const counterElement = document.getElementById(counterId);
				counterElement.textContent = `${event.to + 1} / ${entries.length}`;
			});
		}

		const applyBtn = document.createElement("button");
		applyBtn.className = "btn apply-btn w-100 fw-bold py-3 mt-1";
		applyBtn.textContent = "Apply Now!";

		const website = companyLinks[company];
		if (website) {
			applyBtn.onclick = () => window.open(website, "_blank");
		} else {
			applyBtn.disabled = true;
			applyBtn.classList.add("disabled");
			applyBtn.title = "Website not available";
		}

		card.appendChild(displayArea);
		card.appendChild(applyBtn);
		col.appendChild(card);
		grid.appendChild(col);
	});
});
