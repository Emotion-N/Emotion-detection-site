const gameArea = document.getElementById('game-area');
const startBtn = document.getElementById('start-btn');
const timeLeftElement = document.getElementById('timeLeft');
const scoreElement = document.getElementById('score');
const avgSpeedElement = document.getElementById('avgSpeed');

let target;
let score = 0;
let totalTime = 0;
let clickCount = 0;
let lastClickTime = null;
let gameTimer;

function createTarget() {
    target = document.createElement('div');
    target.classList.add('target');
    gameArea.appendChild(target);
    moveTarget();
}

function moveTarget() {
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);
    
    target.style.left = newX + 'px';
    target.style.top = newY + 'px';
    target.style.transform = 'scale(1)';
}

function handleClick() {
    const currentTime = new Date().getTime();
    
    if (lastClickTime !== null) {
        const timeDiff = currentTime - lastClickTime;
        totalTime += timeDiff;
        clickCount++;
        
        avgSpeedElement.textContent = Math.round(totalTime / clickCount);
    }
    
    lastClickTime = currentTime;
    score++;
    scoreElement.textContent = score;
    
    target.style.transform = 'scale(0)';
    setTimeout(moveTarget, 300);
}

function startGame() {
    startBtn.style.display = 'none';
    score = 0;
    totalTime = 0;
    clickCount = 0;
    lastClickTime = null;
    scoreElement.textContent = '0';
    avgSpeedElement.textContent = '0';

    createTarget();
    target.addEventListener('click', handleClick);

    let timeLeft = 30;
    timeLeftElement.textContent = timeLeft;

    gameTimer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(gameTimer);
    target.removeEventListener('click', handleClick);
    gameArea.removeChild(target);
    startBtn.style.display = 'block';
    alert(`Game Over! Your score: ${score}`);
}

startBtn.addEventListener('click', startGame);