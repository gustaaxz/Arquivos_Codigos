import fs from 'fs'; // Importa o módulo de arquivos do Node
import { estoque } from '../estoque.js';

export function updateStorage() {
    // Transforma o array em texto (string) e salva num arquivo .json
    const dadosConvertidos = JSON.stringify(estoque, null, 2);

    fs.writeFileSync('./estoque.json', dadosConvertidos); // Escreve os dados dentro do arquivo JSON
}
