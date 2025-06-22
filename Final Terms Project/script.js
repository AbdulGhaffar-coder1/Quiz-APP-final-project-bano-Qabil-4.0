let userName = "";
let timers = [];

function startQuiz() {
    const name = document.getElementById("nameInput").value.trim();
    if (!name) return alert("Please enter your name");
    userName = name;
    document.getElementById("username").innerText = `Welcome, ${userName}`;
    document.getElementById("nameModal").style.display = "none";
    startTimer(1);
}

function startTimer(qNum) {
    let time = 10;
    const timerEl = document.getElementById(`timer${qNum}`);
    const interval = setInterval(() => {
        if (time > 0) {
            timerEl.textContent = time;
            time--;
        } else {
            clearInterval(interval);
            if (qNum < 5) nextQuestion(qNum);
            else showResult();
        }
    }, 1000);
    timers[qNum - 1] = interval;
}

function stopTimer(qNum) {
    clearInterval(timers[qNum - 1]);
}

function nextQuestion(current) {
    stopTimer(current);
    document.getElementById(`q${current}`).classList.remove("active");
    const next = document.getElementById(`q${current + 1}`);
    if (next) {
        next.classList.add("active");
        startTimer(current + 1);
    }
}

function showResult() {
    stopTimer(5);
    let score = 0;
    for (let i = 1; i <= 5; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === "1") score++;
    }
    document.getElementById("result").style.display = "block";
    document.getElementById("result").innerHTML = `
        <p><strong>Name:</strong> ${userName}</p>
        <p><strong>Score:</strong> ${score} / 5</p>
        <p><strong>Status:</strong> ${score >= 3 ? "✅ Passed" : "❌ Failed"}</p>
        <button onclick="location.reload()">🔁 Try Again</button>
        <button onclick=\"window.location.href='index.html'\">🏠 Go to Home</button>
      
            `;

    document.querySelectorAll(".question-box").forEach(box => box.style.display = "none");
}