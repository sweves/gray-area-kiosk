
var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

// Declare variables
var fs = require('fs'),
    objectt;

// Read the file and send to the callback
fs.readFile('./books.json', handleFile)

// Write the callback function
function handleFile(err, data) {
    if (err) throw err
    objectt = JSON.parse(data)
    // You can now play with your datas
    //console.log(objectt);
    var str = objectt[0].title;
    // console.log(str);
}


var five = require("johnny-five"),
  board, button;

board = new five.Board();

app.locals.bookdata = require("./books.json");

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});



board.on("ready", function() {

  button = new five.Button(2);

  // Create a standard `led` component
  // on a valid pwm pin
  var led = new five.Led(9);

  led.pulse();

  // // Stop and turn off the led pulse loop after
  // // 10 seconds (shown in ms)
  // this.wait(10000, function() {

  //   // stop() terminates the interval
  //   // off() shuts the led off
  //   led.stop().off();
  // });


  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    button: button
  });

  button.on("down", function() {
    console.log(this.value);
    //console.log("down");
    io.sockets.emit('status', {val: this.value});

  });

  button.on("up", function() {
    console.log(this.value);
    //console.log("up");
    io.sockets.emit('status', {val: this.value});
  });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});


