const prompt = require('prompt-sync')();

function contarCaracteres(texto, letra) {
    let contador = 0;
    for (let i = 0; i < texto.length; i++) {
        if (texto[i] === letra) {
            contador++;
        }
    }
    return contador;
}

let stringUsuario = prompt("Digite uma frase ou palavra: ");
let letraUsuario = prompt("Digite o caractere que deseja contar: ");

let resultado = contarCaracteres(stringUsuario, letraUsuario);
console.log(`\nO caractere "${letraUsuario}" aparece ${resultado} vezes na frase.`);
