// var net = require('net');
// // require TCP libraries/modules

// var server = net.createServer();
// // create the server

// server.on('connection',function(client){
//   client.write('Sup');
//   client.on('data', function(data){
//     console.log(data.toString());
//     // data that is logged is a Buffer
//     // nodes way of representing binary data before encoding
//     // Buffer: each byte represents a letter/character from the string
//   });
//   // listen to a data event on the client, and log it to the console
//   // client.end();
//   // we no longer want to close the connection so we can continually listen for data events
// });
// // add a listener for a connection event, print Sup and close the connection

// server.listen(9000)
// // listen for connections on port 9000

var net = require('net');
// require TCP libraries/modules

var server = net.createServer();
var clientList = [];
// create the server and an array to hold new clients

server.on('connection',function(client){
  client.name = client.remoteAddress + ':' + client.remotePort;
  // remoteAddress is the IP remoteAddress of the client
  // remotePort is the TCP port the client chose for responses
  // remotePort will be unique for all clients connecting the server
  client.write('My name is '+ client.name);

  clientList.push(client);
  client.on('data',function(data){
    broadcast(data,client);
  });
  client.on('end', function(){
    clientList.splice(clientList.indexOf(client),1);
  })
  // when a client closes a connection, it will remove them from the array of clients
  
  
});
function broadcast(data,client){
  var cleanup = [];
  for(var i = 0; i < clientList.length; i++){
    if (client != clientList[i]){
      // check if client is writable
      if(clientList[i].writable){
        clientList[i].write(client.name + ' said: ' + data);
      } else {
        // if not add the client to the cleaner array
        // close the client socket
        
        cleanup.push(clientList[i]);
        clientList[i].destroy();
      }
   }
 }
}
server.listen(9000)
