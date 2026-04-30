const prompt = require('prompt-sync')();

let num1 = Number(prompt('Digite um número: '));
let num2 = Number(prompt('Digite outro número: '));

function lerNumerosInteiros(num1, num2) {
    if(num1 + num2 > 10) {
        console.log("O resultado da soma é maior que 10: " + (num1 + num2))
    } else {
        console.log("O resultado da soma é menor que 10: " + (num1 + num2))
    }
}

lerNumerosInteiros(num1, num2)