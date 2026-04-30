// Personalizar Nome

const nome = document.getElementById("nome-input");
const cartaoNome = document.getElementById("cartao-nome");

nome.addEventListener("input", function() {
    cartaoNome.textContent = nome.value;
});

// Personalizar Cor de Fundo do Cartão

const corFundo = document.getElementById("cartao");
const botaoCorAzul = document.getElementById("btn-azul");
const botaoCorVerde = document.getElementById("btn-verde");

botaoCorAzul.addEventListener("click", function() {
    corFundo.classList.add("fundo-azul");
    corFundo.classList.remove("fundo-verde");
});

botaoCorVerde.addEventListener("click", function() {
    corFundo.classList.add("fundo-verde");
    corFundo.classList.remove("fundo-azul");
});

// Alterar Estilo da Fonte

const fonteNova = document.getElementsByClassName("cartao");
const botaoFonte = document.getElementById("btn-fonte");

botaoFonte.addEventListener("click", function(){
    corFundo.classList.toggle("fonte-alternativa")
});

// Alterar Foto de Perfil do Cartão

const imagem = document.getElementById("cartao-img");
const selecionarImagem = document.getElementById("imagem-select");
    
selecionarImagem.addEventListener("change", function(){
    imagem.src = selecionarImagem.value;
});


// Adicionar Habilidades

const habilidadeNova = document.getElementById("habilidade-input");
const botaoAdicionar = document.getElementById("btn-adicionar");
const listaHabilidades = document.getElementById("lista-habilidades");

botaoAdicionar.addEventListener("click", function() {
    const novaHabilidade = document.createElement("li");
    novaHabilidade.textContent = habilidadeNova.value;
    listaHabilidades.appendChild(novaHabilidade);
});