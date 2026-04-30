const prompt = require('prompt-sync')();

let frutas = ["maçã", "banana", "laranja"];

// 1. Imprima o segundo elemento do array frutas.
console.log(frutas[1]);

// 2. Adicione "manga" ao final do array frutas.
frutas.push("manga");

// 3. Remova o primeiro elemento do array frutas.
frutas.shift();

// 4. Verifique o tamanho do array frutas.
console.log(frutas.length);

// 5. Crie um loop for que percorre o array frutas e imprime cada fruta.
for (let i = 0; i < frutas.length; i++) {
    console.log(frutas[i]);
}

// 6. Use o método forEach para imprimir cada elemento do array frutas.
frutas.forEach(fruta => console.log(fruta));

// 7. Use o método map para criar um novo array que tem o tamanho de cada fruta do array frutas.
let tamanhos = frutas.map(fruta => fruta.length);
console.log(tamanhos);

// 8. Use o método filter para criar um novo array que contém apenas as frutas do array frutas que tem mais de 5 caracteres.
let frutasLongas = frutas.filter(fruta => fruta.length > 5);
console.log(frutasLongas);

// 9. Use o método reduce para calcular a soma dos números em um array.
let numeros = [10, 20, 30, 40];
let soma = numeros.reduce((acumulador, atual) => acumulador + atual, 0);
console.log(soma);
