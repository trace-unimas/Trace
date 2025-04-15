fetch("site-data/events.json")
	.then((res) => res.json())
	.then((events) => {
		const container = document.querySelector(".row-events");

		const categories = ["current", "upcoming", "past"];
		categories.forEach((category) => {
			const filteredEvents = events.filter(
				(event) => event.category.toLowerCase() === category
			);

			if (filteredEvents.length > 0) {
				// Add heading
				const heading = document.createElement("h1");
				heading.className = "event-title";
				heading.textContent =
					category.charAt(0).toUpperCase() + category.slice(1) + " Events";
				container.appendChild(heading);

				// Add event cards
				filteredEvents.forEach((event) => {
					const card = document.createElement("a");
					card.href = event.link;
					card.setAttribute("data-scroll", "");
					card.setAttribute("data-scroll-speed", "1");

					card.innerHTML = `
            <div class="col-md-12 card-pos">
              <div class="event-card" style="
                background: linear-gradient(
                  to right,
                  rgba(17, 16, 107, 0.84),
                  rgba(2, 0, 113, 0.22)
                ), url('${event.image}');
                background-size: cover;
                background-position: center;
              ">
                <div class="event-text">
                  ${event.title}
                  <div class="line-white"></div>
                </div>
                <div class="container-button">
                  <a href="${event.link}" class="learn-more-btn">Learn More ></a>
                </div>
              </div>
            </div>
          `;

					container.appendChild(card);
				});
			}
		});
	})
	.catch((err) => console.error("Failed to load events:", err));
