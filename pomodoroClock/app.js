const plusMinusButtons = document.querySelectorAll('.settings .fa');
const breakLengthField = document.querySelector('.break-length');
const sessionLengthField = document.querySelector('.session-length');
const timeLeftField = document.querySelector('.time');
const clock = document.querySelector('.clock');
const circle = clock.querySelector('.circle');
const currentRun = document.querySelector('.current-run');
const progressBar = document.querySelector('.progress');
const horn = document.querySelector('audio');
const muteAudio = document.querySelector('#mute-audio');
const startButton = document.querySelector('#start-button');
const pomodoro = {};
pomodoro.session = 25;
pomodoro.sessionSec = pomodoro.session * 60;
pomodoro.break = 5;
pomodoro.breakSec = pomodoro.break * 60;
pomodoro.muted = false;
let isRunning = false;
let isSession = true;

// for accurate timer
let startTime;
let usedTime = 0;


function updateProgressBar() {
  const nowRunning = isSession
  ? ['session', 'sessionSec']
  : ['break', 'breakSec'];
  if (isRunning) {
    const totalTime = pomodoro[nowRunning[0]] * 60;
    const secNow = pomodoro[nowRunning[0]] * 60 - pomodoro[nowRunning[1]] + getTimer(usedTime);
    const progressPercentage = secNow / totalTime * 100;
    progressBar.value = secNow <= totalTime ? progressPercentage : 0;
  }
}

function updateDisplay(s) {
  const min = Math.floor(s / 60);
  const sec = ('0' + s % 60).slice(-2);
  timeLeftField.innerHTML = `${min}:${sec}`;
  currentRun.innerHTML = isSession ? 'Session' : 'Break';
  updateProgressBar();
}

function getTimer(sec = 0) {
  const timeNow = new Date().getTime();
  const returnSec = Math.floor((timeNow - startTime) / 1000) + sec;
  return parseFloat(returnSec.toFixed(0));
}

function setStartTime() {
  startTime = new Date().getTime();
}
/**
 * when user click break/session time plus/minus button
 *
 **/
function handlePlusMinusButtonsClick(e) {
  if (!isRunning) {
    const value = pomodoro[this.dataset.field] + (this.dataset.key * 1);
    if (value === 0) return;

    pomodoro[this.dataset.field] = value;
    breakLengthField.innerHTML = pomodoro.break;
    sessionLengthField.innerHTML = pomodoro.session;

    if (this.dataset.field === 'session' && isSession) {
      pomodoro.sessionSec = pomodoro.session * 60;
      progressBar.value = 0;
      usedTime = 0;
      updateDisplay(pomodoro.sessionSec);
    } else if (this.dataset.field === 'break' && !isSession) {
      pomodoro.breakSec = (pomodoro.break * 60) - 1;
      updateDisplay(pomodoro.breakSec);
    } else if (isSession) {
        pomodoro.breakSec = (pomodoro.break * 60) - 1;
      } else {
        pomodoro.sessionSec = pomodoro.session * 60;
      }
  }
}
/**
* When user click somewhere around the circle
* then start/stop timer and update formatting & play/pause icon
**/
function toggleCircleClick() {
  isRunning = !isRunning;
  startButton.classList = isRunning ? 'fa fa-pause' : 'fa fa-play';
  if (isRunning) {
    setStartTime();
    plusMinusButtons.forEach((field) => {
      field.style.cursor = 'default';
    });
    if (isSession) {
      progressBar.classList = 'progress is-danger';
      circle.style.border = '12px solid hsl(348, 100%, 61%)';
    } else {
      progressBar.classList = 'progress is-success';
      circle.style.border = 'hsl(141, 71%, 48%)';
    }
  } else {
    usedTime += getTimer();
    progressBar.classList = 'progress is-warning';
    circle.style.border = '12px solid hsl(48, 100%, 67%)';
    
    plusMinusButtons.forEach((field) => {
      field.style.cursor = 'pointer';
    });
  }
}

function playAudio() {
  if (!pomodoro.muted) horn.play();
}

/**
* This function run every second
* it check is timer running and is now session or break time
* then update formatting
**/
function run() {
  if (isRunning) {
    if (isSession) {
      circle.style.border = '12px solid hsl(348, 100%, 61%)';
      progressBar.classList = 'progress is-danger';
      if (pomodoro.sessionSec - getTimer(usedTime) >= 0) {
        updateDisplay(pomodoro.sessionSec - getTimer(usedTime));
      } else {
        isSession = false;
        playAudio();
        pomodoro.sessionSec = (pomodoro.session * 60) - 1;
        setStartTime();
        usedTime = 0;
        progressBar.classList = 'progress is-success';
        circle.style.border = '12px solid hsl(141, 71%, 48%)';
      }
    } else {
      circle.style.border = '12px solid hsl(141, 71%, 48%)';
      if (pomodoro.breakSec - getTimer(usedTime) >= 0) {
        updateDisplay(pomodoro.breakSec - getTimer(usedTime));
      } else {
        isSession = true;
        playAudio();
        pomodoro.breakSec = (pomodoro.break * 60) - 1;
        progressBar.classList = 'progress is-danger';
        pomodoro.sessionSec = (pomodoro.session * 60) - 1;
        setStartTime();
        usedTime = 0;
      }
    }
  }
}



/**
* handle when user click mute/unmute -button
*
**/
function mute() {
  pomodoro.muted = !pomodoro.muted;
  muteAudio.classList = !pomodoro.muted ? 'fa fa-volume-up' : 'fa fa-volume-off';
}

/**
* Handle when user click reset clock -button
*
**/
function resetPomodoro() {
  isRunning = true;
  isSession = true;
  pomodoro.session = 25;
  pomodoro.sessionSec = 25 * 60;
  pomodoro.break = 5;
  pomodoro.breakSec = 5 * 60;
  pomodoro.muted = false;
  breakLengthField.innerHTML = pomodoro.break;
  sessionLengthField.innerHTML = pomodoro.session;
  toggleCircleClick();
  usedTime = 0;
  updateDisplay(pomodoro.sessionSec);
  progressBar.value = 0;
}


setInterval(run, 100);

// eventlisteners
plusMinusButtons.forEach((button) => {
  button.addEventListener('click', handlePlusMinusButtonsClick);
});
clock.addEventListener('click', toggleCircleClick);
muteAudio.addEventListener('click', mute);

updateDisplay(pomodoro.sessionSec);
