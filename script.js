// Sprint 3: Javascript Memory Card Game
// javascript file
// CSE 310 Class
// 15 February 2024
// Christopher Slack

const cards = ['😂', '🤣', '😎', '😜', '😁', '😒', '😴', '🤑'];
let flippedCards = [];
let matchedPairs = 0;

//Shuffles an array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

//Creates the card elements and adds them to the game container
function createCards() {
    const shuffledCards = shuffle(cards.concat(cards));
    const gameContainer = document.querySelector('.memory-game');

    shuffledCards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        // Use a data attribute to store the card's content
        cardElement.dataset.card = card;
        cardElement.addEventListener('click', flipCard);
        gameContainer.appendChild(cardElement);
    });
}

//Flips a card and adds it to the flippedCards array
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

//Checks if the flipped cards match and updates the game state
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.card === card2.dataset.card) {
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        card1.classList.add('hidden');
        card2.classList.add('hidden');
        matchedPairs++;
        if (matchedPairs === cards.length) {
            alert('Congratulations! You found all pairs.');
            resetGame();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }
    flippedCards = [];
}

//Resets the game
function resetGame() {
    const gameContainer = document.querySelector('.memory-game');
    gameContainer.innerHTML = '';
    createCards();
    matchedPairs = 0;
}

//Calls the .createCards function when the script loads
createCards();