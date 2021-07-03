
    document.getElementById("btn").addEventListener ("click", chequearLetra);
    document.getElementById("btnA").addEventListener ("click", chequearPalabra);
    
    //variables
    let max = 6;
    let num = Math.floor(Math.random() * max + 1);
    if(num == 0){
        num = Math.floor(Math.random() * max + 1);
    }
    const url = ("https://60db59a1801dcb00172910c4.mockapi.io/api/palabras/animales/" + num);
    let vida = 3;
    let p;
    let arrayL = [];
    const dis = document.getElementById("display"); 
    
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