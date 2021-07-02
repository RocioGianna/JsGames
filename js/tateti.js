document.addEventListener("DOMContentLoaded", cargarPagina);
function cargarPagina(){
    let start = document.getElementById("btn-start").addEventListener("click", () =>{
        //quitar visibilidad al boton comenzar
        let fondo = document.getElementById("fondo");
        fondo.style.display = "none";
        //dar visibilidad al boton reset
        let btnReset = document.getElementById("btn-reset");
            btnReset.style.display = "block";
        let board = document.getElementById("board");
            board.style.display = "flex";
        tablero();
    });

    function tablero(){
        let celdas = document.querySelectorAll(".board_divs");
        celdas.forEach(element => {
           element.addEventListener("click", ()=>{
                game(element, celdas);
            })
        });
    }

    let turno = true;
    let siguiente = true;
    function game(element, celdas){
        let oponente = document.getElementById("oponent_options").value;
        let emoji = document.getElementById("emoji_options").value;
        if (oponente == 1){
            if (turno){
                if (element.innerHTML == ""){
                    switch (emoji){
                        case "1":
                            element.innerHTML = "🔥";
                            break;
                        case "2":
                            element.innerHTML = "❌";
                            break;
                        case "3": 
                            element.innerHTML = "😍";
                        break;
                    }
                    winner(element);
                    turno = !turno;
                    robot(celdas);
                }
            }else{
                robot(celdas);
            }
        }else{
            if (turno){
                if (element.innerHTML == ""){
                    switch (emoji){
                        case "1":
                            element.innerHTML = "🔥";
                            break;
                        case "2":
                            element.innerHTML = "❌";
                            break;
                        case "3": 
                            element.innerHTML = "😍";
                            break;
                    }
                    winner(element);
                    turno = !turno;
                }
            }else{
                if (element.innerHTML == ""){
                    switch (emoji){
                        case "1":
                            element.innerHTML = "💧";
                        break;
                        case "2":
                            element.innerHTML = "⭕";
                        break;
                        case "3": 
                            element.innerHTML = "😡";
                        break;
                    }
                    winner(element);
                    turno = true;
                }
            }
        }
    }

    function robot (celdas){
        setTimeout(function(){
            let emoji = document.getElementById("emoji_options").value;
            if(siguiente){
                for (const key in celdas) {
                    let x = Math.floor(Math.random() * celdas.length);
                    if (celdas[x].innerHTML == ""){
                        switch (emoji){
                            case "1":
                                celdas[x].innerHTML = "💧";
                            break;
                            case "2":
                                celdas[x].innerHTML = "⭕";
                            break;
                            case "3": 
                                celdas[x].innerHTML = "😡";
                            break;
                        }
                        winner(celdas[x]);
                        turno = true;
                        return celdas[x];
                    }
                }
            }
        }, 800);
       
    }

    function winner(element){
        let win = [
            [cero_cero.innerHTML,uno_uno.innerHTML, dos_dos.innerHTML],
            [cero_dos.innerHTML,uno_uno.innerHTML, dos_cero.innerHTML],
            [cero_cero.innerHTML,cero_uno.innerHTML, cero_dos.innerHTML],
            [uno_cero.innerHTML,uno_uno.innerHTML, uno_dos.innerHTML],
            [dos_cero.innerHTML,dos_uno.innerHTML, dos_dos.innerHTML],
            [cero_dos.innerHTML,uno_dos.innerHTML, dos_dos.innerHTML],
            [cero_uno.innerHTML,uno_uno.innerHTML, dos_uno.innerHTML],
            [cero_cero.innerHTML,uno_cero.innerHTML, dos_cero.innerHTML]
        ]
        for (const i in win) {
            checkWin(win[i]);
        }
    }

    function checkWin(param){
        let div = document.getElementById("div");
        if (param[0] !== ""){
            if ((param[0] == param[1]) && (param[0] == param[2])){
                div.classList.remove("hide");
                div.classList.add("show");
               let ganador = document.createElement("p");
                    ganador.innerHTML = ("gano" + param[0] + "!!");
                    div.appendChild(ganador);
                siguiente = false;
                return siguiente;
            }
        }
    }

    document.getElementById("btn-reset").addEventListener("click", reset);
    function reset(){
        let fondo = document.getElementById("fondo");
            fondo.style.display = "flex";
        let div = document.getElementById("div");
            div.innerHTML = "";
            div.classList.remove("show");
            div.classList.add("hide");
        let celdas = document.querySelectorAll(".board_divs");
            celdas.forEach(element => {
                element.innerHTML = "";
            });
        let btnReset = document.getElementById("btn-reset");
            btnReset.style.display = "none";
        let board = document.getElementById("board");
            board.style.display = "none";
        siguiente = true;
    }
}


