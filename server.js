
//Inicialização de variáveis e importação dos módulos base do servidor
var http = require('http'),
    config = require('./config'),
    fileHandler = require('./filehandler'),
    parse = require('url').parse,
    types = config.types,
    rootFolder = config.rootFolder,
    defaultIndex = config.defaultIndex,
    server;
var express = require('express');
var socketIO = require('socket.io');

//Instancia do servidor e exportação da variável
var app = express();
server = http.createServer();

module.exports = server;

app.set('port', 6969);
app.use('/static', express.static(__dirname + '/static'));

server.on('request', onRequest);

//Variável de controle de comandos de I/O
var io = socketIO(server);

//Função que dirá o que vai acontecer por requisição -- req = requisição -- res = resposta
function onRequest(req, res) {
    var filename = parse(req.url).pathname,
        fullPath,
        extension;

    if (filename === '/') {
        filename = defaultIndex;
    }

    fullPath = rootFolder + filename;
    extension = filename.substr(filename.lastIndexOf('.') + 1);
//Função para o gerenciador de arquivos
    fileHandler(fullPath, function (data) {
        res.writeHead(200, {
            'Content-Type': types[extension] || 'text/plain',
            'Content-Length': data.length
        });
        res.end(data);

    }, function (err) {
        res.writeHead(404);
        res.end();
    });
}
//Array contendo jogadores
var players = {};

//Função que determina os comnados de entrada e saída de movimentos
io.on('connection', function(socket){
    socket.on('new player',function(){
        players[socket.id] = {
            x:300,
            y:300
        };
    });
    socket.on('movement', function(data){
        var player = players[socket.id] || {};
        if(data.left){
            player.x -= 5;
        }
        if(data.up){
            player.y -= 5;
        }
        if (data.right) {
            player.x += 5;
          }
          if (data.down) {
            player.y += 5;
          }
    });

});
// Intervalo em que os movimentos são lidos da tela
setInterval(function() {
    io.sockets.emit('state', players);
  }, 1000 / 60);