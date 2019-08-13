let express = require('express');
let http = require('http');
let serveStatic = require('serve-static');
let path = require('path');
let log = console.log;


//CORS middleware
function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


function listen(port) {

  let app = express();
  let staticServer = serveStatic(path.resolve(__dirname, '../public/'), {'index': ['index.html', 'index.htm']})

  let server = http.createServer(app);

  app.use(allowCrossDomain);
  app.use(staticServer);

  app.get('/*', function(req,res) {
    res.sendFile(path.resolve(__dirname,'../public/index.html'));
  });


  server.listen(port);

  log('Listening to port '+port);

}

listen(3000);
