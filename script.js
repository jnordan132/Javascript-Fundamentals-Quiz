// Assigning buttons
var startEl = document.getElementById("#start-btn");
var timer = document.getElementById("#timer");
var score = 0;
var questions = [{
        title: 'What does "DOM" stand for?',
        multipleChoice: ["A. Document Oriented Model", "B. Designated Object Model", "C. Document Object Model", "D. Nothing, it doesnt exist"],
        answer: "C. Document Object Model"
    },
    {
        title: 'What does the "NaN" property mean in Javascript?',
        multipleChoice: ["A. Not a number", "B. Its an error", "C. Nothing assigned", "D. Number added next"],
        answer: "A. Not a number"
    },
    {
        title: 'Which HTML element do we use to link a JavaScript file to an HTML file?',
        multipleChoice: ["A. <body>", "B. <link>", "C. <html>", "D. <script>"],
        answer: "D. <script>"
    },
    {
        title: 'Which method returns the length of a string?',
        multipleChoice: ["A. size()", "B. index()", "C. length()", "D. None of the above"],
        answer: "C. length()"
    },
    {
        title: 'How do you create a function in Javascript?',
        multipleChoice: ["A. function = myFunction()", "B. function myFunction()", "C. function { myfunction()", "D. myFunction()"],
        answer: "B. function myFunction()"
    },
    {
        title: 'How does a "for" loop start?',
        multipleChoice: ["A. for(i < 5; i++)", "B. for i = 5; i++", "C. for(i = 0; i < 5; i++)", "D. for i++; i > 5;"],
        answer: "C. for(i = 0; i < 5; i++)"
    },
    {
        title: "Where do you put the <script> element in an HTML file?",
        multipleChoice: ["A. <body>", "B. <head>", "C. <footer>", "D. <section>"],
        answer: "A. <body>"
    },
    {
        title: 'How do you add a comment in a JavaScript?',
        multipleChoice: ["A. 'this is a comment'", "B. <-- this is a comment -->", "C. // this is a comment", "D. /* this is a comment /*"],
        answer: "C. // this is a comment"
    }
];

// display questions and answers; function