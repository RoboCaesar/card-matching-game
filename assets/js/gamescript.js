var cardsArray = [];
var numberOfCards = 24;
var firstGuess;
var firstGuessIndex;
var secondGuess;
var secondGuessIndex;
var whichGuess = 0;
var flipped = [];
var score = 100;
var flippedCards = 0;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function showVictory() {
    $("h1").text("You've won! Congratulations!");
    $("h1").addClass("victorious");
}

function updateScore() {
    $("#scoredisplay").text("Score: " + String(score));
}

function resetVariables() {
    flippedCards = 0;
    score = 100;
    whichGuess = 0;
    $("h1").removeClass("victorious");
    $("h1").text("Card Matching Game");
    updateScore();
}

function generateCards() {
    var randomPick;
    var foundPlace = false;
    /*
    for (var i = 0; i < numberOfCards; i++) {
        cardsArray[i] = getRandomInt(1, 12);
        $(".cardimage").eq(i).css("background-image", "url(assets/images/cards/" + String(cardsArray[i]) + ".png)");
    }*/

    for (var k = 0; k < numberOfCards; k++) {
        cardsArray[k] = 0;
        flipped[k] = false;
    }

    for (var i = 0; i < numberOfCards; i++) {
        foundPlace = false;
        while (foundPlace == false) {
            randomPick = getRandomInt(0, numberOfCards);
            if (cardsArray[randomPick] == 0) {
                cardsArray[randomPick] = Math.floor(i/2) + 1;
                foundPlace = true;
                //$(".cardimage").eq(randomPick).css("background-image", "url(assets/images/cards/" + String(cardsArray[randomPick]) + ".png)");
            }
        }
    }
}

function resetCards() {
    for (var i = 0; i < numberOfCards; i++) {
        if (flipped[i] == true) {
            flipCard(i, 0);
            flipped[i] = false;
        }
    }
    generateCards();
    resetVariables();
}

function revealCards() {
    score = 0;
    for (var i = 0; i < numberOfCards; i++) {
        if (flipped[i] == false) {
            flipCard(i, cardsArray[i]);
            flipped[i] = true;
        }
    }
    updateScore();
}

function flipCard(cardIndex, toWhat) {
    $(".cardimage").eq(cardIndex).delay(500).animate({
        width: "0",
    }, 200, function() {
        //$(this).css("background-image", "url(assets/images/ace_of_spades.png)");
        if(toWhat > 0) {
            $(".cardimage").eq(cardIndex).css("background-image", "url(assets/images/cards/"
            + String(toWhat) + ".png)");
        }
        else {
            $(".cardimage").eq(cardIndex).css("background-image", "url(assets/images/cardback.png)");            
        }
    });
    $(".cardimage").eq(cardIndex).animate({
        width: "100%",
    }, 200);
}

//------------Main-------------

$("#reset").on("click", function() {
    resetCards();
})

$("#reveal").on("click", function() {
    if (flippedCards != numberOfCards) revealCards();
})

$("#carddisplay").on("click", ".cardimage",function() {
    var thisIndex = $(".cardimage").index(this);
    if (flipped[thisIndex] == false) {
        flipped[thisIndex] = true;
        $(this).animate({
            width: "0",
        }, 200, function() {
            //$(this).css("background-image", "url(assets/images/ace_of_spades.png)");
            $(".cardimage").eq(thisIndex).css("background-image", "url(assets/images/cards/"
            + String(cardsArray[thisIndex]) + ".png)");
        });
        $(this).animate({
            width: "100%",
        }, 200, function() {
            if (whichGuess == 0) {
                whichGuess = 1;
                firstGuess = cardsArray[thisIndex];
                firstGuessIndex = thisIndex;
            }
            else {
                whichGuess = 0;
                secondGuess = cardsArray[thisIndex];
                secondGuessIndex = thisIndex;
                if (secondGuess == firstGuess) {
                    flippedCards += 2;
                    score += 20;
                    updateScore();
                    if (flippedCards == numberOfCards) showVictory();
                }
                else {
                    flipCard(secondGuessIndex, "ace_of_spades");
                    flipCard(firstGuessIndex, "ace_of_spades");
                    flipped[firstGuessIndex] = false;
                    flipped[secondGuessIndex] = false;
                    score -= 4;
                    if (score < 0) score = 0;
                    updateScore();
                }
            }
        });

    }
});

generateCards();
