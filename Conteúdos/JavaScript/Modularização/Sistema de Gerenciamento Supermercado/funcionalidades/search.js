import { estoque } from '../estoque.js';

export function search(nomeProcurado){
    const produtos = estoque.filter(p => 
        p.nome.toLowerCase().includes(nomeProcurado.toLowerCase())
    );
    return produtos;
}
