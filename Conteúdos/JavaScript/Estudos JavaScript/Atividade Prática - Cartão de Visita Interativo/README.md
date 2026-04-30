# Atividade Prática: Cartão de Visita Interativo

**Objetivo:** Aplicar os principais métodos de manipulação do DOM para criar um cartão de visita que o usuário pode personalizar em tempo real.

### **Passo 1: Prepare o Ambiente**

Crie três arquivos na mesma pasta: `index.html`, `style.css`, e `script.js`.

1. **`index.html`**: Cole o código da estrutura abaixo.HTML
    
    ```jsx
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>DOM - Cartão Interativo</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
    
      <div class="container">
        <div class="controles">
          <h2>Personalize seu Cartão</h2>
    
          <label for="nome-input">Seu Nome:</label>
          <input type="text" id="nome-input" placeholder="Digite seu nome aqui">
    
          <label>Cor de Fundo:</label>
          <button id="btn-azul" class="btn-cor">Azul</button>
          <button id="btn-verde" class="btn-cor">Verde</button>
    
          <label>Estilo da Fonte:</label>
          <button id="btn-fonte">Alternar Fonte</button>
    
          <label for="imagem-select">Escolha um Ícone:</label>
          <select id="imagem-select">
            <option value="icones/dev.png">Desenvolvedor(a)</option>
            <option value="icones/designer.png">Designer</option>
          </select>
    
          <label>Adicionar Habilidade:</label>
          <input type="text" id="habilidade-input" placeholder="Ex: HTML5">
          <button id="btn-adicionar">Adicionar</button>
        </div>
    
        <div class="cartao-container">
          <div id="cartao" class="cartao">
            <img id="cartao-img" src="icones/dev.png" alt="Ícone Profissão">
            <h3 id="cartao-nome">Seu Nome</h3>
            <ul id="lista-habilidades">
              <li>JavaScript</li>
              <li>DOM</li>
            </ul>
          </div>
        </div>
      </div>
    
      <script src="script.js"></script>
    </body>
    </html>
    ```
    
2. **`style.css`**: Cole o CSS abaixo para dar estilo ao projeto.CSS
    
    ```jsx
    /* (Estilos gerais para a página) */
    body { font-family: sans-serif; background-color: #f4f4f9; display: flex; justify-content: center; align-items: center; height: 100vh; }
    .container { display: flex; gap: 40px; }
    .controles { display: flex; flex-direction: column; gap: 10px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
    label { font-weight: bold; margin-top: 10px; }
    input, select, button { padding: 8px; border-radius: 4px; border: 1px solid #ccc; }
    button { cursor: pointer; background-color: #007bff; color: white; border: none; }
    button:hover { opacity: 0.9; }
    
    /* (Estilos do Cartão) */
    .cartao-container { perspective: 1000px; }
    .cartao { width: 300px; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: all 0.3s ease; }
    .cartao img { max-width: 80px; border-radius: 50%; display: block; margin: 0 auto 15px; }
    .cartao h3 { text-align: center; margin-bottom: 20px; }
    .cartao ul { list-style: none; padding: 0; }
    .cartao li { background-color: rgba(255, 255, 255, 0.3); padding: 5px 10px; border-radius: 5px; margin-bottom: 5px; text-align: center; }
    
    /* (Classes para manipulação via JS) */
    .fonte-alternativa { font-family: 'Courier New', Courier, monospace; }
    .fundo-azul { background: linear-gradient(135deg, #74ebd5, #ACB6E5); color: #002661; }
    .fundo-verde { background: linear-gradient(135deg, #a8ff78, #78ffd6); color: #0a3d04; }
    ```
    
3. **`script.js`**: Este arquivo estará em branco. É aqui que a mágica acontece!

### **Passo 2: Mãos à Obra!**

No arquivo `script.js`, complete as seguintes tarefas de manipulação do DOM.

**Tarefas:**

1. **Alterar o Nome:**
    - Selecione o campo de input `#nome-input` e o `<h3>` com id `#cartao-nome`.
    - Adicione um evento `input` ao campo de texto. Toda vez que o usuário digitar algo, o texto dentro do `#cartao-nome` deve ser atualizado em tempo real.
2. **Mudar a Cor de Fundo:**
    - Selecione o cartão (`#cartao`) e os botões de cor (`#btn-azul` e `#btn-verde`).
    - Adicione um evento de `click` ao botão azul que remove a classe `fundo-verde` (se existir) e adiciona a classe `fundo-azul` ao cartão.
    - Faça o mesmo para o botão verde, adicionando a classe `fundo-verde` e removendo `fundo-azul`.
3. **Alternar o Estilo da Fonte:**
    - Selecione o botão `#btn-fonte`.
    - Adicione um evento de `click` que usa `classList.toggle()` para adicionar/remover a classe `fonte-alternativa` do cartão.
4. **Mudar o Ícone:**
    - Selecione o `<select>` com id `#imagem-select` e a imagem `#cartao-img`.
    - Adicione um evento `change` ao `<select>`. Quando o usuário escolher uma nova opção, use `setAttribute()` para mudar o `src` da imagem para o valor da opção selecionada.
5. **Criar e Adicionar Habilidades:**
    - Selecione o input `#habilidade-input`, o botão `#btn-adicionar` e a lista `<ul>` com id `#lista-habilidades`.
    - Adicione um evento de `click` ao botão `#btn-adicionar`.
    - Dentro do evento, crie um novo elemento `<li>` com `document.createElement()`.
    - Defina o `textContent` do novo `<li>` para o valor do input de habilidade.
    - Adicione o novo `<li>` à lista de habilidades usando `appendChild()`.
    - **Bônus:** Limpe o campo de input depois de adicionar a habilidade.