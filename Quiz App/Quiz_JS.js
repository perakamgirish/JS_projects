const questions = [
  {
    question: "Which is largest animal in the World?",
    answers: [
      { Text: "Shark", correct: false },
      { Text: "Blue Whale", correct: true },
      { Text: "Elephant", correct: false },
      { Text: "Giraffe", correct: false },
    ],
  },

  {
    question: "Which is smallest Continent in the World?",
    answers: [
      { Text: "Asia", correct: false },
      { Text: "Australia", correct: true },
      { Text: "Arctic", correct: false },
      { Text: "Africa", correct: false },
    ],
  },

  {
    question: "Which is largest  desert in the World?",
    answers: [
      { Text: "Kalahari", correct: false },
      { Text: "Gobi", correct: false },
      { Text: "Sahara", correct: false },
      { Text: "Antrctica", correct: true },
    ],
  },

  {
    question: "Entomology is the science that studies?",
    answers: [
      { Text: "Behavior of human beings", correct: false },
      { Text: "Insects", correct: true },
      {
        Text: "The origin and history of technical and scientific terms",
        correct: false,
      },
      { Text: "The formation of rocks", correct: false },
    ],
  },

  {
    question: "For which of the following disciplines is Nobel Prize awarded?",
    answers: [
      { Text: "Physics and Chemistry", correct: false },
      { Text: "Physiology or Medicine", correct: false },
      { Text: "Literature, Peace and Economics", correct: false },
      { Text: "All of the above", correct: true },
    ],
  },
];
const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answer_buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNO = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNO + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.Text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.datasetset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = "You Scored ${score} out of ${questions.length}!";
  nextButton.innerHTML = "play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
