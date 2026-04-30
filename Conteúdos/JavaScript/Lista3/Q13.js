const prompt = require('prompt-sync')();

function calcularInvestimento(capital, taxa, tempo) {
    let taxaDecimal = taxa / 100;
    let montante = capital * Math.pow((1 + taxaDecimal), tempo);
    return montante.toFixed(2);
}

let capital = parseFloat(prompt("Informe o capital inicial: "));
let taxa = parseFloat(prompt("Informe a taxa de juros mensal (%): "));
let tempo = parseInt(prompt("Informe o tempo em meses: "));

let resultado = calcularInvestimento(capital, taxa, tempo);
console.log(`\nO montante final após ${tempo} meses será de R$ ${resultado}`);
