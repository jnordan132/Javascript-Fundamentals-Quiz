// DOM elements, starting variables, and Q&A array
const currentTime = document.getElementById("currentTime");
const timer = document.getElementById("startTime");
const questionsDiv = document.getElementById("questionsDiv");
const wrapper = document.getElementById("content");
const ulCreate = document.createElement("ul");
var score = 0;
var questionIndex = 0;
var secondsLeft = 60;
var holdInterval = 0;
var timeSub = 5;
var multiChoiceQuestions = [{
        question: 'What does "DOM" stand for?',
        choices: ["A. Document Oriented Model", "B. Designated Object Model", "C. Document Object Model", "D. Nothing, it doesnt exist"],
        answer: "C. Document Object Model"
    },
    {
        question: 'What does the "NaN" property mean in Javascript?',
        choices: ["A. Not a number", "B. Its an error", "C. Nothing assigned", "D. Number added next"],
        answer: "A. Not a number"
    },
    {
        question: 'Which HTML element do we use to link a JavaScript file to an HTML file?',
        choices: ["A. <body>", "B. <link>", "C. <html>", "D. <script>"],
        answer: "D. <script>"
    },
    {
        question: 'Which method returns the length of a string?',
        choices: ["A. size()", "B. index()", "C. length()", "D. None of the above"],
        answer: "C. length()"
    },
    {
        question: 'How do you create a function in Javascript?',
        choices: ["A. function = myFunction()", "B. function myFunction()", "C. function { myfunction()", "D. myFunction()"],
        answer: "B. function myFunction()"
    },
    {
        question: 'How does a "for" loop start?',
        choices: ["A. for(i < 5; i++)", "B. for i = 5; i++", "C. for(i = 0; i < 5; i++)", "D. for i++; i > 5;"],
        answer: "C. for(i = 0; i < 5; i++)"
    },
    {
        question: "Where do you put the <script> element in an HTML file?",
        choices: ["A. <body>", "B. <head>", "C. <footer>", "D. <section>"],
        answer: "A. <body>"
    },
    {
        question: 'How do you add a comment in a JavaScript?',
        choices: ["A. 'this is a comment'", "B. <-- this is a comment -->", "C. // this is a comment", "D. /* this is a comment /*"],
        answer: "C. // this is a comment"
    }
];
// Event listener to start timer, and display questions
timer.addEventListener("click", function() {
    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    display(questionIndex);
});
// Displays questions and answers
function display(questionIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < multiChoiceQuestions.length; i++) {
        var userQuestion = multiChoiceQuestions[questionIndex].question;
        var userChoices = multiChoiceQuestions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function(newItem) {
        const listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare choices with answer
function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.id = "createDiv";
        if (element.textContent == multiChoiceQuestions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer was:  " + multiChoiceQuestions[questionIndex].answer;
        } else {
            secondsLeft = secondsLeft - timeSub;
            createDiv.textContent = "Wrong! The correct answer is:  " + multiChoiceQuestions[questionIndex].answer;
        }
    }
    // Question Index determines which question user is on
    questionIndex++;
    if (questionIndex >= multiChoiceQuestions.length) {
        allDone();
    } else {
        display(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}
// All done will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";
    const createH1 = document.createElement("h1");
    createH1.id = "createH1";
    createH1.textContent = "All Done!"
    questionsDiv.appendChild(createH1);
    const createP = document.createElement("p");
    createP.id = "createP";
    questionsDiv.appendChild(createP);
    // Calculates time remaining and replaces with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        const createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;
        questionsDiv.appendChild(createP2);
    }
    // Label
    const createLabel = document.createElement("label");
    createLabel.id = "createLabel", createLabel.textContent = "Enter your initials: ";
    questionsDiv.appendChild(createLabel);
    // input
    const createInput = document.createElement("input");
    createInput.type = "text", createInput.id = "initials", createInput.textContent = "";
    questionsDiv.appendChild(createInput);
    // submit
    const createSubmit = document.createElement("button");
    createSubmit.type = "submit", createSubmit.id = "Submit", createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);
    // Event listener for initials/score for local storage
    createSubmit.addEventListener("click", function() {
        var initials = createInput.value;
        if (initials === "") {
            console.log("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
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
    });
};