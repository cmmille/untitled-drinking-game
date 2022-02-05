class card {
    constructor(title, image, rule, type, special) {
        this.title = title;
        this.image = image;
        this.rule = rule;
        this.type = type;
        this.special = special;
    }

    randomizeCount(rulePrefix, ruleSuffix, maxDrinkCount) {
        // Randomizer
        let randomDrinkCount = Math.floor(Math.random() * maxDrinkCount) + 1;

        // Create rule
        let cardRule = rulePrefix + randomDrinkCount + ruleSuffix;

        // Set values
        $("#card-image").text(randomDrinkCount);
        $("#card-rule").text(cardRule);

    }

    setCard() {
        $("#card-title").text(this.title);
        $("#card-image").text(this.image);
        $("#card-rule").text(this.rule);

        // Reset image
        $("#card-image").removeClass();
        $("#card-image").css("background-color", "");

        switch (this.type) {
            case "give" :
                $("#card-image").addClass("counter-image give-image");
                this.randomizeCount("Give ", "", 6);
                break;
            case "take" :
                $("#card-image").addClass("counter-image take-image");
                this.randomizeCount("Take ", "", 4);
                break;
            case "special" :
                $("#card-image").addClass(this.special + " counter-image");
                this.randomizeCount(this.rule + " take ", "", 3);
                break;
            case "rule" :
                $("#card-image").addClass("rule-image");
                break;
            default:
        }
    }

}

// ***** MAIN *****
// Set turn count
let turnCount = 10;
let repeatableCards = [];
let ruleCards = [];
let cards = [];

startNewGame();

// Set click listener
$("#draw-button").on("click", drawCard);

// **********

// Display remaining cards
function updateCardCount() {
    $("#remaining-cards").text(cards.length);
}

function createCardDeck(numDecks) {
    let cards = [];

    while (cards.length < turnCount) {
        let deckChooser = Math.floor(Math.random() * numDecks);

        // Repeatable cards
        switch (deckChooser) {
            case 0:
                cards.push(addRepeatableCard(repeatableCards));
                break;
            case  1:
                if (ruleCards.length > 0) {
                    cards.push(addCard(ruleCards));
                } else cards.push(addRepeatableCard(repeatableCards));
                break;
        }

    }

    return cards;

}

// Add repeatable card to deck
function addRepeatableCard(deck) {
    let randomCardNum = Math.floor(Math.random() * deck.length);

    return deck[randomCardNum];
}

// Add unique card to deck
function addCard(deck) {
    let randomCardNum = Math.floor(Math.random() * deck.length);
    let randomCard = deck[randomCardNum];
    deck.splice(randomCardNum);

    return randomCard;
}

// Draw card
function drawCard() {
    // Animate out old card
    $(".game-card").fadeToggle();
    $(".game-card").fadeToggle();

    setTimeout(function (){
        if (turnCount > 0) {
            // Draw card from top of deck
            let currentCard = cards.shift();
            currentCard.setCard();
            $("#remaining-cards").text(turnCount);
            turnCount--;


        } else {
            gameOver();
        }
    }, 400);

}

function gameOver() {
    $("#remaining-cards").text(turnCount);
    $("#card-title").text("Game over");
    $("#card-image").removeClass();
    $("#card-image").text("");
    $("#card-rule").text("Play again?");
    startNewGame();
}

function startNewGame() {
    turnCount = 10;

    // Repeatable card deck
    repeatableCards.push(new card("Drinksgiving", "3", "Give 3 drinks", "give"));
    repeatableCards.push(new card("Bev Up", "3", "Take 3 drinks", "take"));
    repeatableCards.push(new card("Sausage Fest", "1", "Boys", "special", "blue"),);
    repeatableCards.push(new card("Taco Tuesday", "1", "Girls", "special", "pink"),);

    // Rule card deck
    ruleCards.push(new card("Big head, little arms", "Self Rule", "You now have T-rex arms until the end of the game", "rule"));
    ruleCards.push(new card("Stanky Drank", "Self Rule", "Every time you take a drink, you must comment on how bad it smells", "rule"));

    // Load cards
    cards = createCardDeck(2);

}
