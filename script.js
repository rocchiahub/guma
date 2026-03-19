/* =========================================
   Sons e Interatividade Geral
   ========================================= */
const clickSound = new Audio('assets/click.mp3');
const hoverSound = new Audio('assets/hover.mp3');

function playSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.log("Som bloqueado pelo navegador até interação."));
}

// Troca de Seções
function showSection(sectionId) {
    playSound();

    const sections = document.querySelectorAll('section');
    sections.forEach(sec => sec.classList.remove('active'));

    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');
}

// Eventos de som no menu
document.querySelectorAll('.menu-blocks li').forEach(item => {
    item.addEventListener('mouseenter', () => {
        hoverSound.volume = 0.2;
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {}); 
    });
});

/* =========================================
   Lógica de Sorteio (GUMA Raffle)
   ========================================= */
function updateRaffleInfo() {
    const text = document.getElementById('participant-list').value;
    const participants = text.split(/[\n,]+/).map(p => p.trim()).filter(p => p !== "");
    const count = participants.length;

    document.getElementById('total-count').innerText = count;

    const suggestions = document.getElementById('group-suggestions');
    if (count > 1) {
        suggestions.innerHTML = `
            Possibilidades:
            <b>${Math.floor(count/2)}</b> duplas |
            <b>${Math.floor(count/3)}</b> trios |
            <b>${Math.floor(count/4)}</b> quartetos
        `;
    } else {
        suggestions.innerHTML = "";
    }
}

async function executeDraw() {
    const text = document.getElementById('participant-list').value;
    let participants = text.split(/[\n,]+/).map(p => p.trim()).filter(p => p !== "");
    const groupSize = parseInt(document.getElementById('group-size').value);
    const resultsContainer = document.getElementById('draw-results');

    if (participants.length < groupSize) {
        alert("Número de participantes insuficiente!");
        return;
    }

    resultsContainer.innerHTML = "";
    playSound();

    // Algoritmo Shuffle (Fisher-Yates)
    for (let i = participants.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [participants[i], participants[j]] = [participants[j], participants[i]];
    }

    let groupIndex = 1;
    for (let i = 0; i < participants.length; i += groupSize) {
        const group = participants.slice(i, i + groupSize);
        const card = document.createElement('div');
        card.className = 'group-card';
        card.style.animationDelay = `${(groupIndex * 0.2)}s`;

        let listHtml = `<h3>Grupo ${groupIndex}</h3><ul>`;
        group.forEach(member => listHtml += `<li>👤 ${member}</li>`);
        listHtml += `</ul>`;

        card.innerHTML = listHtml;
        resultsContainer.appendChild(card);
        groupIndex++;
        await new Promise(r => setTimeout(r, 100));
    }
}

/* =========================================
   Dados das Fotos
   ========================================= */
