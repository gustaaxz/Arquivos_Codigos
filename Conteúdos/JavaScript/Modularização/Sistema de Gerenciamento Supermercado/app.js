import promptSync from 'prompt-sync';
import { add, remove, edit, list, search, updateStorage } from './funcionalidades/index.js';

const prompt = promptSync();

const introducao = `
======================================
  📦 SISTEMA DE ESTOQUE SUPERMERCADO
======================================
1. Adicionar Novo Produto
2. Listar Todos os Produtos
3. Buscar Produto por Nome
4. Editar Informações de um Produto
5. Registrar Entrada/Saída de Estoque
6. Remover Produto
0. Sair do Sistema
======================================
`;

let escolha = 1;

while (escolha != 0) {
    console.log(introducao);
    escolha = Number(prompt("Escolha uma opção: "));

switch (escolha) {
    case 1:
        console.clear()
        add();
        break;

    case 2:
        list();
        break;

    case 3:
        console.clear()
        const nomeParaBuscar = prompt("Qual o nome do produto que deseja buscar?: ")
        const resultados = search(nomeParaBuscar);

        if(resultados.length > 0) {
            console.log("\n🔍 Produto(s) Encontrado(s): ")
            console.table(resultados);
        } else {
            console.log("\n❌ Nenhum produto encontrado.");
        }
    break;

    case 4:
        console.clear()
            const id = Number(prompt("ID do produto: "));
            const nome = prompt("Novo nome: ");
            const marca = prompt("Nova marca: ");
            const categoria = prompt("Nova categoria: ");
            const preco = Number(prompt("Novo preço: "));

            const sucesso = edit(id, { nome, marca, categoria, preco });
            if (sucesso) {
                console.log("✅ Produto editado!");
            } else {
                console.log("❌ Produto não encontrado!");
            }
        break;

    case 5:
        console.clear()
        updateStorage();
        break;

    case 6:
        console.clear()
        const idParaRemover = Number(prompt("Qual o ID do produto que deseja remover?: "))
        const removido = remove(idParaRemover);

        if(removido) {
            console.log("✅ Produto removido com sucesso!");
        } else {
            console.log("❌ Erro: Produto não encontrado.");
        }
        break;

    case 0 :
        console.log("Saindo do sistema...")
        setTimeout(() => {
            process.exit();
        }, 1500);
        break;

    default:
        console.log("Opção inválida!");
        break;
    }
}