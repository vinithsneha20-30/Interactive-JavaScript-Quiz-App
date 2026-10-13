// 1. Questions Array with at least 8 question objects
const questions = [
    {
        question: "What is the output of typeof null in JavaScript?",
        options: ["object", "null", "undefined", "number"],
        answer: "object"
    },
    {
        question: "Which keyword is used to declare a block-scoped variable in modern JavaScript?",
        options: ["var", "let", "variable", "define"],
        answer: "let"
    },
    {
        question: "Which array method adds one or more elements to the end of an array?",
        options: ["shift()", "unshift()", "push()", "pop()"],
        answer: "push()"
    },
    {
        question: "How do you write a single-line comment in JavaScript?",
        options: ["<!-- This is a comment -->", "/* This is a comment */", "// This is a comment", "** This is a comment"],
        answer: "// This is a comment"
    },
    {
        question: "Which function converts a JSON string into a JavaScript object?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"],
        answer: "JSON.parse()"
    },
    {
        question: "What does the '===' operator check in JavaScript?",
        options: ["Only value equality", "Value and data type equality", "Reference equality only", "Variable declaration status"],
        answer: "Value and data type equality"
    },
    {
        question: "Which method is used to select an HTML element by its unique ID?",
        options: ["document.querySelector()", "document.getElementById()", "document.getElementsByClassName()", "document.querySelectorAll()"],
        answer: "document.getElementById()"
    },
    {
        question: "What is the default behavior of events traveling from the target element up to the root element?",
        options: ["Event Capturing", "Event Bubbling", "Event Hoisting", "Event Propagation Bypass"],
        answer: "Event Bubbling"
    }
];

// State variables
let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

// DOM Elements
const quizBox = document.getElementById("quiz-box");
const questionContainer = document.getElementById("question-container");
const feedbackContainer = document.getElementById("feedback-container");
const nextBtn = document.getElementById("next-btn");
const currentScoreSpan = document.getElementById("current-score");
const resultBox = document.getElementById("result-box");
const finalScoreText = document.getElementById("final-score-text");
const restartBtn = document.getElementById("restart-btn");

// Initialize Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    currentScoreSpan.textContent = score;
    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");
    loadQuestion();
}

// Render current question and options dynamically using DOM methods
function loadQuestion() {
    answerSelected = false;
    nextBtn.disabled = true;
    feedbackContainer.textContent = "";
    
    const currentQ = questions[currentQuestionIndex];
    
    // Clear previous question content
    questionContainer.innerHTML = "";

    // Create Question Title element
    const qTitle = document.createElement("h3");
    qTitle.textContent = `Q${currentQuestionIndex + 1}: ${currentQ.question}`;
    questionContainer.appendChild(qTitle);

    // Create Options Grid container
    const optionsGrid = document.createElement("div");
    optionsGrid.className = "options-grid";

    // Loop through options and create buttons dynamically
    currentQ.options.forEach(optionText => {
        const optionBtn = document.createElement("button");
        optionBtn.className = "option-btn";
        optionBtn.textContent = optionText;
        
        // Add click event listener to handle selection
        optionBtn.addEventListener("click", () => selectOption(optionBtn, optionText, currentQ.answer));
        optionsGrid.appendChild(optionBtn);
    });

    questionContainer.appendChild(optionsGrid);
}

// Handle option selection logic
function selectOption(selectedButton, chosenOption, correctAnswer) {
    if (answerSelected) return; // Prevent changing answer once selected
    answerSelected = true;

    const allOptionButtons = document.querySelectorAll(".option-btn");

    // Disable all options after selection
    allOptionButtons.forEach(btn => btn.disabled = true);

    if (chosenOption === correctAnswer) {
        selectedButton.classList.add("correct");
        feedbackContainer.textContent = "Correct!";
        feedbackContainer.style.color = "#28a745";
        score++;
        currentScoreSpan.textContent = score;
    } else {
        selectedButton.classList.add("wrong");
        feedbackContainer.textContent = `Wrong! The correct answer is: "${correctAnswer}"`;
        feedbackContainer.style.color = "#dc3545";

        // Reveal the correct answer button
        allOptionButtons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add("correct");
            }
        });
    }

    // Enable the 'Next Question' button
    nextBtn.disabled = false;
}

// Next question event handler
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalScreen();
    }
});

// Show final score screen with dynamic feedback message
function showFinalScreen() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");

    let message = "";
    if (score === 8) {
        message = "Outstanding! Perfect score!";
    } else if (score >= 6) {
        message = "Great job! You have a solid grasp of JavaScript.";
    } else if (score >= 4) {
        message = "Good effort! Review DOM manipulation and arrays to improve further.";
    } else {
        message = "Keep practicing! Review Sessions 16 to 21 to strengthen your basics.";
    }

    finalScoreText.textContent = `You scored ${score} out of ${questions.length} — ${message}`;
}

// Restart button event handler
restartBtn.addEventListener("click", startQuiz);

// Run on page load
startQuiz();