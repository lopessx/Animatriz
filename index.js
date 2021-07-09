//título do processo que será exibido no sistema operacional
process.title = 'Animatriz';
//atributos do processo do web server
var args = process.argv,
  port = args[2] || 6969,
  webServer = require('./server');
//Inicialização do servidor
webServer.listen(port, function () {
  console.log('Server started at porta ' + port);
});