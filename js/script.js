const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');
const clouds = document.querySelector('.clouds');

const jumpSound = document.getElementById('jumpSound');
const themeSound = document.getElementById('themeSound');
const gameOverSound = document.getElementById('gameOverSound');

const startButton = document.querySelector('.start-button');
const gameBoard = document.querySelector('.game-board'); 
const hiddenGameElements = document.querySelectorAll('.hidden-game-element');

const restartButton = document.querySelector('.restart-button');

gameOverSound.load();

let score = 0;
let pipeVelocity = 15; //
const initialPipeVelocity = 15; //

const jump = () => {
    mario.classList.add('jump');
    
    jumpSound.currentTime = 0;
    jumpSound.play().catch(e => console.log("Erro ao reproduzir som de pulo:", e));

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const updateScore = () => {
    score++;
    scoreElement.textContent = `Score: ${score}`;
}

const increaseSpeed = () => {
    pipeVelocity += 0.2;
}

pipe.style.animation = 'none';

let pipeCurrentPosition = window.innerWidth;

const movePipe = () => {
    pipeCurrentPosition -= pipeVelocity;
    pipe.style.left = `${pipeCurrentPosition}px`;

    if (pipeCurrentPosition + pipe.offsetWidth < 0) {
        pipeCurrentPosition = window.innerWidth;
        updateScore();
        increaseSpeed();
    }
}

let gameLoopInterval; //

const startGame = () => {
    startButton.classList.add('hidden');
    restartButton.classList.add('hidden'); //

    gameBoard.classList.remove('initial-dark');
    gameBoard.classList.add('game-active');

    hiddenGameElements.forEach(element => {
        element.classList.remove('hidden-game-element');
        element.classList.add('visible-game-element');
    });

    themeSound.volume = 0.5; //
    themeSound.play().catch(e => console.log("Erro ao reproduzir a música tema:", e)); //

    if (gameLoopInterval) {
        clearInterval(gameLoopInterval);
    }

    gameLoopInterval = setInterval(() => {
        const pipePosition = pipeCurrentPosition;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 105) {
            pipe.style.left = `${pipePosition}px`;
            
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'img/game-over.png';
            mario.style.width = '75px'
            mario.style.marginLeft = '50px'

            const cloudsComputedRight = window.getComputedStyle(clouds).right;
            clouds.style.animation = 'none';
            clouds.style.right = cloudsComputedRight;

            themeSound.pause();
            themeSound.currentTime = 0;
            gameOverSound.play().catch(e => console.log("Erro ao reproduzir som de Game Over:", e));

            clearInterval(gameLoopInterval);
            restartButton.classList.remove('hidden'); //
        }

        movePipe();

    }, 10);
}

const restartGame = () => {
    // Resetar variáveis do jogo
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    pipeVelocity = initialPipeVelocity; //

    // Resetar estado do Mario
    mario.src = 'img/mario.gif'; //
    mario.style.width = '150px'; //
    mario.style.marginLeft = '0px'; //
    mario.style.animation = ''; //
    mario.style.bottom = '0px'; //
    mario.classList.remove('jump'); // Remove a classe 'jump' para garantir que ele não esteja em estado de pulo

    // Resetar posição do cano
    pipeCurrentPosition = window.innerWidth;
    pipe.style.left = `${pipeCurrentPosition}px`;
    pipe.style.animation = ''; //

    // Resetar animação das nuvens
    clouds.style.animation = 'clouds-animation 20s infinite linear';
    clouds.style.right = ''; //

    // Esconde o botão de reiniciar e inicia o jogo novamente
    restartButton.classList.add('hidden');
    startGame();
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

document.addEventListener('keydown', jump);