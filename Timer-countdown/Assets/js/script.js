
let timerInterval;
let totalSeconds = 0;
let isPaused = false;

const tickSound = document.getElementById("tickSound");
const alarmSound = document.getElementById("alarmSound");
const quoteBox = document.getElementById("quoteBox");

const quotes = [
  "Time waits for no one ⏳",
  "Every second counts 💡",
  "Stay focused, stay sharp 🔥",
  "Great things take time ⏰",
  "Don’t watch the clock; do what it does. Keep going 💪"
];

function getRandomQuote() {
  let index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

function timeFormat(totalSeconds){

    let hours = parseInt(totalSeconds / 3600);
    totalSeconds = (totalSeconds % 3600);

    let minutes = parseInt(totalSeconds / 60);
    totalSeconds = (totalSeconds % 60)
    
    let seconds = totalSeconds;

    return `${hours.toString().padStart(2, "0")} 
    : ${minutes.toString().padStart(2, "0")} 
    : ${seconds.toString().padStart(2, "0")}`
}


function startTimer(){
    let hour = document.getElementById("hour").value || 0;
    let minute  = document.getElementById("min").value || 0;
    let second = document.getElementById("sec").value || 0;
    let timer = document.getElementById("timer")

    let totalSeconds = (hour * 3600) + (minute  * 60) + (second * 1);

    let timerInterval = setInterval( () => {
        if(totalSeconds == 0){
            clearInterval(timerInterval)
        }
        timer.innerHTML = timeFormat(totalSeconds);
        totalSeconds--;

    },1000)


}


let timerBtn = document.getElementById("startBtn");
timerBtn.addEventListener("click", startTimer)