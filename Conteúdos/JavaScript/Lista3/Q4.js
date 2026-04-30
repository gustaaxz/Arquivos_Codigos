const prompt = require('prompt-sync')();

let numero = Number(prompt('Digite um número: '));

function numeroMaiorQueVinte(n){
    if (n > 20) {
        console.log("Metade do Número: " + n / 2);
    } else {
        console.log("O número não é maior que 20.")
    }
}

numeroMaiorQueVinte(numero)