var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = []
var gamePattern = [];
var hasStarted = false;
var level = 0
var hasFailed = false



// $(".startButton").click(function(event){ //set it to document to listen to the while document
//     if(!hasStarted){
//         //game not started so change title and get next in sequence
//         $("#level-title").text("Level " + level)
//         nextSequence()
//         hasStarted = true
//     }else{
//         //game started
        
//     }
    
// })

function startgame(){
    if(!hasStarted){
        //game not started so change title and get next in sequence
        $("#level-title").text("Level " + level)
        $(".startButton").hide()
        nextSequence()
        hasStarted = true
    }else{
        //game started
        
    }
}

$(".btn").click(function(){
    //buttonHandler($(this).attr("id"))
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)
    playsound(userChosenColor)
    animatePress(userChosenColor)
    
    checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel){
    //check if the user picked the right color
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        //picked correctly
        //check for the user to be ready for the next level
        if(userClickedPattern.length === gamePattern.length){
            //call the next level after a delay
            setTimeout(function(){
                nextSequence()
            },1000)
        }
    }else{
        //failed so update title play sounds and show game over style
        let highscore = level
        var endaudio = new Audio("./sounds/wrong.mp3");
        endaudio.volume = 0.1
        endaudio.play();
        
        //attach the game over class to the body and remove it after 200 ms
        $(".startButton").show()
        $("#level-title").text("Game Over, Press Button to Restart(Your Score: " + highscore + ")")
        $(".startButton").attr("onclick","startOver()")
        $(".startButton").text("Restart")
        
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        //startOver()
    }

}




function nextSequence() {
    //reset the array
    userClickedPattern = []
    //increment the level
    level++
    $("#level-title").text("Level " + level)

    //get the next value
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);  //animate
    //$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    //play a sound for that color
    //playsound(randomChosenColour)
    playEntireGame()
}
function playEntireGame(){
    for(let i = 0;i < gamePattern.length; i++){
        setTimeout(function(){
            $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
            playsound(gamePattern[i])
        },300 * i)
    }
}


function playsound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.volume = 0.1
    audio.play();

}
function animatePress(color){
    $("#" + color).addClass("pressed")
    setTimeout(function(){
        $("#"+color).removeClass("pressed")
    },100)
}
function startOver(){
    //reset the variables
    level = 0
    gamePattern = []
    hasStarted = false;
    $(".startButton").attr("onclick","startgame()")
    $(".startButton").text("Start")
    $("#level-title").text("Press Start")
    

}





