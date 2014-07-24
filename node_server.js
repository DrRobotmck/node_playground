var http = require('http');
// requires the http protocol
var fs = require('fs');
// require the file reading library
var EventEmitter = require('events').EventEmitter;
var logger = new EventEmitter();

logger.on('error', function(message){
  console.log('Error: ' + message)
})

var server = http.createServer()
server.on('request',function(request,response){
  response.writeHead(200);
  // return a status code of 200 for the response
  // writeHead(statusCode,{options})
  request.pipe(response);
  // add something to the response body
  // close the connection
  // can take data as a parameter
  // response.end('Hello, this is doge')
  setTimeout(function(){
    console.log('past sup')
    response.write("Dog is done.");
    response.end();
  }, 5000)
})
server.listen(8000);

// create a server, listening on port 8080 for connections

console.log('sup')
