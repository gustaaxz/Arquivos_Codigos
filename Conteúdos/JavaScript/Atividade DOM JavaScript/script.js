const background = document.querySelector('#main'); // Mudando o Background
const title = document.querySelector('#title') // Mudando a Cor do Título
const paragraph = document.querySelector('#paragraph') // Mudando a Cor do Parágrafo
const title_font = document.querySelector('#title-font') // Mudando a Fonte do Título
const paragraph_font = document.querySelector('#paragraph-font') // Mudando a Fonte do Parágrafo
const all = document.querySelector('#all') // Mudando tudo para aleatório
const fontStyles = ['Bitcount Grid Double', 'Fjalla One', 'Inconsolata', 'Inter', 'Montserrat', 'Oswald', 'Outfit', 'Playfair Display', 'Playwrite NO', 'Poppins', 'Roboto Slab', 'Roboto', 'Saira', 'Sekuya', 'Spectral']
const counter = document.querySelector('#counter')
let contador = 0;

// Mudando o Background Color para RGB Aleatório
function background_color_rgb() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    background.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// Mudando a Cor do Título para RGB Aleatório
function title_color_rgb(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    title.style.color = `rgb(${r}, ${g}, ${b})`;
}

// Mudando a Cor do Parágrafo para RGB Aleatório
function paragraph_color_rgb(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    paragraph.style.color = `rgb(${r}, ${g}, ${b})`;
}

// Mudando a Fonte do Título
function font_style_title(){
    const aleatoryIndex = Math.floor(Math.random() * fontStyles.length)
    const styleFound = fontStyles[aleatoryIndex];

    title.style.fontFamily = styleFound;
}

// Mudando a Fonte do Parágrafo
function font_style_paragraph(){
    const aleatoryIndex = Math.floor(Math.random() * fontStyles.length)
    const styleFound = fontStyles[aleatoryIndex];

    paragraph.style.fontFamily = styleFound;
}

// Botões
const buttonBackground = document.querySelector('#background');
buttonBackground.addEventListener('click', background_color_rgb);

const buttonColorTitle = document.querySelector('#title-color');
buttonColorTitle.addEventListener('click', title_color_rgb);

const buttonParagraphColor = document.querySelector('#paragraph-color');
buttonParagraphColor.addEventListener('click', paragraph_color_rgb);

const buttonTitleFont = document.querySelector('#title-font');
buttonTitleFont.addEventListener('click', font_style_title);

const buttonParagraphFont = document.querySelector('#paragraph-font');
buttonParagraphFont.addEventListener('click', font_style_paragraph);

const buttonAll = document.querySelector('#all') // Definindo fazer TUDO quando clicar no botão "All"
buttonAll.addEventListener('click', background_color_rgb);
buttonAll.addEventListener('click', title_color_rgb);
buttonAll.addEventListener('click', paragraph_color_rgb);
buttonAll.addEventListener('click', font_style_title);
buttonAll.addEventListener('click', font_style_paragraph);

// Contadores
function add(){
    contador++
    counter.textContent = contador;
}

function minus(){
    contador--
    counter.textContent = contador;
}

const buttonAdd = document.querySelector('#add')
buttonAdd.addEventListener('click', add)

const buttonMinus = document.querySelector('#minus')
buttonMinus.addEventListener('click', minus)
// end
