$(document).ready(function () {
  let timer;
  let minutes = 25;
  let seconds = 0;
  let isWorkTime = true;
  let workDuration = 25;
  let shortBreakDuration = 5;
  let longBreakDuration = 15;
  let cycleCount = 0;

  function updateDisplay() {
    $('.minutes').text(minutes.toString().padStart(2, '0'));
    $('.seconds').text(seconds.toString().padStart(2, '0'));
    $('.status').text(
      isWorkTime ? 'Work' : cycleCount % 4 === 0 ? 'Long Break' : 'Short Break',
    );
  }

  function startTimer() {
    timer = setInterval(function () {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          playSound();
          if (isWorkTime) {
            cycleCount++;
            if (cycleCount % 4 === 0) {
              startBreak(longBreakDuration);
            } else {
              startBreak(shortBreakDuration);
            }
          } else {
            startWork();
          }
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      updateDisplay();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function resetTimer() {
    clearInterval(timer);
    minutes = workDuration;
    seconds = 0;
    isWorkTime = true;
    cycleCount = 0;
    updateDisplay();
  }

  function startWork() {
    isWorkTime = true;
    minutes = workDuration;
    seconds = 0;
    updateDisplay();
    startTimer();
  }

  function startBreak(duration) {
    isWorkTime = false;
    minutes = duration;
    seconds = 0;
    updateDisplay();
    startTimer();
  }

  function playSound() {
    const audio = new Audio('alarm.mp3');
    audio.play();
  }

  function applySettings() {
    workDuration = parseInt($('#work-duration').val());
    shortBreakDuration = parseInt($('#short-break-duration').val());
    longBreakDuration = parseInt($('#long-break-duration').val());
    resetTimer();
  }

  $('.start').click(startTimer);
  $('.stop').click(stopTimer);
  $('.reset').click(resetTimer);
  $('.apply-settings').click(applySettings);

  updateDisplay();
});
