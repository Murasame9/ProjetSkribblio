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
    });

    socket.on('sendMessage', function(data){
        onMessageReceived(socket, data);
    });

    socket.on('updateCanvas', function(data){
        updateCanvas(socket, data);
    });

    socket.on('setPseudo', function(data){
        setPseudo(socket,data);
    });


    /*socket.join('room1');
    socket.broadcast.to("room1").emit("log", "bjr"); // envoie a tt le monde sauf a lui meme (broadcast)

    socket.pseudo = */

    /*var room = io.sockets.adapter.rooms["room1"];
    room.users[socket.id] = {
        "dessine" : false,
        "asTrouve" : false
    };*/
});

function updateCanvas(socket, data){
    socket.broadcast.emit("updateCanvas", data);
}

function onMessageReceived(socket, data){
    socket.broadcast.emit("messageSend", data);
}

function setPseudo(socket, data){
    socket.pseudo = data;
}

// Socket.pseudo = <- ca va crée une variable pseudo qui sera propose au joueur
