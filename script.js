// Starting variables, assigned HTMl elements, and Q&A array
var score = 0;
var questionsIndex = 0;
var startTime = 60;
var pauseInterval = 0;
var timeSubtraction = 5;
const timeLeft = document.getElementById("timeLeft");
const timer = document.getElementById("timer");
const questionsContainer = document.getElementById("questionsContainer");
const wrapper = document.getElementById("content");
const createUl = document.createElement("ul");
const multiChoiceQuestions = [{
        question: "What does 'DOM' stand for?",
        multipleChoices: ["A. Document Oriented Model", "B. Designated Object Model", "C. Document Object Model", "D. Nothing, it doesnt exist"],
        answer: "C. Document Object Model"
    },
    {
        question: "What does the 'NaN' property mean in Javascript?",
        multipleChoices: ["A. Not a number", "B. Its an error", "C. Nothing assigned", "D. Number added next"],
        answer: "A. Not a number"
    },
    {
        question: "Which HTML element do we use to link a JavaScript file to an HTML file?",
        multipleChoices: ["A. <body>", "B. <link>", "C. <html>", "D. <script>"],
        answer: "D. <script>"
    },
    {
        question: "Which method returns the length of a string?",
        multipleChoices: ["A. .size", "B. .index", "C. .length", "D. None of the above"],
        answer: "C. .length"
    },
    {
        question: "How do you create a function in Javascript?",
        multipleChoices: ["A. function = myFunction()", "B. function myFunction()", "C. function { myfunction()", "D. myFunction()"],
        answer: "B. function myFunction()"
    },
    {
        question: "How does a 'for' loop start?",
        multipleChoices: ["A. for(i < 5; i++)", "B. for i = 5; i++", "C. for(i = 0; i < 5; i++)", "D. for i++; i > 5;"],
        answer: "C. for(i = 0; i < 5; i++)"
    },
    {
        question: "Where do you put the <script> element in an HTML file?",
        multipleChoices: ["A. <body>", "B. <head>", "C. <footer>", "D. <section>"],
        answer: "A. <body>"
    },
    {
        question: "How do you add a comment in a JavaScript?",
        multipleChoices: ["A. 'this is a comment'", "B. <-- this is a comment -->", "C. // this is a comment", "D. /* this is a comment /*"],
        answer: "C. // this is a comment"
    }
];
// Event listener to start timer, and display questions
timer.addEventListener("click", function() {
    if (pauseInterval === 0) {
        pauseInterval = setInterval(function() {
            startTime--;
            timeLeft.textContent = "Time: " + startTime;
            if (startTime <= 0) {
                clearInterval(pauseInterval);
                finished();
                timeLeft.textContent = "Time's up!";
            }
        }, 1000);
    }
    display(questionsIndex);
});
// Displays questions and answers
function display(questionsIndex) {
    questionsContainer.innerHTML = "";
    createUl.innerHTML = "";
    for (var i = 0; i < multiChoiceQuestions.length; i++) {
        let userQuestions = multiChoiceQuestions[questionsIndex].question;
        var userAnswers = multiChoiceQuestions[questionsIndex].multipleChoices;
        questionsContainer.textContent = userQuestions;
    }
    userAnswers.forEach(function(nextQuestion) {
        let listItem = document.createElement("li");
        listItem.textContent = nextQuestion;
        questionsContainer.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
};
// Compare choices with answers
function compare(event) {
    let element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.id = "createDiv";
        if (element.textContent == multiChoiceQuestions[questionsIndex].answer) {
            score++;
            createDiv.textContent = "Correct!   " + multiChoiceQuestions[questionsIndex].answer;
        } else {
            startTime = startTime - timeSubtraction;
            createDiv.textContent = "Wrong! The correct answer is:  " + multiChoiceQuestions[questionsIndex].answer;
        }
    }
    // Question Index determines which question user is on
    questionsIndex++;
    if (questionsIndex >= multiChoiceQuestions.length) {
        finished();
    } else {
        display(questionsIndex);
    }
    questionsContainer.appendChild(createDiv);
};
// Finished will append second to last page (initials and save score)
function finished() {
    questionsContainer.innerHTML = "";
    timeLeft.innerHTML = "";
    const createH1 = document.createElement("h1");
    createH1.id = "createH1";
    createH1.textContent = "All Done!"
    questionsContainer.appendChild(createH1);
    const createP = document.createElement("p");
    createP.id = "createP";
    questionsContainer.appendChild(createP);
    // Calculates time remaining and questions right; replaces with score
    if (startTime >= 0) {
        var timeRemaining = startTime;
        const createP2 = document.createElement("p");
        clearInterval(pauseInterval);
        createP.textContent = "Your final score is: " + timeRemaining * 2;
        questionsContainer.appendChild(createP2);
    }
    const infoPrompt = document.createElement("label");
    infoPrompt.id = "createLabel";
    infoPrompt.textContent = "Enter your initials: ";
    questionsContainer.appendChild(infoPrompt);
    // Input initials
    const userInitials = document.createElement("input");
    userInitials.type = "text";
    userInitials.id = "initials";
    userInitials.textContent = "";
    questionsContainer.appendChild(userInitials);
    // Submit score and initials
    const saveInfo = document.createElement("button");
    saveInfo.type = "submit";
    saveInfo.id = "Submit";
    saveInfo.textContent = "Submit";
    questionsContainer.appendChild(saveInfo);
    // Stores initials/score in local storage
    saveInfo.addEventListener("click", function() {
        var initials = userInitials.value;
        if (initials === "") {
            console.log("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining * 2
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("scores.html");
        }
    })
};