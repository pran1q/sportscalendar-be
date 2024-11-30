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

  // Event listeners for arrows
  const leftArrow = document.querySelector(".arrow-left");
  const rightArrow = document.querySelector(".arrow-right");

  if (leftArrow && rightArrow) {
    leftArrow.addEventListener("click", () => {
      currentDate.setDate(currentDate.getDate() - 1); // Go to previous day
      updateDateDisplay();
    });

    rightArrow.addEventListener("click", () => {
      currentDate.setDate(currentDate.getDate() + 1); // Go to next day
      updateDateDisplay();
    });
  } else {
    console.error("Arrow elements not found in the DOM");
  }

  // Initial render of the date
  updateDateDisplay();
});
