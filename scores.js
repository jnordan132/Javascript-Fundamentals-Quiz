var highScoreBtn = document.getElementById("highScore");
var clearBtn = document.getElementById("clear");
var retakeBtn = document.getElementById("retake");

// Event listener to clear scores 
clearBtn.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});
// Event listener to go to index page
retakeBtn.addEventListener("click", function() {
    window.location.replace("index.html");
});
// Retreives local stroage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScoreBtn.appendChild(createLi);
    }
}