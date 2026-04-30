const prompt = require('prompt-sync')();

let numero = Number(prompt("Qual o número de 1 a 30 que você deseja verificar?: "));

if (numero % 3 == 0) {
    console.log("Fizz")
} else if (numero % 5 == 0) {
    console.log("Buzz")
} else if (numero % 3 == 0 && numero % 5 == 0) {
    console.log("FizzBuzz")
} else {
    console.log(numero)
}