import puppeteer from "puppeteer";
import fs from "fs"

// "nacho_hz.ok"
// "juanmiputaloka"

// "brtuca"
// "unjaimito"
// "limonada1"


//ingrese usuario:
const user = "unajaimita"
//ingrese contraseña:
const password = "limonada1"
// perfil de instagram:
const IgProfile = "https://www.instagram.com/argentismo/?hl=es-la"

// modo 1: extraer seguidos
// modo 2: extraer seguidores
let modo= 2;

//botones:
const boton = '[class=" _acan _acap _acas _aj1- _ap30"]'; //"iniciar sesion"
const btnSeguidos = '[href="/brtuca/following/?hl=es-la"]';
const btnSeguidores = '[class="x1i10hfl xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz _alvs _a6hd"]';

//contadores
let contNick=0;
let cantRequerida=300;


const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
})

const page= await browser.newPage()

await page.goto('https://instagram.com')    //entro al sitio web

await page.waitForSelector('[aria-label="Teléfono, usuario o correo electrónico"]');
await page.type('[aria-label="Teléfono, usuario o correo electrónico"]', user, { delay: 10 });

// busco el input de contrasena
await page.waitForSelector('[aria-label="Contraseña"]');
await page.type('[aria-label="Contraseña"]', password);
await page.click(boton) //clickeo el boton siguiente
console.log("inicio de sesion realizado.");

await new Promise(r=> setTimeout(r, 6000))

await page.goto(IgProfile)    //entro al perfil y seguidos
console.log("ingreso a la cuenta realizado");
await new Promise(r=> setTimeout(r, 1000))
await scrollDown();

if(modo==1){
    console.log("click en seguidos");
    await page.waitForSelector(btnSeguidos);
    await page.click(btnSeguidos);
    console.log("entre a seguidos");
}
if(modo==2){
    await page.waitForSelector(btnSeguidores);
    await page.click(btnSeguidores);
    console.log("entre a seguidores");
}

await new Promise(r=> setTimeout(r, 70000))
console.log("10seg")
await new Promise(r=> setTimeout(r, 7000))
console.log("3seg")
await new Promise(r=> setTimeout(r, 1000))
console.log("2seg")
await new Promise(r=> setTimeout(r, 1000))
console.log("1seg")
await new Promise(r=> setTimeout(r, 1000))

await page.waitForSelector('[class="xyi19xy x1ccrb07 xtf3nb5 x1pc53ja x1lliihq x1iyjqo2 xs83m0k xz65tgg x1rife3k x1n2onr6"]');
await page.click('[class="xyi19xy x1ccrb07 xtf3nb5 x1pc53ja x1lliihq x1iyjqo2 xs83m0k xz65tgg x1rife3k x1n2onr6"]');

const listNick = await page.$$('[class="x1dm5mii x16mil14 xiojian x1yutycm x1lliihq x193iq5w xh8yej3"]')
// await scrollDown();
console.log("scrolleo");

//creo un .txt
fs.writeFileSync('nombres.txt', '');
console.log("se creo el .txt")

// while(contNick<=cantRequerida){
    for (const nick of listNick){
    
        // await new Promise(r=> setTimeout(r, 500))
        const objetoNick = await nick.$('[class="_ap3a _aaco _aacw _aacx _aad7 _aade"]')

        const getNick = await page.evaluate(objetoNick => objetoNick.innerText, objetoNick);
        contNick++;

        fs.appendFileSync('nombres.txt', getNick + '\n');
        console.log("cant escritas:",contNick);
        console.log("nombre:",getNick);
        // await page.click('[class="xyi19xy x1ccrb07 xtf3nb5 x1pc53ja x1lliihq x1iyjqo2 xs83m0k xz65tgg x1rife3k x1n2onr6"]');
        // await scrollDown();
        // console.log("-----> scrolleo FOR");
    }
    
// }   
console.log("se escribieron: ",contNick, " nombres en nombres.txt")
// await browser.close()   //cierro sitio web


//funcion para hacer scroll
async function scrollDown() {
    await page.evaluate(() => {
        
        new Promise(r=> setTimeout(r, 3000))
        const scrollingElement = document.scrollingElement || document.documentElement;
        scrollingElement.scrollTop += 6000; // Ajusta el valor según sea necesario
    });
}