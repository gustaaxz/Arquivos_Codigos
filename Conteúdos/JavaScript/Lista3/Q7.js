const prompt = require('prompt-sync')();

function calcularVenda(){
    let valorCompra = Number(prompt("Qual o valor pago no produto?: "))
    let valorVenda;

    if (valorCompra < 20) {
        valorVenda = valorCompra* 1.45;
    } else {
        valorVenda = valorCompra * 1.30;
    }

    console.log("O valor da venda será R$: " + valorVenda.toFixed(2)) // Serve para limitar o número de casas decimais após a vírgula
}

calcularVenda()