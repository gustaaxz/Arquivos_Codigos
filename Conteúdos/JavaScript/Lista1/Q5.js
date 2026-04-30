const prompt = require('prompt-sync')();

let ano = 0;
    ano = Number(prompt("Qual o ano que deseja verificar?: "));

    if(ano % 4 == 0 && ano % 400 == 0) {
        console.log("O ano é bissexto")
    } else {
        console.log("O ano não é bissexto")
    }