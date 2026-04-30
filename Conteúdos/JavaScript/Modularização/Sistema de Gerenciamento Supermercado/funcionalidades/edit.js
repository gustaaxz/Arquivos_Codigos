import { updateStorage } from './updateStorage.js';
import { estoque } from '../estoque.js';

export function edit(id, novosDados) {
    const index = estoque.findIndex(p => p.id === id);

    if (index !== -1) {
        // Atualiza apenas os campos permitidos
        estoque[index].nome = novosDados.nome;
        estoque[index].marca = novosDados.marca;
        estoque[index].categoria = novosDados.categoria;
        estoque[index].preco = novosDados.preco;

        updateStorage();
        return true;
    }
    return false;
}
