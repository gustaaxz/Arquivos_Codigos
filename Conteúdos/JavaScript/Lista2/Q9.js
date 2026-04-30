const prompt = require('prompt-sync')();

function contarVogais(str) {
    let contador = 0;
    const vogais = "aeiouAEIOU";
    
    for (let i = 0; i < str.length; i++) {
        if (vogais.includes(str[i])) {
            contador++;
        }
    }
    return contador;
}

let texto = "Esta é uma frase de exemplo. lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
console.log(contarVogais(texto));
