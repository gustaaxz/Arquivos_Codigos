const prompt = require('prompt-sync')();

let temperatura = 0;

    temperatura = Number(prompt("Qual a temperatura em ºC ?: "));
    let fahrenheit = (temperatura * 1.8) + 32;

    console.log("A temperatura em ºF é: " + fahrenheit);