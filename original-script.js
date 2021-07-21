// Declared variables
var score = 0;
var questionIndex = 0;

// Start working code 
// Declared variables
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// 15 seconds per question:
var secondsLeft = 76;
// Interval time
var holdInterval = 0;
// Penalty time
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");

// Questions variable
var questions = [{
        title: 'What does "DOM" stand for?',
        choices: ["A. Document Oriented Model", "B. Designated Object Model", "C. Document Object Model", "D. Nothing, it doesnt exist"],
        answer: "C. Document Object Model"
    },
    {
        title: 'What does the "NaN" property mean in Javascript?',
        choices: ["A. Not a number", "B. Its an error", "C. Nothing assigned", "D. Number added next"],
        answer: "A. Not a number"
    },
    {
        title: 'Which HTML element do we use to link a JavaScript file to an HTML file?',
        choices: ["A. <body>", "B. <link>", "C. <html>", "D. <script>"],
        answer: "D. <script>"
    },
    {
        title: 'Which method returns the length of a string?',
        choices: ["A. size()", "B. index()", "C. length()", "D. None of the above"],
        answer: "C. length()"
    },
    {
        title: 'How do you create a function in Javascript?',
        choices: ["A. function = myFunction()", "B. function myFunction()", "C. function { myfunction()", "D. myFunction()"],
        answer: "B. function myFunction()"
    },
    {
        title: 'How does a "for" loop start?',
        choices: ["A. for(i < 5; i++)", "B. for i = 5; i++", "C. for(i = 0; i < 5; i++)", "D. for i++; i > 5;"],
        answer: "C. for(i = 0; i < 5; i++)"
    },
    {
        title: "Where do you put the <script> element in an HTML file?",
        choices: ["A. <body>", "B. <head>", "C. <footer>", "D. <section>"],
        answer: "A. <body>"
    },
    {
        title: 'How do you add a comment in a JavaScript?',
        choices: ["A. 'this is a comment'", "B. <-- this is a comment -->", "C. // this is a comment", "D. /* this is a comment /*"],
        answer: "C. // this is a comment"
    }
];











// Renders questions 
function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function(newItem) {
        var listItem = document.createElement("li");
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
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        } else {
            // Deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }
    }
    // Question Index determines number question user is on
    questionIndex++;
    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}
// All done will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";
    // Heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"
    questionsDiv.appendChild(createH1);
    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);
    // Calculates time remaining and replaces with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;
        questionsDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";
    questionsDiv.appendChild(createLabel);
    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
    questionsDiv.appendChild(createInput);
    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);
    // Event listener for initials/score for local storage
    createSubmit.addEventListener("click", function() {
        var initials = createInput.value;
        if (initials === null) {
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
}






// Triggers timer on click, shows user a display
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
    render(questionIndex);
});