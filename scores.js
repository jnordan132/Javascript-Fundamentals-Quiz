var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// Event listener to clear scores 
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});
// Event listener got go to index page
goBack.addEventListener("click", function() {
    window.location.replace("index.html");
});
// Retreives local stroage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);
    }
}