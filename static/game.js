//controle de entrada e saida
var socket = io();
//movimentos possíveis
var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}

//Irá verificar qual movimento está sendo feito com base no evento correspondente a uma tecla
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});

//Irá enviar dados ao jogador com base no seu movimento
socket.emit('new player');
setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);

//Canvas que representa o jogador visualmente
var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');

//Validar o movimento do jogador no canvas
socket.on('state', function(players) {
  console.log(players);
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'green';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});