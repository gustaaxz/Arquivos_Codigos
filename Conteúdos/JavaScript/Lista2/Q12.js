const prompt = require('prompt-sync')();

function numeroAleatorio() {
    return Math.floor(Math.random() * 100) + 1;
}

console.log(numeroAleatorio());
