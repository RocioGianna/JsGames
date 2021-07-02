document.addEventListener("DOMContentLoaded", iniciarPagina);
function iniciarPagina(){
    //Las funciones inicio y nivel hacen los mismo, solo tipean una frase
    let textoSpan = document.getElementById("typed");
    function inicio(){
        let palabra =  str => {
            let newArr = str.split('');
            let i = 0;
            let printnStr = setInterval(function(){
                textoSpan.innerHTML += newArr[i];
                i++;
                if(i == newArr.length){
                    clearInterval(printnStr);
                }
            }, 50);
        }
        palabra('Bienvenido al juego de memoria.');
    }
    inicio();

    document.getElementById("btn").addEventListener("click", generarTablero);
    let casilleros = 6;
    let fichas = [];
    let simbolos = ['🔥','🎂', '🍩', '🍬', '🍨', '🥙', '🍓', '🌭', '🍭', '🍫', '🍷', '✨', '🎄', '☢️','🐶', '🐣' ];
    let vidasArr = ['💖','💖','💖','💖'];
    let max = vidasArr.length;
    let segundos = 1000;
    let cantErrores = 0;
    let vida = 4;

    //funcion encargada de generar la cantidad de casilleros del 
    //tablero y asignarles el evento de cuando sean clickeados.
    //Dentro se llama a la funcion completarTablero que como su nombre lo indica
    //se encarga de llenar el tablero de simbolos de mandera aleatoria.
    function generarTablero(){
        document.querySelector('audio').play();
        setTimeout(function(){
            document.querySelector('#game').play();
        }, 500);
        //dejo de mostrar los objetos del menu
        let menu = document.querySelector(".titulo");
        menu.style.display = "none";
        let input = document.querySelector("#input_name");
        input.style.display = "none";
        let boton = document.querySelector("#btn");
        boton.style.display = "none";

        //mostrar vidas
        document.getElementById("vidas").innerHTML = vidasArr;

        let tablero = document.getElementById("tablero");
        for(let i = 0; i < casilleros; i++){
            fichas.push(document.createElement('div'));
        }
        tablero.style.display = "flex";
        for (let i = 0; i < fichas.length; i++){
            fichas[i].innerHTML = '';
            fichas[i].classList.add('fichas');
            fichas[i].classList.add('non-selectable');
            fichas[i].addEventListener('click', jugar);
            tablero.appendChild(fichas[i]);
        }
        let max = fichas.length;
        for(let i = 0; i < casilleros /2; i++){
            let casillero = Math.floor(Math.random() * max);
            let simbolo = simbolos[i];
            completarTablero(fichas, simbolo, casillero);
            max = max -1;
            casillero = Math.floor(Math.random() * max);
            completarTablero(fichas, simbolo, casillero);
            max = max -1;
        }
        //da vuelta las fichas para iniciar el juego
        setTimeout(function(){
            for (let i = 0; i < fichas.length; i++){
                fichas[i].classList.remove('fichas');
                fichas[i].classList.add('vueltaFicha');
            }
        }, segundos);
    }

    function completarTablero(fichas, simbolo, casillero){
        let indice = 0;
        for(let pos = 0; pos < casillero; pos++){
            if (fichas[indice].innerHTML == ''){
                indice++;
            }else{
                while(fichas[indice].innerHTML !== ''){
                    indice++;
                }
            }
        }
        while(fichas[indice].innerHTML !== ''){
            indice++;
        }
        fichas[indice].innerHTML = simbolo;
    }

    //Esta funcion es encargada de comenzar el juego. Se inicia cuando se le da click a una ficha
    //a la cual anteriormente en generarTablero se le dio el evento.
    //Se encarga ademas de verificar que las fichas sean o no incorrectas, lo que hace que se apliquen
    //distintos clases de css para los diferentes casos.
    //Luego revisa si todas las fichas tienen la clase 'correcta' llama a la funcion
    //siguienteNivel.
    function jugar(e){
        let clicked = e.currentTarget;
        clicked.classList.remove('vueltaFicha');
        clicked.classList.add('fichas');
        const he = 0;

        //mostrar vidas
        document.getElementById("vidas").innerHTML = vidasArr;

        let fichaElejida = document.getElementsByClassName('fichas');
        arr = [...fichaElejida];

        if(arr[0].textContent == arr[1].textContent){
                arr.forEach(element => {
                    element.classList.remove('fichas');
                    element.classList.add('correcta');
                    element.removeEventListener("click", jugar, false); 
                });
        }else{
            arr.forEach(element => {
                element.classList.add('incorrecta');                
            });
            setTimeout(function(){
                arr.forEach(element => {
                    element.classList.remove('fichas');
                    element.classList.remove('incorrecta');
                    element.classList.add('vueltaFicha');
                });
                cantErrores++;
                console.log(cantErrores);
                arr = [];
            }, 500);
            if(vida >= 1){
                vida = vida - 1;
                if(vida <= max){
                    console.log(max + "soy max")
                    //vidasArr.splice(vida);
                    vidasArr[vida]="💔";
                }
                console.log(vidasArr + "soy vidaass");
            }else{
                setTimeout(function(){
                    gameOver();
                }, 1000);
            }
        }

        let acertadas = document.getElementsByClassName('correcta');
        if (acertadas.length == fichas.length){
            setTimeout(function(){
                siguienteNivel();
            }, 500);
        }
    }

    //siguiente nivel encargado de resetear el tablero en caso de que se pase a un siguiente nivel
    //caso contrario pausara la musica y dara la informacion del usuario que jugo.
    function siguienteNivel(){
        let niveles = document.getElementById("niveles");
        niveles.innerHTML = "";
        tablero.innerHTML = "";
        if (casilleros == 20){
            let nombre = document.getElementById("input_name").value;
            setTimeout(function(){
                document.querySelector('#game').pause();
                document.querySelector('audio').pause();
                document.querySelector('#winner').play();
                niveles.innerHTML = "Felicidades " + nombre + " lograste terminar el juego!" + " Cantidad de errores: " + cantErrores;
            }, 500);
        }else{
            fichas.length = 0;
            tablero.innerHTML = "";
            casilleros = casilleros + 4;
            segundos+=750;
            nivel();
            setTimeout(function(){
                generarTablero();
            }, 1000);
        }
    }

    let level = 2;
    function nivel(){
        let niveles = document.getElementById("niveles");
        //tablero.style.display = "none";
        niveles.innerHTML = "";
        let palabra =  str => {
            let newArr = str.split('');
            let i = 0;
            let printnStr = setInterval(function(){
                niveles.innerHTML += newArr[i];
                i++;
                if(i == newArr.length){
                    clearInterval(printnStr);
                }
            }, 50);
        }
        palabra('Nivel ' + (level++));
    }

    function gameOver(){
        let niveles = document.getElementById("niveles");
        niveles.innerHTML = "";
        tablero.innerHTML = "";
            let nombre = document.getElementById("input_name").value;
                document.querySelector('#game').pause();
                document.querySelector('audio').pause();
                document.querySelector('#winner').play();
                niveles.innerHTML = "Has perdido " + nombre + " se terminaron las vidas :C " ;
    }      
}