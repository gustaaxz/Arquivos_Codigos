const prompt = require('prompt-sync')();

function verificarIdade(idade) {
    if (idade < 16) {
        console.log("Não-leitor")
    } else if (idade >= 18 && idade <= 65) {
        console.log("Eleitor obrigatório")
    } else {
        console.log("Eleitor facultativo")
    }
}

const idadeInput = parseInt(prompt("Digite sua idade: "))
verificarIdade(idadeInput);