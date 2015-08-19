
var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');


var five = require("johnny-five"),
  board, button;

// board = new five.Board();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// board.on("ready", function() {

//   button = new five.Button(2);


//   // Inject the `sensor` hardware into
//   // the Repl instance's context;
//   // allows direct command line access
//   board.repl.inject({
//     button: button
//   });

//   button.on("down", function() {
//     console.log(this.value);
//     //console.log("down");
//     io.sockets.emit('status', {val: this.value});
//   });

//   button.on("up", function() {
//     console.log(this.value);
//     //console.log("up");
//     io.sockets.emit('status', {val: this.value});
//   });
// });

http.listen(3000, function() {
    console.log('listening on *:3000');
});


