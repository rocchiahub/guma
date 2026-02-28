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
    { url: 'assets/foto2.jpg', nome: 'Gustavo ❤️ Gabriela' },
    { url: 'assets/foto3.jpg', nome: 'Gustavo ❤️ Dominik' },
    { url: 'assets/foto4.jpg', nome: 'Gustavo ❤️ Lina' },
    { url: 'assets/foto6.jpg', nome: 'Arthur M ❤️ Larissa' },
    { url: 'assets/foto7.jpg', nome: 'Arthur M ❤️ Maria Luiza' },
    { url: 'assets/foto9.webp', nome: 'Enzo L ❤️ Anelize' },
    { url: 'assets/foto10.jpg', nome: 'Enzo D ❤️ Bianca Ohata' },
    { url: 'assets/foto12.jpg', nome: 'Gustavo ❤️ Tarsila' },
    { url: 'assets/foto13.jpg', nome: 'Lucca ❤️ Elisa' },
    { url: 'assets/foto15.jpg', nome: 'Arthur M ❤️ Isabella' },
    { url: 'assets/foto16.jpg', nome: 'Arthur M ❤️ Beatriz Pereira' },
    { url: 'assets/foto17.jpg', nome: 'Arthur M ❤️ Maria Eduarda Teixeira' },
    { url: 'assets/foto18.jpg', nome: 'Arthur M ❤️ Stephany' },
    { url: 'assets/foto19.jpg', nome: 'Gustavo ❤️ Yasmeen' },
    { url: 'assets/foto20.jpg', nome: 'Gustavo ❤️ Fernanda' },
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