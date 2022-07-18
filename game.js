const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
let userClickedPattern = [];
let level = 0; 
let gameStart = false;
let gameOver = false;

function nextSequence(){
    level++;
    userClickedPattern = [];
    $("h1").text(`Level: ${level}`);  

    const randomNumber = Math.floor(Math.random() * 3) + 1;
    const chosenColor = buttonColors[randomNumber]; 
    gamePattern.push(chosenColor);
    
    for(let i = 0; i < gamePattern.length; i++){
        playSound(`#${gamePattern[i]}`);
        setTimeout(function(){
            $(`#${gamePattern[i]}`).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);

        }, 200);
    }
}

function playSound(name){
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColor}`).removeClass("pressed");
        console.log("I have ran!");
    }, 50);
}

function checkAnswer(currentLevel){
    console.log(userClickedPattern)
    console.log(gamePattern)
    if(userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        $("h1").text(`You lose!`);  
        $("body").css("background-color", "red");
        gameOver = true;

    }
}

$(".btn").on("click", function(event) {
    if(!gameOver){
        playSound($(this).attr("id"));
        animatePress($(this).attr("id"));
        userClickedPattern.push($(this).attr("id"));
        checkAnswer(userClickedPattern[userClickedPattern.length - 1]);
    }
});


$(document).on("keypress", function(event){
    if(level === 0){
        $("h1").text(`Level: ${level}`);  
        nextSequence();
    }
});

