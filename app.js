const exercises = [
  {
    title: 'Gentle Chair Warm-Up',
    duration: '8 min',
    level: 'Beginner',
    icon: '▶',
    description: 'Slow shoulder rolls, ankle circles, and easy breathing.'
  },
  {
    title: 'Seated Strength Basics',
    duration: '12 min',
    level: 'Beginner',
    icon: '💪',
    description: 'Chair-supported arm raises, leg extensions, and posture work.'
  },
  {
    title: 'Low Impact Balance Prep',
    duration: '10 min',
    level: 'Easy',
    icon: '⚖',
    description: 'Seated core control and safe standing preparation cues.'
  }
];

const progress = JSON.parse(localStorage.getItem('silverStrongProgress')) || {
  completed: 0,
  minutes: 0,
  streak: 0
};

const libraryGrid = document.querySelector('#libraryGrid');
const completedCount = document.querySelector('#completedCount');
const activeMinutes = document.querySelector('#activeMinutes');
const streakCount = document.querySelector('#streakCount');
const encouragement = document.querySelector('#encouragement');
const safetyModal = document.querySelector('#safetyModal');

function renderLibrary() {
  libraryGrid.innerHTML = exercises.map((exercise) => `
    <article class="video-card">
      <div class="video-placeholder" aria-hidden="true">${exercise.icon}</div>
      <div class="video-body">
        <h3>${exercise.title}</h3>
        <p class="video-meta">${exercise.level} • ${exercise.duration}</p>
        <p>${exercise.description}</p>
        <button class="secondary-action video-button" type="button">View Video Placeholder</button>
      </div>
    </article>
  `).join('');
}

function saveProgress() {
  localStorage.setItem('silverStrongProgress', JSON.stringify(progress));
}

function renderProgress() {
  completedCount.textContent = progress.completed;
  activeMinutes.textContent = progress.minutes;
  streakCount.textContent = progress.streak;
  encouragement.textContent = progress.completed > 0
    ? 'Wonderful work. You are building strength safely, one session at a time.'
    : 'Every safe movement counts. Start when you are ready.';
}

function openSafetyModal() {
  safetyModal.classList.add('is-open');
  safetyModal.setAttribute('aria-hidden', 'false');
}

function closeSafetyModal() {
  safetyModal.classList.remove('is-open');
  safetyModal.setAttribute('aria-hidden', 'true');
}

function completeWorkout() {
  progress.completed += 1;
  progress.minutes += 12;
  progress.streak = Math.max(1, progress.streak + 1);
  saveProgress();
  renderProgress();
  closeSafetyModal();
}

document.querySelector('#startWorkout').addEventListener('click', openSafetyModal);
document.querySelector('#logWorkout').addEventListener('click', completeWorkout);
document.querySelector('#cancelWorkout').addEventListener('click', closeSafetyModal);
document.querySelector('#confirmWorkout').addEventListener('click', completeWorkout);

renderLibrary();
renderProgress();
