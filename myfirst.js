var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var requ = req.url === '/' ? '/index' : req.url;
  var filename = `.${requ}.html`;
  var status = 200;
  
  fs.exists(filename, (exists) => {
    if(!exists) {
      filename = './404.html';
      status = 404;
    }
    
    fs.readFile(filename, function(err, data) {
      if (err) {
        throw err;
      }
      res.writeHead(status, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    })
  })
}).listen(8080);
