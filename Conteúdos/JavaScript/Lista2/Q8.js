const prompt = require('prompt-sync')();

function contarNumeros(array, valor) {
    let contador = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === valor) {
            contador++;
        }
    }
    return contador;
}

let arrayExemplo = [1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4];
let valorExemplo = 3;
console.log(contarNumeros(arrayExemplo, valorExemplo));

