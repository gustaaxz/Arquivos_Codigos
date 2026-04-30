const prompt = require('prompt-sync')();

function criarArray(num) {
    let resultado = [];
    for (let i = 1; i <= num; i++) {
        resultado.push(i);
    }
    return resultado;
}

let numero = 10;
console.log(criarArray(numero));