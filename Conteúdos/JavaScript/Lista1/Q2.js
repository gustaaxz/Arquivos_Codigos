const prompt = require('prompt-sync')();

let soma = 0;
for (let i = 0; i < 3; i++) {
  soma += Number(prompt("Qual a nota?: "));
}
let media = soma / 3; 
console.log("A sua média é: " + media);
if(media >= 7) {
    console.log("APROVADO!")
} 
if(media < 3) {
    console.log("REPROVADO OU EM EXAME!")
}