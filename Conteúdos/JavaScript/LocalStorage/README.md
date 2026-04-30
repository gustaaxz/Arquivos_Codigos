# **8.8 - Web Storage e Local Storage no JavaScript**

O **Web Storage** é uma API nativa do navegador que permite armazenar dados de forma simples, persistente e eficiente diretamente no navegador do usuário. Ele inclui dois principais métodos de armazenamento:

- **Local Storage**: Armazenamento persistente.
- **Session Storage**: Armazenamento temporário (duração da sessão).

Neste material, vamos nos concentrar no **Local Storage**, ideal para salvar dados que precisam permanecer disponíveis mesmo após o usuário fechar e reabrir o navegador.

---

## **O que é Local Storage?**

O **Local Storage** permite armazenar dados no navegador do cliente em forma de pares chave-valor. Os dados persistem até que sejam explicitamente apagados pelo código ou pelo usuário.

### **Características do Local Storage:**

- **Persistente:** Os dados permanecem salvos mesmo após o navegador ser fechado.
- **Capacidade:** Aproximadamente 5MB por domínio, dependendo do navegador.
- **Simples:** Utiliza um formato de pares chave-valor.
- **Acesso Síncrono:** Diferentemente de APIs baseadas em Promises, a leitura e escrita no Local Storage é imediata.

---

## **Usos do Local Storage**

O Local Storage é útil para:

1. Armazenar preferências do usuário (temas, configurações, etc.).
2. Salvar o progresso em um formulário.
3. Gerenciar dados simples em aplicativos web offline.

---

## **Métodos do Local Storage**

O Local Storage possui uma interface simples e intuitiva:

### **1. `setItem(chave, valor)`**

Armazena um valor associado a uma chave.

```jsx
localStorage.setItem("nome", "João");
localStorage.setItem("idade", "30");
```

### **2. `getItem(chave)`**

Recupera o valor associado a uma chave.

```jsx
const nome = localStorage.getItem("nome");
console.log(nome); // Saída: João
```

### **3. `removeItem(chave)`**

Remove a chave e o valor associados.

```jsx
localStorage.removeItem("idade");
```

### **4. `clear()`**

Remove todos os dados armazenados.

```jsx
localStorage.clear();
```

### **5. `key(index)`**

Retorna a chave no índice especificado.

```jsx
localStorage.setItem("cidade", "São Paulo");
console.log(localStorage.key(0)); // Saída: nome (ou outra chave, dependendo da ordem)
```

### **6. `length`**

Retorna o número de itens armazenados.

```jsx
console.log(localStorage.length); // Saída: número total de chaves armazenadas
```

---

## **Armazenando Objetos no Local Storage**

O Local Storage armazena dados apenas como strings. Para armazenar objetos, usamos **JSON.stringify** e, para recuperar, **JSON.parse**.

### **Exemplo:**

```jsx
const usuario = {
  nome: "João",
  idade: 30,
  cidade: "São Paulo",
};

// Convertendo para string JSON e armazenando
localStorage.setItem("usuario", JSON.stringify(usuario));

// Recuperando e convertendo de volta para objeto
const dadosUsuario = JSON.parse(localStorage.getItem("usuario"));
console.log(dadosUsuario.nome); // Saída: João
```

---

## **Exemplo Prático**

### **Salvar Preferências do Usuário**

Imagine que você deseja salvar o tema escolhido pelo usuário (claro ou escuro):

```jsx
// Função para alterar o tema
function alterarTema(tema) {
  document.body.className = tema;
  localStorage.setItem("tema", tema);
}

// Recuperar tema ao carregar a página
const temaSalvo = localStorage.getItem("tema");
if (temaSalvo) {
  document.body.className = temaSalvo;
}

// Aplicar tema ao clicar em botões
document.querySelector("#claro").addEventListener("click", () => alterarTema("claro"));
document.querySelector("#escuro").addEventListener("click", () => alterarTema("escuro"));
```

---

## **Limitações do Local Storage**

1. **Capacidade limitada:** Aproximadamente 5MB.
2. **Texto apenas:** Não suporta armazenamento de arquivos binários diretamente.
3. **Acesso síncrono:** Pode causar lentidão em operações grandes.
4. **Segurança:** Os dados não são criptografados; evite armazenar informações sensíveis.

---

## **Comparação com Session Storage**

Embora ambos sejam parte da API de Web Storage, existem diferenças importantes:

| **Aspecto** | **Local Storage** | **Session Storage** |
| --- | --- | --- |
| **Persistência** | Dados persistem após o fechamento do navegador. | Dados são apagados quando a aba é fechada. |
| **Capacidade** | ~5MB por domínio. | ~5MB por domínio. |
| **Uso** | Dados duradouros (ex.: preferências de usuário). | Dados temporários (ex.: progresso em um formulário). |

---

## **Exercícios Práticos**

1. **Salvando e Recuperando Dados:**
    - Crie uma página que permita salvar o nome do usuário no Local Storage e exiba uma mensagem de boas-vindas ao recarregar a página.
2. **Lista de Tarefas:**
    - Implemente uma lista de tarefas onde as tarefas adicionadas pelo usuário sejam salvas no Local Storage.
3. **Contador de Visitas:**