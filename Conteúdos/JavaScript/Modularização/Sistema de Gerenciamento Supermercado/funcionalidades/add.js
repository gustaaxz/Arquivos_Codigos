import { estoque } from '../estoque.js'
import promptSync from 'prompt-sync';
import { updateStorage } from './updateStorage.js';
const prompt = promptSync();

export function add() {
    let id = estoque.length + 1;

    console.log(`\nID gerado: ${id}`);
    let nome = prompt("Qual o nome do produto?: ");
    let marca = prompt("Qual a marca do produto?: ");
    let categoria = prompt("Qual a categoria do produto?: ");
    let preco = Number(prompt("Qual o preço do produto?: R$ "));
    let quantidade = Number(prompt("Qual a quantidade do produto?: "));

    const novoProduto = { id, nome, marca, categoria, preco, quantidade };
    estoque.push(novoProduto);
    updateStorage();

    console.log("✅ Produto adicionado!\n");
}
