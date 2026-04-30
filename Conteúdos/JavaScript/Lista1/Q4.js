const prompt = require('prompt-sync')();

let numero = Number(prompt("Qual o número que deseja fatorar?: "));
    let resultado = 1; 

    for (let i = 1; i <= numero; i++) {
        resultado *= i; 
    }

    console.log("O fatorial de " + numero + " é: " + resultado);