const prompt = require('prompt-sync')();

const carro = {
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2020,

    getIdade: function() {
        const anoAtual = new Date().getFullYear();
        return anoAtual - this.ano;
    },

    getDescricao: function() {
        return `Marca: ${this.marca}, Modelo: ${this.modelo}, Ano: ${this.ano}`;
    }
};

// 1. Acesse a propriedade marca
console.log(carro.marca);

// 2. Altere a propriedade ano para 2025
carro.ano = 2025;

// 3. Testando o método getIdade
console.log(carro.getIdade());

// 4. Testando o método getDescricao
console.log(carro.getDescricao());