const fotosCasal = [
    { url: 'assets/foto2.JPG', nome: 'Gustavo ❤️ Gabriela' },
    { url: 'assets/foto3.JPG', nome: 'Gustavo ❤️ Dominik' },
    { url: 'assets/foto4.JPG', nome: 'Gustavo ❤️ Lina' },
    { url: 'assets/foto6.JPG', nome: 'Arthur M ❤️ Larissa Pires' },
    { url: 'assets/foto7.jpg', nome: 'Arthur M ❤️ Maria Luiza' },
    { url: 'assets/foto9.webp', nome: 'Enzo L ❤️ Anelize' },
    { url: 'assets/foto10.JPG', nome: 'Enzo D ❤️ Bianca Ohata' },
    { url: 'assets/foto12.jpg', nome: 'Gustavo ❤️ Tarsila' },
    { url: 'assets/foto13.jpg', nome: 'Lucca ❤️ Elisa' },
    { url: 'assets/foto15.JPG', nome: 'Arthur M ❤️ Isabella' },
    { url: 'assets/foto16.JPG', nome: 'Arthur M ❤️ Beatriz Pereira' },
    { url: 'assets/foto17.JPG', nome: 'Arthur M ❤️ Maria Eduarda Teixeira' },
    { url: 'assets/foto18.JPG', nome: 'Arthur M ❤️ Stephany' },
    { url: 'assets/foto19.JPG', nome: 'Gustavo ❤️ Yasmeen' },
    { url: 'assets/foto20.JPG', nome: 'Gustavo ❤️ Fernanda' },
    { url: 'assets/foto35.jpg', nome: 'Gustavo ❤️ Maysa' },
    { url: 'assets/foto34.jpg', nome: 'Gustavo ❤️ Anna Laura' },
    { url: 'assets/foto33.jpg', nome: 'Gustavo ❤️ Nicolly' },
    { url: 'assets/foto32.jpg', nome: 'Gustavo ❤️ Júlliah' },
    { url: 'assets/foto31.jpg', nome: 'Gustavo ❤️ Ana Júlia' },
    { url: 'assets/foto36.jpg', nome: 'Gustavo ❤️ Emilly' },
    { url: 'assets/foto37.jpg', nome: 'Gustavo ❤️ Melissa' },
    { url: 'assets/foto39.jpeg', nome: 'Gustavo ❤️ Sara' },
    { url: 'assets/foto40.jpeg', nome: 'Arthur M ❤️ Larissa Furtado' },
    { url: 'assets/foto41.jpeg', nome: 'Arthur M ❤️ Luiza' },
    { url: 'assets/foto42.jpg', nome: 'Arthur M ❤️ Luciana' },
];

const fotosBeijo = [
    { url: 'assets/foto21.jpg', nome: 'Gustavo 💋 Gabriela' },
    { url: 'assets/foto22.jpg', nome: 'Arthur M 💋 Larissa' },
    { url: 'assets/foto23.jpg', nome: 'Gustavo 💋 Yasmeen' },
    { url: 'assets/foto24.jpg', nome: 'Gustavo 💋 Dominik' },
    { url: 'assets/foto25.jpg', nome: 'Arthur M 💋 Beatriz Pereira' },
    { url: 'assets/foto26.jpg', nome: 'Arthur M 💋 Laura' },
    { url: 'assets/foto27.jpg', nome: 'Arthur M 💋 Maria Luiza' },
    { url: 'assets/foto28.jpg', nome: 'Arthur M 💋 Stephany' },
    { url: 'assets/foto29.jpg', nome: 'Gustavo 💋 Tarsila' },
    { url: 'assets/foto30.jpg', nome: 'Arthur M 💋 Maria Eduarda Teixeira' },
];

/* =========================================
   Motor de Galeria Automático (Otimizado)
   ========================================= */
async function renderizarGaleria(lista, containerId) {
    const gallery = document.getElementById(containerId);
    if (!gallery) return;

    // 1. Processa tamanhos em paralelo
    const fotosProcessadas = await Promise.all(lista.map(foto => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = foto.url;
            img.onload = () => resolve({ ...foto, area: img.width * img.height });
            img.onerror = () => resolve({ ...foto, area: 0 }); // Ignora fotos quebradas
        });
    }));

    // 2. Ordena da MAIOR para a MENOR (como você pediu)
    fotosProcessadas.sort((a, b) => b.area - a.area);

    // 3. Renderiza com delay para efeito visual
    gallery.innerHTML = ''; 
    fotosProcessadas.forEach((foto, index) => {
        if (foto.area === 0) return; // Não renderiza se a foto não carregar

        const polaroid = document.createElement('div');
        polaroid.className = 'polaroid';
        polaroid.style.animationDelay = `${index * 0.1}s`;
        polaroid.onclick = playSound;

        polaroid.innerHTML = `
            <img src="${foto.url}" alt="${foto.nome}">
            <span>${foto.nome}</span>
        `;
        gallery.appendChild(polaroid);
    });
}

