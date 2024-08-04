import puppeteer from "puppeteer";

import fs from "fs";

//ingrese usuario:

// const user = "unajaimita"//BANEADO
// const user = "unjaimito"//BANEADO
// const user = "brtuca" //BANEADO
//const user = "ag.zzh"//BANEADO
// const user= "jamitoojajaxd"
const user= "calamaro.jota";
//ingrese contraseña:
const password = "limonada1"

// const user = "nacho_hz.ok"
// const password = "juanmiputaloka"

// ingrese link de la publicacion del sorteo
// const linkSorteo = "https://www.instagram.com/p/C8VUo0isQQl/?hl=es-la"
const linkSorteo = "https://www.instagram.com/p/C9-9O8XJhJC/?hl=es-la"


// ajustes-----------------------------
const cantArroba = 1; // ingrese cantidad de @ por comentario
let comentMax=300;      // el programa termina cuando llegue a [comentMax]
let objetivoCase1=3; // a cuantos comentarios debe llegarse para esperar [case1] minutos  //4
let objetivoCase2=10; // a cuantos comentarios debe llegarse para esperar [case2] minutos //12
let objetivoCase3=18; // a cuantos comentarios debe llegarse para esperar [case3] minutos //24


//rango 0
// segundos
const case0 = 35 * 1000// tiempo en SEG entre cada comentario
const case0B= 120 *1000

//rango 1
const case1 = 5 *60000; //cantidad de tiempo a esperar en caso1 minutos RECOMENDADO:5
const case1B= 13 *60000;
//rango 2
const case2 = 55 *60000; //cantidad de tiempo a esperar en caso2 minutos RECOMENDADO:20
const case2B = 70 *60000;
//rango 3
const case3 = 120 *60000; //cantidad de tiempo a esperar en caso3 minutos RECOMENDADO:35
const case3B = 400 *60000;
// ---------------------------------

//constantes
const botonInicio = '[class=" _acan _acap _acas _aj1- _ap30"]';
const nombres = fs.readFileSync('nombres.txt', 'utf8').trim().split('\n');
// const inputComentario = '[aria-label="Añade un comentario..."]';
const inputComentario = '[aria-label="Agrega un comentario..."]';


//variables
let SwitchTiempo // 


//contadores
let contEtiquetados = 0;
let contComentarios = 0;
let contComCase1 = 0;
let contComCase2 = 0;
let contComCase3 = 0;


//----------inicializo puppeteer--------
const browser = await puppeteer.launch({
    headless: false,
    slowMo: 45
})
const page= await browser.newPage()

await page.goto('https://instagram.com')    //entro al sitio web


await page.waitForSelector('[aria-label="Teléfono, usuario o correo electrónico"]');
await new Promise(r=> setTimeout(r, 764))
await page.type('[aria-label="Teléfono, usuario o correo electrónico"]', user, { delay: 10 });

// busco el input de contrasena
await page.waitForSelector('[aria-label="Contraseña"]');
await new Promise(r=> setTimeout(r, 864))
await page.type('[aria-label="Contraseña"]', password);
await page.click(botonInicio) //clickeo el boton siguiente
console.log("inicio de sesion realizado.");

await new Promise(r=> setTimeout(r, 15000))

await page.goto(linkSorteo)    //entro a la publicacion del sorteo
console.log("ingreso a la publicacion realizado.");
await page.waitForSelector(inputComentario);//selecciono input para comentar
await new Promise(r=> setTimeout(r, 796))

// vacio el sector de cometarios
await page.type(inputComentario, '1');
for (let i = 0; i < 50; i++) {
    
    await page.keyboard.press('Backspace');
  }

for (let nombre of nombres) {

    if(contComentarios==0){

        await page.type(inputComentario, `a ver si gano ago acaa`);
        const numaleator = Math.floor(Math.random() * (case0B - case0 + 1))+case0;
        await new Promise(r=> setTimeout(r, numaleator))
    }
    if (contComentarios % 4 === 0) {
        await page.type(inputComentario, `${nombre.trim()}`);
    } else {
        
        const numeroAleatorio = Math.floor(Math.random() * 10) + 1;
        await page.type(inputComentario, `Sorteo ${numeroAleatorio}, seguiloo porfa amigo @${nombre.trim()}`);
    }

    
    
    // await page.type(inputComentario, `${nombre.trim()}`);

    console.log("se estiqueto a 1 persona :",`${nombre.trim()}`)
    await new Promise(r=> setTimeout(r, 951))
    await page.keyboard.press('ArrowDown');
    await new Promise(r=> setTimeout(r, 606))
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter'); // Presionar Enter 
    await new Promise(r=> setTimeout(r, 726))

    contEtiquetados++;
    if(contEtiquetados==cantArroba){
        contComCase1 ++;
        contComCase2 ++;
        contComCase3 ++;

        contComentarios++
        await new Promise(r=> setTimeout(r, 120))
        await page.keyboard.press('Enter'); //---------------------------------- ENVIA EL COMENTARIO----------------------
        const rangoCase0 = Math.floor(Math.random() * (case0B - case0 + 1))+case0;
        console.log("se envió comentario. (Nro ", contComentarios, ")" ,"   esperado: ", rangoCase0/1000," segundos",);
        await new Promise(r=> setTimeout(r, rangoCase0))

        contEtiquetados=0;
    }

    if(contComCase3 == objetivoCase3){ // 6 comentarios     1   2   3   4   5   6   0
        SwitchTiempo=3;                // estado de switch:                         3   
        contComCase3=0;
        contComCase2=0;
        contComCase1=0;
    }
    if(contComCase2 == objetivoCase2){ // 4 comentarios     1   2   3   4   0   1   0
        SwitchTiempo=2;                // estado de switch:                 2
        contComCase2=0;
        contComCase1=0;
    }
    if(contComCase1 == objetivoCase1){ // 2 comentarios     1   2   0   1   0   1   0
        SwitchTiempo=1;                // estado de switch:         1                   
        contComCase1=0;
    }
    
    switch(SwitchTiempo){ 
        case 1:
            console.log("ingreso a SwitchTiempo case 1" )  
            const rangoCase1 = Math.floor(Math.random() * (case1B - case1 + 1))+case1;
            console.log("se hicieron: ","\x1b[31m",contComentarios, "\x1b[32m",  "   esperado: ", rangoCase1/60000, " minutos")
            await new Promise(r=> setTimeout(r, case1));
            SwitchTiempo=5;
        break;
        case 2:
            console.log("ingreso a SwitchTiempo case 2" )  
            const rangoCase2 = Math.floor(Math.random() * (case2B - case2 + 1))+case2;
            console.log("se hicieron: ","\x1b[31m",contComentarios, "\x1b[32m",  "   esperado: ", rangoCase2/60000, " minutos")
            await new Promise(r=> setTimeout(r, case2));
            SwitchTiempo=5;
        break;
        case 3:
            console.log("ingreso a SwitchTiempo case 3" ) 
            const rangoCase3 = Math.floor(Math.random() * (case3B - case3 + 1))+case3;
            console.log("se hicieron: ","\x1b[31m",contComentarios, "\x1b[32m",  "   esperado: ", rangoCase3/60000, " minutos")
            await new Promise(r=> setTimeout(r, case3));
            SwitchTiempo=5;
        break;
    }
    if(contComentarios>=comentMax){
        console.log("\x1b[31m","finalizó el programa")
        break;
    }
}

console.log("\x1b[32m" , "la cantidad de comentarios spameados fueron:", contComentarios);

await browser.close()   //cierro sitio web
