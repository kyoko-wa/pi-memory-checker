
function saveHistory(time, correct, total) {
  const history = JSON.parse(localStorage.getItem("piHistory")) || [];
  const now = new Date().toLocaleString();
  history.unshift({ time: now, duration: time, correct, total });
  localStorage.setItem("piHistory", JSON.stringify(history));
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("piHistory")) || [];
  const container = document.getElementById("history");
  container.innerHTML = "<h3>History</h3>";
  history.forEach((entry) => {
    const item = document.createElement("div");
    item.textContent = `${entry.time} - Time: ${entry.duration}s, Score: ${entry.correct}/${entry.total}`;
    container.appendChild(item);
  });
}
