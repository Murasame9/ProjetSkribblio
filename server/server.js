var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('./client/'));

app.get('/', function(req,res){
    res.sendFile('index.html', {root:"./client/"});
});

http.listen(3000, function(){
    console.log("listening...");
});

// Quand il se connecte il envoie a tout le monde bjr
io.on('connect', function(socket){
    socket.on("log", function(data){
        console.log(data);
    })
    socket.join('room1');
    socket.broadcast.to("room1").emit("log", "bjr"); // envoie a tt le monde sauf a lui meme (broadcast)
});

// Socket.pseudo = <- ca va crée une variable pseudo qui sera propose au joueur
