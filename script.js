const startel = document.querySelector(".circle-start");
const splitel = document.querySelector(".circle-split");
const resetel = document.querySelector(".circle-reset");
let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval;
let isRunning = false;

function startStop() {
  if (!isRunning) {
    startTime = Date.now() - difference;
    timerInterval = setInterval(displayTimer, 10);
    isRunning = true;
    startel.textContent = "Stop";
    resetel.disabled = true;
    splitel.disabled = false;
    startel.style.backgroundColor = "#c8299e";
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    startel.textContent = "Start";
    index("pause");
    splitel.disabled = true;
    resetel.disabled = false;
    startel.style.backgroundColor = "#256d6a";
  }
}

function reset() {
  clearInterval(timerInterval);
  difference = 0;
  isRunning = false;
  startel.textContent = "Start";
  document.getElementById("timer").textContent = "00:00:00.000";
  document.getElementById("splits").innerHTML = "";
  splitel.disabled = false;
}
function index(text) {
  const currentTime = document.getElementById("timer").textContent;
  const splitTime = document.createElement("div");
  splitTime.textContent = ` ${currentTime}          ${text}`;
  document.getElementById("splits").appendChild(splitTime);
}
function split() {
  if (isRunning) {
    index("split");
  }
}

function displayTimer() {
  updatedTime = Date.now();
  difference = updatedTime - startTime;

  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((difference % 1000) / 10);

  document.getElementById("timer").textContent =
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds) +
    "." +
    (milliseconds < 10 ? "0" + milliseconds : milliseconds);
}

startel.addEventListener("click", function () {
  startStop();
});

splitel.addEventListener("click", function () {
  split();
});
resetel.addEventListener("click", function () {
  reset();
});
