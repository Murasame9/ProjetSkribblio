var socket = io();
//ocket.emit("log", "bonjour je suis vivant ENFIN");

var pseudo = Math.floor(Math.random()*400);
var room = 1;

socket.emit("setPseudo",pseudo); // Donne un pseudo
socket.emit("setRoom",room); // Donne une room
socket.emit("affichageMessagesPrecedents"); // affiche les messages envoyé dans le chat avant que l'utilisateur ne se connecte

socket.on("log", function(data){
    console.log(data);
});

// Fonction Messages
socket.on("messageSend", function(data){
    receiveMessage(data);
});

function receiveMessage(data){
    var paragraphe = document.createElement("p");
    paragraphe.innerText = data.pseudo+" : "+data.msg;
    document.getElementById("chat").appendChild(paragraphe);
}

// Fonction Afficher les messages précedent
socket.on("afficherLesMessagesPrecedents", function(data){
    afficheMessagesPre(data);
});

function afficheMessagesPre(data){
    for (var i = 0; i < data.length; i++){
        var paragraphe = document.createElement("p");
        paragraphe.innerText = data[i].pseudo+" : "+data[i].msg;
        document.getElementById("chat").appendChild(paragraphe);
    }
}

// Fonction Canvas (qui ne marche pas encore)
socket.on("updateCanvas", function(data){
    receiveCanvasData(data);
});

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

// Multi debut

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

// Multi fin

// Fonctions qui gère la couleur DEBUT
var couleurs = document.createElement('div');
        couleurs.className = "couleurs";
 
var palette = document.getElementById("palette");
var currentColor = "rgb(0,0,0)";
var Tcolors = ['silver','gray','black','red','darkred','yellow','olive',
    'lime','green','aqua','teal','blue','navy','fuchsia','purple'];
    
var couleurs = document.createElement('div');
        couleurs.className = "couleurs";
 
    var palette = document.getElementById("palette");

function createPalette(){
    palette.innerHTML='';

    for(var i = 0; i < 15 ;i++){//Tcolors.length
        var couleurs = document.createElement('div');
        couleurs.className = "couleurs";
        palette.appendChild(couleurs);
        couleurs.style.background =Tcolors[i];
        couleurs.addEventListener('click',coloringChoice);
    }
    console.log("Palette fini");
}

function coloringChoice(e){
    currentColor = e.target.style.backgroundColor;
    console.log("Changer");
}      
// Fonctions qui gère la couleur FIN

function dessiner() {
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 5;
    ctx.lineTo(mouseX,mouseY);
    ctx.stroke();
}

document.addEventListener("mousemove",onDocMouseMove);
canvas.addEventListener("mousedown",onDocMouseDown);
document.addEventListener("mouseup",onDocMouseUp);

function onDocMouseDown() {
    ctx.beginPath();
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

createPalette();