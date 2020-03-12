var socket = io();
//ocket.emit("log", "bonjour je suis vivant ENFIN");

var pseudo = Math.floor(Math.random()*400);
var room = 1;

socket.emit("setPseudo",pseudo); // Donne un pseudo
socket.emit("setRoom",room); // Donne une room

socket.on("log", function(data){
    console.log(data);
});

// Fonction Messages
socket.on("messageSend", function(data){
    receiveMessage(data);
});

// Fonction Canvas (qui ne marche pas encore)
socket.on("updateCanvas", function(data){
    receiveCanvasData(data);
});

function receiveMessage(data){
    var paragraphe = document.createElement("p");
    paragraphe.innerText = data.pseudo+" : "+data.msg;
    document.getElementById("chat").appendChild(paragraphe);
}

function envoyeMessage(message){
    console.log(message);
    var paragraphe = document.createElement("p");
    paragraphe.innerText = pseudo + " : " + message;
    document.getElementById("chat").appendChild(paragraphe);
    socket.emit("sendMessage", {"msg":message, "pseudo": pseudo});
};

function testKey(){
    var key = event.keyCode;
    var input = document.getElementById("text");
    console.log(key);
    if (key == 13){
        envoyeMessage(input.value);
        input.value = "";
    }
}

// Canvas
var fps = 30;
var frameDuration = 1000/fps;
var w = 500;
var h = 500;
var mouseX = 0;
var mouseY = 0;

var canvas = document.getElementById("canvas");
canvas.width= w;
canvas.height = h;
var ctx = canvas.getContext("2d");

var jeDoisDessiner = false;

function sendCanvasData(){
    var imgData = ctx.getImageData(0,0,100, 100);
    socket.emit("updateCanvas", imgData);
}

function receiveCanvasData(data){
    ctx.putImageData(data);
}

requestAnimationFrame(update);
function update(timestamp) {
    if (jeDoisDessiner) {
        dessiner();
    }
    requestAnimationFrame(update);
}

function dessiner() {
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.lineWidth = 5;
    ctx.lineTo(mouseX,mouseY);
    ctx.stroke();
}

document.addEventListener("mousemove",onDocMouseMove);
canvas.addEventListener("mousedown",onDocMouseDown);
document.addEventListener("mouseup",onDocMouseUp);

function onDocMouseDown() {
    console.log("je dessine");
    ctx.moveTo(mouseX,mouseY);
    jeDoisDessiner = true;
}
function onDocMouseUp() {
    jeDoisDessiner = false;
}

function onDocMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}
