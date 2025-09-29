let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");

let timer = document.getElementById("timer");
let timerInterval;
let endSound = new Audio('./Assets/audio/end-audio.mp3');
let totalSeconds = 0;
let isRunning = false;


let randomQuotes = [
  "Believe you can and you're halfway there. ✨",
  "Program testing can be used to show the presence of bugs, but never to show their absence!” — Edsger W. Dijkstra",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.” — Martin Fowler",
  "“Clean code always looks like it was written by someone who cares.” — Robert C. Martin",
  "Repetition is the root of all software evil.” — Martin Fowler",
  "“Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.” — Antoine de Saint-Exupery",
  "Push yourself, because no one else is going to do it for you. 🚀",
  "“Code is like humor. When you have to explain it, it’s bad.” — Cory House",
  "Great things never come from comfort zones. 🔥"
]

function formatedTime(totalSeconds) {
  let hours = parseInt(totalSeconds / 3600);
  totalSeconds = (totalSeconds % 3600);

  let minutes = parseInt(totalSeconds / 60);
  totalSeconds = (totalSeconds % 60);

  let seconds = totalSeconds;

  return `${hours.toString().padStart(2, "0")} :
   ${minutes.toString().padStart(2, "0")} :
    ${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
  if (isRunning) return;

  if (totalSeconds <= 0) {
    let hour = parseInt(document.getElementById("hour").value) || 0;
    let minute = parseInt(document.getElementById("min").value) || 0;
    let second = parseInt(document.getElementById("sec").value) || 0;

    totalSeconds = hour * 3600 + minute * 60 + second;
  }

  if (totalSeconds <= 0) {
    Swal.fire("⚠️ Please enter a valid time!");
    return;
  }

  isRunning = true;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer.innerHTML = formatedTime(totalSeconds);

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      isRunning = false;

      endSound.play();

      let randomIndex = Math.floor(Math.random() * randomQuotes.length);
      let randomQuote = randomQuotes[randomIndex];

      Swal.fire({
        title: "⏰ Time's Up!",
        html: `
    <div style="
      font-size:16px;
      font-style:italic; 
      padding:12px; 
      border-radius:12px; 
      background:rgba(255,255,255,0.2); 
      backdrop-filter: blur(10px); 
      color:#222;">
      “${randomQuote}”
    </div>
  `,
        background: "rgba(255,255,255,0.25)",
        backdrop: `
    rgba(0,0,0,0.4)
  `,
        confirmButtonText: "Okay",
        confirmButtonColor: "#4CAF50",
        customClass: {
          popup: "small-popup"
        }
      });
      return;
    }
    totalSeconds--;
  }, 1000);
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    pauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  } else {
    startTimer();
    pauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  totalSeconds = 0;
  timer.textContent = "00 : 00 : 00";

  endSound.pause();
  endSound.currentTime = 0;
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
