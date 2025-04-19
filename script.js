const questions = [
  {
    question: "What is the Caesar Cipher?",
    options: ["Substitution Cipher", "Transposition Cipher", "Hash Function", "Public Key Algorithm"],
    answer: 0
  },
  {
    question: "Which algorithm produces a 256-bit hash?",
    options: ["SHA-1", "MD5", "SHA-256", "Base64"],
    answer: 2
  },
  {
    question: "Which cipher uses a keyword for encryption?",
    options: ["RSA", "Vigenère Cipher", "Caesar Cipher", "SHA-256"],
    answer: 1
  },
  {
    question: "Which is an asymmetric encryption algorithm?",
    options: ["AES", "DES", "Vigenère", "RSA"],
    answer: 3
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionText = document.getElementById("question");
const optionsList = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const result = document.getElementById("result");
const scoreText = document.getElementById("score");
const bestScoreText = document.getElementById("best-score");
const timerText = document.getElementById("timer");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

function loadQuestion(index) {
  clearInterval(timer);
  timeLeft = 15;
  startTimer();

  const q = questions[index];
  questionText.textContent = q.question;
  optionsList.innerHTML = "";
  nextBtn.classList.add("hidden");

  q.options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.addEventListener("click", () => checkAnswer(i, li));
    optionsList.appendChild(li);
  });
}

function checkAnswer(selectedIndex, selectedElement) {
  clearInterval(timer);
  const correctIndex = questions[currentQuestion].answer;
  const options = optionsList.querySelectorAll("li");

  options.forEach((opt, idx) => {
    opt.style.pointerEvents = "none";
    if (idx === correctIndex) opt.style.backgroundColor = "lightgreen";
    if (idx === selectedIndex && idx !== correctIndex) opt.style.backgroundColor = "tomato";
  });

  if (selectedIndex === correctIndex) {
    score++;
    correctSound.play();
  } else {
    wrongSound.play();
  }

  nextBtn.classList.remove("hidden");
}

function startTimer() {
  timerText.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoSkip();
    }
  }, 1000);
}

function autoSkip() {
  const correctIndex = questions[currentQuestion].answer;
  const options = optionsList.querySelectorAll("li");
  options.forEach((opt, idx) => {
    opt.style.pointerEvents = "none";
    if (idx === correctIndex) opt.style.backgroundColor = "lightgreen";
  });
  wrongSound.play();
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion(currentQuestion);
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("question-container").style.display = "none";
  nextBtn.style.display = "none"; // ✅ Hide the Next button after quiz ends
  result.classList.remove("hidden");
  scoreText.textContent = `${score} / ${questions.length}`;

  const best = Math.max(score, localStorage.getItem("bestScore") || 0);
  localStorage.setItem("bestScore", best);
  bestScoreText.textContent = best;
}

window.onload = () => {
  loadQuestion(currentQuestion);
};
