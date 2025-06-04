// Exemplo simples: quando o usuário clicar, o Mario faz um “pulo”
const mario = document.getElementById('mario');
let pulando = false;

function pula() {
  if (pulando) return;
  pulando = true;
  mario.style.animation = 
    'runMario 0.5s steps(3) infinite, ' +  // mantém corrida
    'jump 0.7s ease-out both';              // adiciona pulo
  setTimeout(() => {
    // volta ao movimento padrão
    mario.style.animation = 
      'runMario 0.5s steps(3) infinite, moveMario 5s linear infinite';
    pulando = false;
  }, 700);
}

document.addEventListener('click', pula);

// Keyframes para o pulo
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes jump {
  0%   { transform: translate(0, 0); }
  50%  { transform: translate(0, -150px); }
  100% { transform: translate(0, 0); }
}`, styleSheet.cssRules.length);
