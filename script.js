let score = 0;
let isGameOver = false;

const ufo = document.getElementById('ufo');
const alien = document.getElementById('alien');
const explosion = document.getElementById('explosion');
const gameOverScreen = document.getElementById('game-over');
const scoreDisplay = document.getElementById('score');

// 1. Move UFO with Mouse or Touch
window.addEventListener('mousemove', (e) => {
    if (isGameOver) return;
    ufo.style.left = e.pageX - 25 + 'px';
    ufo.style.top = e.pageY - 25 + 'px';
    checkCollision();
});

window.addEventListener('touchmove', (e) => {
    if (isGameOver) return;
    let touch = e.touches[0];
    ufo.style.left = touch.pageX - 25 + 'px';
    ufo.style.top = touch.pageY - 25 + 'px';
    checkCollision();
});

// 2. Move Alien Randomly
function moveAlien() {
    if (isGameOver) return;
    const x = Math.random() * (window.innerWidth - 60);
    const y = Math.random() * (window.innerHeight - 60);
    alien.style.left = x + 'px';
    alien.style.top = y + 'px';
}

let alienInterval = setInterval(moveAlien, 1000); // Moves every 1 second

// 3. Collision Detection (The "Blow Up" Logic)
function checkCollision() {
    const ufoRect = ufo.getBoundingClientRect();
    const alienRect = alien.getBoundingClientRect();

    if (!(ufoRect.right < alienRect.left || 
          ufoRect.left > alienRect.right || 
          ufoRect.bottom < alienRect.top || 
          ufoRect.top > alienRect.bottom)) {
        
        triggerExplosion(ufoRect.left, ufoRect.top);
    }
}

function triggerExplosion(x, y) {
    isGameOver = true;
    explosion.style.left = x + 'px';
    explosion.style.top = y + 'px';
    explosion.style.display = 'block';
    alien.style.display = 'none';
    ufo.style.display = 'none';
    
    gameOverScreen.style.display = 'block';
}

function resetGame() {
    isGameOver = false;
    score = 0;
    scoreDisplay.innerText = "Aliens Caught: 0";
    gameOverScreen.style.display = 'none';
    explosion.style.display = 'none';
    alien.style.display = 'block';
    ufo.style.display = 'block';
    moveAlien();
}
