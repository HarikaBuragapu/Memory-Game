const cardsArray = [
    { name: 'A', img: '🥔' },
    { name: 'B', img: '🍒' },
    { name: 'C', img: '🥑' },
    { name: 'D', img: '🌽' },
    { name: 'E', img: '🥕' },
    { name: 'F', img: '🫐' },
    { name: 'G', img: '🍉' },
    { name: 'H', img: '🍌' },
];
const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');
const moveCounter = document.getElementById('moveCounter');
const timeCounter = document.getElementById('timeCounter');

let firstCard, secondCard;
let lockBoard = false;
let matches = 0;
let moves = 0;
let timer;
let time = 0;
let timerInterval;

// Duplicate and shuffle the cards
const gameCards = [...cardsArray, ...cardsArray];
gameCards.sort(() => 0.5 - Math.random());

function createBoard() {
    gameBoard.innerHTML = '';
    gameCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;
        cardElement.dataset.index = index;
        cardElement.innerHTML = `<div class="card-content">${card.img}</div>`;
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    moveCounter.textContent = moves;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        disableCards();
        matches++;
        if (matches === cardsArray.length) {
            clearInterval(timerInterval);
            setTimeout(() => alert(`You won! Moves: ${moves}, Time: ${time} seconds`), 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function startTimer() {
    time = 0;
    timeCounter.textContent = time;
    timerInterval = setInterval(() => {
        time++;
        timeCounter.textContent = time;
    }, 1000);
}

function restartGame() {
    matches = 0;
    moves = 0;
    moveCounter.textContent = moves;
    clearInterval(timerInterval);
    startTimer();
    gameCards.sort(() => 0.5 - Math.random());
    createBoard();
    document.querySelectorAll('.card').forEach(card => card.addEventListener('click', flipCard));
}

restartButton.addEventListener('click', restartGame);

// Initialize the game
createBoard();
document.querySelectorAll('.card').forEach(card => card.addEventListener('click', flipCard));
startTimer();