/* =========================================
   Inicialização Única
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa as galerias
    renderizarGaleria(fotosCasal, 'polaroid-gallery');
    renderizarGaleria(fotosBeijo, 'kiss-gallery');
});

// --- Configurações do Jogo ---
let girlsList = [
    "Sancho", "Meireles", "Pereira", "Thaila", "Guedes", "Pires", "Carneiro", 
    "Candido", "Candyce", "Castro", "Teixeira", "Vieira", "Chen", "Costa", "de Oliveira",
    "Bizeli", "Li", "Furusugi", "Chan", "Cai", "Domingues", "Al Sied", "Medeiros", "Yiqing"
];

let registeredChildren = [];
let currentFather = "Arthur"; // Default
let isMaleTurn = true;
let currentSorteio = { letter: '', mother: '', gender: '' };

const fatherSurnames = {
    "Arthur": "Rocha",
    "Gustavo": "Dalur Rodrigues"
};

// --- Funções do Jogo ---

function setFather(name) {
    currentFather = name;
    // Estética dos botões
    document.querySelectorAll('.father-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    updatePreview();
}

function generateGameStep() {
    if (girlsList.length === 0) {
        alert("Lista de minas zerada! Todos os destinos foram selados.");
        return;
    }

    // Sortear Letra
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    currentSorteio.letter = letters[Math.floor(Math.random() * letters.length)];
    
    // Sortear Mãe
    const girlIndex = Math.floor(Math.random() * girlsList.length);
    currentSorteio.mother = girlsList[girlIndex];
    
    // Definir Gênero
    currentSorteio.gender = isMaleTurn ? "Masculino" : "Feminino";

    // Atualizar UI
    document.getElementById('current-letter').innerText = currentSorteio.letter;
    document.getElementById('current-gender').innerText = currentSorteio.gender;
    document.getElementById('current-mother').innerText = currentSorteio.mother;
    
    // Mostrar área de registro
    document.getElementById('registration-area').style.display = 'block';
    document.getElementById('chosen-name').value = '';
    document.getElementById('chosen-name').focus();
    
    updatePreview();
}

function updatePreview() {
    const typed = document.getElementById('chosen-name').value || "[Nome]";
    const full = `${typed} ${currentSorteio.mother} ${fatherSurnames[currentFather]}`;
    document.getElementById('preview-full-name').innerText = `Prévia: ${full}`;
}

// Listener para atualizar a prévia enquanto digita
document.getElementById('chosen-name')?.addEventListener('input', updatePreview);

function registerChild() {
    const nameInput = document.getElementById('chosen-name').value;
    
    if (!nameInput) {
        alert("Digite um nome para registrar!");
        return;
    }

    if (nameInput[0].toUpperCase() !== currentSorteio.letter) {
        alert(`O nome deve começar com a letra ${currentSorteio.letter}!`);
        return;
    }

    const fullName = `${nameInput} ${currentSorteio.mother} ${fatherSurnames[currentFather]}`;
    
    // Salvar no "Banco de Dados"
    const newEntry = {
        fullName: fullName,
        gender: currentSorteio.gender,
        father: currentFather,
        letter: currentSorteio.letter
    };

    registeredChildren.push(newEntry);
    
    // Remover a mãe da lista para não repetir
    girlsList = girlsList.filter(g => g !== currentSorteio.mother);
    
    // Alternar gênero
    isMaleTurn = !isMaleTurn;
    
    // Atualizar Tabela e Resetar Interface
    updateRegistryTable();
    document.getElementById('registration-area').style.display = 'none';
    alert("Nascimento registrado com sucesso!");
}

function updateRegistryTable() {
    const tbody = document.getElementById('registry-body');
    tbody.innerHTML = '';

    registeredChildren.forEach(child => {
        const row = `
            <tr>
                <td><strong>${child.fullName}</strong></td>
                <td>${child.gender === 'Masculino' ? '♂️ Masc' : '♀️ Fem'}</td>
                <td>${child.father}</td>
                <td><span class="letter-badge">${child.letter}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}
