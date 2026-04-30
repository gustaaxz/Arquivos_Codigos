const prompt = require('prompt-sync')();

function receberNumeros(){
    let arrayNumeros = [0,1,2];
    arrayNumeros[0] = Number(prompt("Digite o primeiro número: "))
    arrayNumeros[1] = Number(prompt("Digite o segundo número: "));
    arrayNumeros[2] = Number(prompt("Digite o terceiro número: "))

    console.log(arrayNumeros.reverse());
}

receberNumeros();