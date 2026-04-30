// ==========================================================================
// Exercício 1: Salvando e Recuperando Dados (Nome)
// ==========================================================================
const inputNome = document.getElementById('input-nome');
const btnSalvarNome = document.getElementById('btn-salvar-nome');
const divBoasVindas = document.getElementById('boas-vindas-mensagem');

// Função auxiliar para exibir o nome na tela
function exibirBoasVindas(nome) {
    divBoasVindas.innerHTML = `<p>Bem-vindo(a), <strong>${nome}</strong>!</p>`;
}

// Ao clicar no botão "Salvar Nome"
btnSalvarNome.addEventListener('click', () => {
    const nome = inputNome.value;
    if (nome) {
        // EXERCÍCIO: Salve a variável 'nome' no Local Storage usando a chave "nome"
        // Seu código aqui:
        localStorage.setItem("nome", nome);

        // Atualiza a tela e limpa o input
        exibirBoasVindas(nome);
        inputNome.value = '';
    }
});

// Ao carregar a página
window.addEventListener('load', () => {
    // EXERCÍCIO: Recupere o nome do Local Storage
    // const nomeSalvo = ...
    const nomeSalvo = localStorage.getItem("nome");
    console.log(nomeSalvo)
    
    // Se existir um nome salvo, exibe a mensagem de boas-vindas
     if (nomeSalvo) {
         exibirBoasVindas(nomeSalvo);
     }
});

// ==========================================================================
// Exercício 3: Contador de Visitas
// ==========================================================================
const spanContador = document.getElementById('contador-visitas');

// Ao carregar a página
window.addEventListener('load', () => {
    let visitas = 0;

    // EXERCÍCIO: Recupere o número de visitas do Local Storage (se não existir, comece com 0)
    // Dica: O valor retornado é uma string, você pode precisar converter para número
    // visitas = ...

    // EXERCÍCIO: Incremente o número de visitas e salve o novo valor no Local Storage
    // Seu código aqui:
    const visitasSalvas = localStorage.getItem("visitas");
    if(visitasSalvas) {
        visitas = parseInt(visitasSalvas);
    }

    visitas = visitas + 1;
    localStorage.setItem("visitas", visitas)

    // Atualiza o HTML com o valor
    spanContador.textContent = visitas;
});


// ==========================================================================
// Exercício 4: Escolha de Tema
// ==========================================================================
const btnTemaClaro = document.getElementById('btn-tema-claro');
const btnTemaEscuro = document.getElementById('btn-tema-escuro');

// Função auxiliar para alterar a classe do body
function alterarTema(tema) {
    document.body.className = tema;
    
    // EXERCÍCIO: Salve o 'tema' escolhido no Local Storage
    // Seu código aqui:
    localStorage.setItem("tema", tema);
}

// Eventos de clique nos botões
btnTemaClaro.addEventListener('click', () => alterarTema('claro'));
btnTemaEscuro.addEventListener('click', () => alterarTema('escuro'));

// Ao carregar a página
window.addEventListener('load', () => {
    // EXERCÍCIO: Recupere o tema do Local Storage
    // const temaSalvo = ...
    const temaSalvo = localStorage.getItem("tema");
    if(temaSalvo) {
        document.body.className = temaSalvo;
    }

    document.querySelector("#claro").addEventListener("click", () => alterarTema("claro"));
    document.querySelector("#escuro").addEventListener("click", () => alterarTema("escuro"));

    // Se existir um tema salvo, aplique-o
    if (temaSalvo) {
        document.body.className = temaSalvo;
    }
});
