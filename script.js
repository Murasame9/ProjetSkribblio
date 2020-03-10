document.onselectstart = new Function ("return false");
    if(window.sidebar)
    {
        document.onmousedown = false;
        document.onclick = true;
    }

    var taille = 32000;
    var grille = document.getElementById("grille");
    var currentColor;
    var coloringIsActivate = false;

    var palette = document.getElementById("palette");

    var btn_options = document.querySelectorAll('btn_options');

    var eraser = document.getElementById("erase");
    eraser.addEventListener('click', createGrid);

    var color_add = document.getElementById("color_add");
    color_add.addEventListener('click', f_colorAdd);


    document.body.addEventListener('mousedown',activeColoring);
    document.body.addEventListener('mouseup',desactiveColoring);

    var rgbSection = document.getElementById("rgbSection");

    var Tcolors = ['silver','gray','black','red','darkred','yellow','olive','lime','green','aqua','teal','blue','navy','fuchsia','purple'];
    
    function createGrid(){
        grille.innerHTML='';
        for(var i = 0; i < taille;i++){
            var cellules = document.createElement("div");
            cellules.addEventListener('mouseover', coloring);
            cellules.className = "case";
            grille.appendChild(cellules);
            cellules.style.height = 5+"px";
            cellules.style.width = cellules.style.height;
            cellules.style.backgroundColor ="white";
        }
    }

    function createPalette(){
        palette.innerHTML='';

        for(var i = 0; i < Tcolors.length;i++){
            var couleurs = document.createElement('div');
            couleurs.className = "couleurs";
            palette.appendChild(couleurs);
            couleurs.style.background =Tcolors[i];
            couleurs.addEventListener('click',coloringChoice);
        }
    }

    function coloringChoice(e){
        currentColor = e.target.style.backgroundColor;
    }

    function coloring(e){
        if(coloringIsActivate){
        e.target.style.backgroundColor = currentColor;   
        }   

        document.body.onkeydown = function(touche){
        if(touche.keyCode == 65){
            e.target.style.backgroundColor = "white"; 
        }
        }
    }

    function activeColoring(){
        coloringIsActivate = true;
    }

    function desactiveColoring(){
        coloringIsActivate = false;
    }

    function DisplayRGBSection(){
        if(rgbSection.style.display == "none"){
            rgbSection.style.display = "block";
        } else{ 
            rgbSection.style.display = "none";
        }
    }

    function f_colorAdd(){
        do{
        var virgule = 0, r = 0, g = 0; b = 0;        

        newColor = rgbSection.value;

        for(var i = 0; i < newColor.length ; i++){
            if(newColor[i]==','){
                virgule++;
                i++
            }

            if(virgule==0){
                r += newColor[i];
            } else if (virgule == 1){
                g += newColor[i];
            } else if (virgule == 2){
                b += newColor[i];
            }
        }
        } while((r<0)||(r>255)||(g<0)||(g>255)||(b<0)||(b>255))

        var couleurs = document.createElement('div');
        couleurs.className = "couleurs";
        newColor = "rgb("+newColor+")";
        Tcolors.push(newColor);
        createPalette();
        rgbSection.value = "";
    }
    
    createGrid();

    createPalette();