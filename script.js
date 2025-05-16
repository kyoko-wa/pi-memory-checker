
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const inputField = document.getElementById("inputDigits");
  const resultDiv = document.getElementById("result");
  const timerDisplay = document.getElementById("timer");
  const rangeSelector = document.getElementById("digitRange");
  let timer, startTime;

  const startTimer = () => {
    startTime = new Date();
    timer = setInterval(() => {
      const now = new Date();
      const elapsed = new Date(now - startTime);
      timerDisplay.textContent = elapsed.toISOString().substr(14, 5);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timer);
    const now = new Date();
    return Math.floor((now - startTime) / 1000);
  };

  startBtn.addEventListener("click", () => {
    inputField.disabled = false;
    inputField.focus();
    startTimer();
  });

  stopBtn.addEventListener("click", () => {
    const duration = stopTimer();
    inputField.disabled = true;
    const selectedRange = rangeSelector.value.split("-");
    const start = parseInt(selectedRange[0]);
    const end = parseInt(selectedRange[1]);
    const correctDigits = PI_DIGITS.slice(start - 1, end);
    const userInput = inputField.value.trim();
    let correctCount = 0;
    let resultHTML = "<div><strong>Correct:</strong><br>";

    for (let i = 0; i < correctDigits.length; i++) {
      const correctChar = correctDigits[i];
      const userChar = userInput[i] || " ";
      if (correctChar === userChar) {
        resultHTML += correctChar;
        correctCount++;
      } else {
        resultHTML += `<span style="color:red;">${correctChar}</span>`;
      }
    }

    resultHTML += "</div><div><strong>Your Input:</strong><br>";

    for (let i = 0; i < correctDigits.length; i++) {
      const userChar = userInput[i] || " ";
      if (correctDigits[i] === userChar) {
        resultHTML += userChar;
      } else {
        resultHTML += `<span style="color:red;">${userChar}</span>`;
      }
    }

    resultHTML += "</div>";
    resultDiv.innerHTML = resultHTML;

    saveHistory(duration, correctCount, correctDigits.length);
  });
});
