const prompt = require('prompt-sync')();

function calcularMedia(numeros) {
    if (numeros.length === 0) return 0;
    let soma = 0;
    for (let i = 0; i < numeros.length; i++) {
        soma += numeros[i];
    }
    return soma / numeros.length;
}

console.log(calcularMedia([1, 2, 3, 4, 5]));