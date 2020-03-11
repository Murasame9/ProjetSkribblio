var socket = io();
socket.emit("log", "bonjour je suis vivant ENFIN");

socket.on("log", function(data){
    console.log(data);
});

io.on(/* Curseur dans l'input + enter */, envoyeMessage)

function envoyeMessage(/* Ce qu'a écrit le gars dans l'input */){
    /* Recup ce qui a dans l'input et l'ecrit au dessus dans un p */
};


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
document.addEventListener("mousedown",onDocMouseDown);
document.addEventListener("mouseup",onDocMouseUp);

function onDocMouseDown() {
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
