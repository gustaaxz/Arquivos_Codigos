const prompt = require('prompt-sync')();

let palavra = " ";
    palavra = String(prompt("Qual palavra que você deseja verificar?: "));

    let palavraInvertida = palavra.split('').reverse().join('');

    if( palavra == palavraInvertida) {
        console.log("A palavra é palíndroma!");
    } else {
        console.log("A palavra não é palíndroma!");
    }