var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;



$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();          // computer generated color will go to gamePatter
        started = true;
    }
});
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    $("#" + userChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    userClickedPattern.push(userChosenColor);           // userClicked color will go to userClickedPattern
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.indexOf(userChosenColor));
});

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        console.log("success");

        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function() {
                nextSequence();
            }, 1000);
         };

         $("#level-title").text("Level " + level);


    }
    else{
        console.log("failed");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
};



function nextSequence() 
{
    userClickedPattern= [];
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);

};







function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
};

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

function startOver()
{
    level = 0;
    started = false;
    gamePattern = [];
}






// if(userClickedPattern==gamePattern)
// {
//     level++;
//     $("#level-title").text("Level "+ level);
//     nextSequence();,

// }
// else{
//     $("level-title").text("Game over");
// }





