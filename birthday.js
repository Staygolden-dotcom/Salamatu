// Set the birthday date (YYYY, MM-1, DD)
const birthday = new Date(2025, 4, 6); // June 6, 2025

// DOM Elements
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const secretNote = document.getElementById("secretNote");
const toggleNoteBtn = document.getElementById("toggleNote");
const closeNoteBtn = document.getElementById("closeNote");

// Track if countdown has finished
let countdownFinished = false;
let celebrationInterval;
let heartInterval;

// Countdown function
function updateCountdown() {
  const currentDate = new Date();
  const diff = birthday - currentDate;

  if (diff <= 0 && !countdownFinished) {
    countdownFinished = true;
    document.querySelector(".countdown-container").innerHTML = `
            <h1 class="food-pulse" style="color: white;">🎉 Happy Birthday Anita! 🎉🎉🎉</h1>
            <button class="toggle-btn" id="toggleNote">Click Me</button>
        `;
    document.querySelector("body").style.background =
      "url(https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80) repeat";  
    // Show toggle button
    const newToggleBtn = document.getElementById("toggleNote");
    newToggleBtn.style.display = "inline-block";

    // Set up toggle functionality
    newToggleBtn.addEventListener("click", toggleSecretNote);

    // Start celebration effects
    startCelebration();
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  daysEl.textContent = days.toString().padStart(2, "0");
  hoursEl.textContent = hours.toString().padStart(2, "0");
  minutesEl.textContent = minutes.toString().padStart(2, "0");
  secondsEl.textContent = seconds.toString().padStart(2, "0");
}

// Toggle secret note
function toggleSecretNote() {
  secretNote.classList.toggle("active");
  this.textContent = secretNote.classList.contains("active")
    ? "Hide Message"
    : "Click Me";
}

// Close note button
closeNoteBtn.addEventListener("click", () => {
  secretNote.classList.remove("active");
  const toggleBtn = document.getElementById("toggleNote");
  if (toggleBtn) {
    toggleBtn.textContent = "Click Me";
  }
});

// Celebration effects
function startCelebration() {
  // Clear any existing heart intervals
  if (heartInterval) clearInterval(heartInterval);

  // Create more hearts when countdown finishes
  celebrationInterval = setInterval(createHeart, 150);

 
}

function createHeart() {
  const heart = document.createElement("div");
  heart.innerHTML = "❤️";
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = Math.random() * 20 + 80 + "vh";
  heart.style.fontSize = Math.random() * 20 + 10 + "px";
  heart.style.animationDuration = Math.random() * 4 + 3 + "s";
  heart.style.opacity = Math.random() * 0.5 + 0.3;
  document.body.appendChild(heart);

  setTimeout(() => {
    if (heart.parentNode) {
      heart.remove();
    }
  }, 100000);
}



// Initialize countdown
updateCountdown();
setInterval(updateCountdown, 1000);

// Create hearts continuously from the start
heartInterval = setInterval(createHeart, 800);

// Mobile optimizations
document.addEventListener("touchstart", function () {}, { passive: true });

// Clean up intervals when page is hidden
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    if (celebrationInterval) clearInterval(celebrationInterval);
    if (heartInterval) clearInterval(heartInterval);
  } else {
    if (!heartInterval) {
      heartInterval = setInterval(createHeart, 800);
    }
    if (countdownFinished && !celebrationInterval) {
      celebrationInterval = setInterval(createHeart, 150);
    }
  }
});

