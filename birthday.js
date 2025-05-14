// Set the birthday date (YYYY, MM-1, DD)
const birthday = new Date(2025, 5, 6); // June 6, 2025

// DOM Elements
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const secretNote = document.getElementById('secretNote');
const closeNoteBtn = document.getElementById('closeNote');

// Countdown function
function updateCountdown() {
  const currentDate = new Date();
  const diff = birthday - currentDate;
  
  if (diff <= 0) {
    // Countdown finished
    document.querySelector('.container').innerHTML = `
            <h1>🎉 Happy Birthday, Beautiful! 🎉</h1>
            <p class="message" style="opacity: 1; font-size: 1.5rem;">
                Today is your special day! ❤️
            </p>
        `;
    
    // Show secret note after a delay
    setTimeout(() => {
      secretNote.classList.add('active');
    }, 3000);
    
    // Start celebration effects
    startCelebration();
    return;
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  daysEl.textContent = days.toString().padStart(2, '0');
  hoursEl.textContent = hours.toString().padStart(2, '0');
  minutesEl.textContent = minutes.toString().padStart(2, '0');
  secondsEl.textContent = seconds.toString().padStart(2, '0');
}

// Celebration effects
function startCelebration() {
  // Create more hearts when countdown finishes
  setInterval(createHeart, 150);
  
  // Create lots of confetti
  for (let i = 0; i < 50; i++) {
    setTimeout(createConfetti, i * 100);
  }
}

function createHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = '❤️';
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = (Math.random() * 20 + 80) + 'vh';
  heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
  heart.style.animationDuration = (Math.random() * 4 + 3) + 's';
  heart.style.opacity = Math.random() * 0.5 + 0.3;
  document.body.appendChild(heart);
  
  setTimeout(() => {
    if (heart.parentNode) {
      heart.remove();
    }
  }, 7000);
}

function createConfetti() {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  
  for (let i = 0; i < 10; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.width = (Math.random() * 10 + 5) + 'px';
    confetti.style.height = (Math.random() * 10 + 5) + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    confetti.style.opacity = '0';
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      confetti.style.opacity = '1';
      confetti.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 100 + 100}px) rotate(${Math.random() * 360}deg)`;
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
setInterval(createHeart, 800);

// Close note button
closeNoteBtn.addEventListener('click', () => {
  secretNote.classList.remove('active');
});

// Mobile optimizations
document.addEventListener('touchstart', function() {}, { passive: true });
