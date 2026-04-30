const prompt = require('prompt-sync')();

function filtrarNumeros(array, num) {
    let resultado = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] > num) {
            resultado.push(array[i]);
        }
    }
    return resultado;
}

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let num = 4;
console.log(filtrarNumeros(array, num));
