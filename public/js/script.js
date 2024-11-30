document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  // Initialize current date
  let currentDate = new Date();

  // Update the displayed date
  function updateDateDisplay() {
    const currentDateElement = document.querySelector(".current-date");
    if (currentDateElement) {
      currentDateElement.textContent = currentDate.toDateString();
    } else {
      console.error("current-date element not found in the DOM");
    }
  }

  // Fetch and render events for the current date
  async function fetchAndRenderEvents() {
    try {
      const dateString = currentDate.toISOString().split("T")[0];
      const response = await fetch(`/api/events?date=${dateString}`);
      if (response.ok) {
        const events = await response.json();
        renderEvents(events);
      } else {
        console.error("Failed to fetch events:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  // Render events dynamically
  function renderEvents(events) {
    const eventList = document.querySelector(".event-list");
    if (!eventList) {
      console.error("Event list element not found in the DOM");
      return;
    }

    eventList.innerHTML = ""; // Clear existing events
    if (events.length === 0) {
      eventList.innerHTML = "<p>No events found for this date.</p>";
      return;
    }

    events.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.classList.add("event-card");
      eventCard.innerHTML = `
        <p>Date: ${new Date(event.data_time).toLocaleString()}</p>
        <p>Sport: ${event.sport.name}</p>
        <p>Venue: ${event.venue.name}, ${event.venue.location}</p>
        <p>Category: ${event.category.name}</p>
        <p>Description: ${event.description}</p>
      `;
      eventList.appendChild(eventCard);
    });
  }

  // Event listeners for arrows
  const leftArrow = document.querySelector(".arrow-left");
  const rightArrow = document.querySelector(".arrow-right");

  if (leftArrow && rightArrow) {
    leftArrow.addEventListener("click", () => {
      currentDate.setDate(currentDate.getDate() - 1); // Go to previous day
      updateDateDisplay();
      fetchAndRenderEvents();
    });

    rightArrow.addEventListener("click", () => {
      currentDate.setDate(currentDate.getDate() + 1); // Go to next day
      updateDateDisplay();
      fetchAndRenderEvents();
    });
  } else {
    console.error("Arrow elements not found in the DOM");
  }

  // Handle "Pick Date" functionality
  const pickDateBtn = document.querySelector(".pick-date-btn");
  if (pickDateBtn) {
    pickDateBtn.addEventListener("click", () => {
      const selectedDate = prompt(
        "Enter a date (YYYY-MM-DD):",
        currentDate.toISOString().split("T")[0]
      );
      if (selectedDate) {
        currentDate = new Date(selectedDate);
        updateDateDisplay();
        fetchAndRenderEvents();
      }
    });
  }

  // Initial render of the date and events
  updateDateDisplay();
  fetchAndRenderEvents();

  // Modal functionality
  const addEventBtn = document.getElementById("add-event-btn");
  const modal = document.getElementById("add-event-modal");
  const closeModalBtn = document.querySelector(".close-btn");
  const addEventForm = document.getElementById("add-event-form");

  const sportInput = document.getElementById("sport-input");
  const sportSuggestions = document.getElementById("sport-suggestions");

  if (addEventBtn && modal && closeModalBtn && addEventForm) {
    // Open modal
    addEventBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });

    // Close modal
    closeModalBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    // Fetch sports dynamically
    async function fetchSports(query) {
      try {
        const response = await fetch(`/api/sports`);
        if (response.ok) {
          const sports = await response.json();
          return sports.filter((sport) =>
            sport.name.toLowerCase().includes(query.toLowerCase())
          );
        }
      } catch (error) {
        console.error("Error fetching sports:", error);
        return [];
      }
    }

    // Handle input for sport search
    if (sportInput && sportSuggestions) {
      sportInput.addEventListener("input", async (e) => {
        const query = e.target.value;
        if (!query) {
          sportSuggestions.innerHTML = "";
          sportSuggestions.classList.add("hidden");
          return;
        }

        const sports = await fetchSports(query);
        sportSuggestions.innerHTML = sports
          .map(
            (sport) =>
              `<li data-sport-id="${sport.sport_id}">${sport.name}</li>`
          )
          .join("");
        sportSuggestions.classList.remove("hidden");
      });

      // Handle sport selection
      sportSuggestions.addEventListener("click", (e) => {
        const selectedSport = e.target;
        if (selectedSport.tagName === "LI") {
          sportInput.value = selectedSport.textContent;
          sportInput.dataset.sportId = selectedSport.dataset.sportId; // Store the selected sport ID
          sportSuggestions.innerHTML = "";
          sportSuggestions.classList.add("hidden");
        }
      });
    }

    // Form submission handler
    addEventForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(addEventForm);
      const data = Object.fromEntries(formData.entries());

      // Replace sport name with sport ID before sending to backend
      if (sportInput.dataset.sportId) {
        data._sport_id = sportInput.dataset.sportId;
      } else {
        alert("Please select a valid sport from the suggestions.");
        return;
      }

      try {
        const response = await fetch("/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert("Event added successfully!");
          modal.classList.add("hidden");
          addEventForm.reset();
          fetchAndRenderEvents(); // Refresh events
        } else {
          const errorData = await response.json();
          alert(`Failed to add event: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error adding event:", error);
        alert("An error occurred while adding the event.");
      }
    });
  } else {
    console.error("Modal or form elements not found in the DOM");
  }
});
