const prompt = require('prompt-sync')();

function solicitarSalarioEPrestacao(){
    let salario = Number(prompt("Qual o salário?: "))
    let prestacao = Number(prompt("Qual o valor da prestação?: "))

    if(prestacao > salario * 0.20) {
        console.log("Empréstimo não pode ser concedido.")
    } else {
        console.log("Empréstimo pode ser concedido.")
    }
}

solicitarSalarioEPrestacao()