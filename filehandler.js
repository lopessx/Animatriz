//Solicitação de uma função padrão do node para manipular arquivos
var fs = require('fs');
//retorno de uma função
 module.exports = function(filename, successFn, errorFn) {
       fs.readFile(filename, function(err, data) {
      if(err) {
           errorFn(err);
      } else {
           successFn(data);
      }
  });
 };