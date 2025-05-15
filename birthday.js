// Set the birthday date (YYYY, MM-1, DD)
const birthday = new Date(2025, 5, 6); // June 6, 2025

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
            <h1>🎉 Happy Birthday Anita! 🎉🎉🎉</h1>
            <button class="toggle-btn" id="toggleNote">Click Me</button>
        `;

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

  // Create lots of confetti
  for (let i = 0; i < 50; i++) {
    setTimeout(createConfetti, i * 100);
  }
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
  }, 7000);
}

function createConfetti() {
  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
  ];

  for (let i = 0; i < 10; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-10px";
    confetti.style.width = Math.random() * 10 + 5 + "px";
    confetti.style.height = Math.random() * 10 + 5 + "px";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = "50%";
    confetti.style.opacity = "0";
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.style.opacity = "1";
      confetti.style.transform = `translate(${Math.random() * 200 - 100}px, ${
        Math.random() * 100 + 100
      }px) rotate(${Math.random() * 360}deg)`;
      confetti.style.transition = `all ${Math.random() * 1 + 1}s ease-out`;

      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.remove();
        }
      }, 1000);
    }, 10);
  }
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
