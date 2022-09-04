
    document.getElementById("btnE").addEventListener("click", agregarPalabra);
    document.getElementById("btn").addEventListener ("click", chequearLetra);
    document.getElementById("btnA").addEventListener ("click", chequearPalabra);
    document.getElementById("btnAgregar").addEventListener("click", ()=>{
        let tematicas = document.getElementById("btnT");
        tematicas.classList.remove("btnTematicas");
        tematicas.classList.add("btnTematicasOn");
    });
    
    //variables
    let max = 1;
    let num = Math.floor(Math.random() * max + 1);
    if(num == 0){
        num = Math.floor(Math.random() * max + 1);
    }
    const url = ("https://60db59a1801dcb00172910c4.mockapi.io/api/palabras/palabra/" + num);
    let vida = 3;
    let p;
    let arrayL = [];
    const dis = document.getElementById("display"); 

    async function agregarPalabra(){
    const nueva_palabra = document.getElementById('inputPalabra').value;
        let data = {
            "palabra": nueva_palabra
        }
        console.log(data.palabra + "soy el objeto");
        let r = await fetch("https://60db59a1801dcb00172910c4.mockapi.io/api/palabras/palabra",{
            "method": 'POST', 
            "headers": {"Content-type": "aplication/json"},
            "body": JSON.stringify(data)
        })
        let json = await r.json();
        console.log(json);                                                                                                                                                               
    }
    async function getWord(url){
        const res = await fetch(url);
        const data = await res.json();
        p = data.palabra;
        setTimeout(showPalabra(p), 1000);
    }
    getWord(url);
    
    function showPalabra(p){
        console.log(p )
        for (i =0; i < p.length; i++){
            arrayL.push('*');
            dis.innerHTML += "___.";
        }
    }
// funciones de los botones
    function chequearLetra(){
    let res = document.getElementById("res");
    let inputLetra = document.getElementById("inputUsuario").value;
        
    console.log(arrayL);
    
    let bool = p.includes(inputLetra);
    console.log(bool)
    
    if(bool){
        for (i = 0; i < p.length; i++ ){
            if (p[i] == inputLetra && arrayL[i] == '*'){
                arrayL[i] = inputLetra; 
                console.log(arrayL[i]);
            }
        }console.log(arrayL);
    }
    res.innerHTML = "";
    for(let i = 0; i < arrayL.length; i++){
        res.innerHTML += arrayL[i];
    }
    
    }
    function chequearPalabra (){
    let inputLetra = document.getElementById("inputUsuario").value;
        if (inputLetra == p ){
            res.innerHTML = p;
        }
    }

