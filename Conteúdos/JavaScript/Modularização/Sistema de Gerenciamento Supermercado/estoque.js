import fs from 'fs';
let dadosIniciais = [];
// Verifica se o arquivo já existe para não dar erro na primeira vez
if (fs.existsSync('./estoque.json')) {
    const conteudo = fs.readFileSync('./estoque.json', 'utf-8');
    dadosIniciais = JSON.parse(conteudo);
}
export const estoque = dadosIniciais;