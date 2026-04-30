// Scroll da página enquanto segura feito por IA

let scrollSpeed = 0;
let scrollRAF = null;

// Função que roda em loop suave (60 vezes por segundo)
function smoothScroll() {
    if (scrollSpeed !== 0) {
        window.scrollBy(0, scrollSpeed);
        scrollRAF = requestAnimationFrame(smoothScroll);
    } else {
        scrollRAF = null; // Para o loop quando a velocidade é zero
    }
}

// Atualiza a velocidade baseado na posição do mouse enquanto arrasta
window.addEventListener('dragover', (e) => {
    e.preventDefault(); // Necessário para depois você conseguir soltar os itens (drop)

    const threshold = 150; // Distância da borda em pixels para começar a rolar
    const maxSpeed = 15;   // Velocidade máxima de rolagem (aumente ou diminua se quiser)

    if (e.clientY < threshold) {
        // Chegando no topo: quanto mais perto do 0, mais rápido
        const intensity = (threshold - e.clientY) / threshold;
        scrollSpeed = -(maxSpeed * intensity);
    } else if (window.innerHeight - e.clientY < threshold) {
        // Chegando na base: quanto mais perto do fim, mais rápido
        const intensity = (threshold - (window.innerHeight - e.clientY)) / threshold;
        scrollSpeed = maxSpeed * intensity;
    } else {
        // No meio da tela fica parado
        scrollSpeed = 0;
    }

    // Inicia a animação se não estiver rodando
    if (scrollSpeed !== 0 && !scrollRAF) {
        scrollRAF = requestAnimationFrame(smoothScroll);
    }
});

// Reseta a rolagem quando o usuário terminar de arrastar
window.addEventListener('dragend', () => {
    scrollSpeed = 0;
});
window.addEventListener('drop', () => {
    scrollSpeed = 0;
});

// Segurança: garante que pare de rolar caso o mouse saia da tela arrastando
document.addEventListener('dragleave', (e) => {
    if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        scrollSpeed = 0;
    }
});

// Permite usar a bolinha do mouse tranquilamente para rolar a página enquanto arrasta os itens
window.addEventListener('wheel', (e) => {
    if (draggedItem) {
        window.scrollBy(0, e.deltaY);
    }
}, { passive: true });

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// LÓGICA DE DRAG AND DROP (Arraste e Solte)

let draggedItem = null;

const games = document.querySelectorAll('.game');
const dropzones = document.querySelectorAll('.dropzone');

// Configurando os itens arrastáveis
games.forEach(game => {
    game.addEventListener('dragstart', function(e) {
        draggedItem = this;
        // Timeout para que a opacidade afete apenas o elemento original, 
        // e não a 'foto' fantasma que segue o mouse
        setTimeout(() => {
            this.style.opacity = '0.5';
            this.style.transform = 'scale(0.95)';
        }, 0);
    });

    game.addEventListener('dragend', function() {
        setTimeout(() => {
            this.style.opacity = '1';
            this.style.transform = 'none';
            draggedItem = null;
            updateTrashCounter();
        }, 0);
    });
});

// Configurando as áreas que podem receber os itens
dropzones.forEach(zone => {
    zone.addEventListener('dragenter', function(e) {
        e.preventDefault();
        // Dá um feedback visual sutil ao passar por cima
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });

    zone.addEventListener('dragover', function(e) {
        e.preventDefault(); // Obrigatório para o 'drop' funcionar
    });

    zone.addEventListener('dragleave', function() {
        // Tira o feedback visual
        this.style.backgroundColor = '';
    });

    zone.addEventListener('drop', function(e) {
        // Tira o feedback visual
        this.style.backgroundColor = '';
        
        // Joga o elemento do jogo para dentro desta dropzone
        if (draggedItem) {
            if (this.id === 'trash-btn') {
                document.getElementById('trash-dropzone').appendChild(draggedItem);
            } else {
                this.appendChild(draggedItem);
            }
        }
    });
});

// ==========================================
// INTERAÇÕES E LÓGICA DA LIXEIRA
// ==========================================

const trashModal = document.getElementById('trash-modal');
const trashBtn = document.getElementById('trash-btn');
const closeTrashBtn = document.getElementById('close-trash');
const trashDropzone = document.getElementById('trash-dropzone');
const trashCount = document.getElementById('trash-count');

// Atualiza o contador de jogos que estão dentro da lixeira
function updateTrashCounter() {
    // Garante que o contador mostre exatamente quantos filhos (jogos) a lixeira tem
    trashCount.innerText = trashDropzone.children.length;
}

// Abrir a lixeira ao clicar no botão
trashBtn.addEventListener('click', () => {
    // Só abre se não tiver estourado um clique acidental durante o "soltar" de um arraste
    if (!draggedItem) {
        trashModal.classList.remove('modal-hidden');
    }
});

// Fechar a lixeira ao clicar no X
closeTrashBtn.addEventListener('click', () => {
    trashModal.classList.add('modal-hidden');
});

// Fechar a lixeira ao clicar no fundo preto fora dela
document.querySelector('.trash-overlay').addEventListener('click', () => {
    trashModal.classList.add('modal-hidden');
});
