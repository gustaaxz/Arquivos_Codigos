const prompt = require('prompt-sync')();

const conta = {
    titular: "Gustavo",
    saldo: 0,

    depositar: function(valor) {
        if (valor > 0) {
            this.saldo += valor;
            console.log(`Depósito de R$${valor} realizado com sucesso.`);
        } else {
            console.log("Valor de depósito inválido.");
        }
    },

    sacar: function(valor) {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            console.log(`Saque de R$${valor} realizado com sucesso.`);
        } else {
            console.log("Saldo insuficiente ou valor inválido.");
        }
    },

    verSaldo: function() {
        return `Titular: ${this.titular} | Saldo Atual: R$${this.saldo.toFixed(2)}`;
    }
};

conta.depositar(500);
conta.sacar(200);
console.log(conta.verSaldo());
