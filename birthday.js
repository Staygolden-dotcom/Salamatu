// Set the birthday date (YYYY, MM-1, DD)
const birthday = new Date(2025, 5, 6); // Example: Dec 25, 2024 (Month is 0-indexed)

function updateCountdown() {
  const now = new Date();
  const diff = birthday - now;

  if (diff <= 0) {
    document.querySelector(".container").innerHTML = `
                    <h1>🎉 Happy Birthday Salamatu! 🎉</h1>
                    <p style="font-size: 1.5rem;">Wishing you the most amazing day! ❤️</p>
                `;
    createHearts();
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");

  // Trigger confetti when seconds change
  if (seconds % 5 === 0) {
    createConfetti();
  }
}

// Create floating hearts
function createHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = Math.random() * 100 + "vh";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s";
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 5000);
  }, 300);
}

// Create exploding confetti
function createConfetti() {
  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
  ];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = Math.random() * 100 + "vh";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.width = Math.random() * 10 + 5 + "px";
    confetti.style.height = Math.random() * 10 + 5 + "px";
    document.body.appendChild(confetti);

    // Animate
    setTimeout(() => {
      confetti.style.opacity = "1";
      confetti.style.transform = `translate(${Math.random() * 200 - 100}px, ${
        Math.random() * 200 + 100
      }px) rotate(${Math.random() * 360}deg)`;
      confetti.style.transition = "all 1s ease-out";

      setTimeout(() => {
        confetti.remove();
      }, 1000);
    }, 10);
  }
}

// Initial call
updateCountdown();
setInterval(updateCountdown, 1000);

// Create some initial hearts
createHearts();
