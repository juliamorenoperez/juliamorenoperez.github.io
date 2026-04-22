// ===== DATA =====
const OBRAS_DATA = [
    {
        id: 1,
        name: "MEJORAMIENTO Y AMPLIACION DEL ACCESO VIAL A LOS SECTORES DE LA PASCANA Y CHACANE, DISTRITO DE TORATA",
        short: "Acceso Vial Pascana y Chacane",
        video: "https://web.facebook.com/reel/713872555120566",
        likes: 0
    },
    {
        id: 2,
        name: "MEJORAMIENTO Y AMPLIACION DEL SERVICIO DE EDUCACION PRIMARIA Y SERVICIO DE EDUCACIÓN SECUNDARIA EN I.E. JOSE CARLOS MARIATEGUI DISTRITO DE TORATA",
        short: "I.E. José Carlos Mariátegui",
        video: "https://web.facebook.com/reel/1488467816234955",
        likes: 0
    },
    {
        id: 3,
        name: "MEJORAMIENTO DEL SERVICIO DE AGUA PARA RIEGO MEDIANTE EL SISTEMA DE RIEGO TECNIFICADO EN LOS SECTORES DE RIEGO ALTO COPLAY Y SAN MIGUEL, PERTENECIENTE AL COMITÉ DE RIEGO COPLAY DEL DISTRITO DE TORATA",
        short: "Riego Tecnificado Alto Coplay y San Miguel",
        video: "https://web.facebook.com/reel/1288202893405292",
        likes: 0
    },
    {
        id: 4,
        name: "MEJORAMIENTO Y AMPLIACION DEL SERVICIO DE AGUA PARA RIEGO, MEDIANTE SISTEMA PRESURIZADO POR GOTEO EN EL ANEXO SAN JUAN SAN JUNE -, DISTRITO DE TORATA",
        short: "Riego por Goteo San Juan San June",
        video: "https://web.facebook.com/reel/1314914870700802",
        likes: 0
    },
    {
        id: 5,
        name: "MEJORAMIENTO DE LA VIA VECINAL MO-578 TRAMO: EMP. PE-36A – SABAYA – PTA. CARRETERA, DISTRITO DE TORATA",
        short: "Vía Vecinal MO-578 Sabaya",
        video: "https://web.facebook.com/reel/969662458910885",
        likes: 0
    },
    {
        id: 6,
        name: "MEJORAMIENTO DEL MALECON RIBEREÑO DESDE EL PUENTE TORATA A LA CALLE CORONEL MANUEL C. DE LA TORRE DEL, DISTRITO DE TORATA",
        short: "Malecón Ribereño Puente Torata",
        video: "https://web.facebook.com/reel/1479959960259783",
        likes: 0
    },
    {
        id: 7,
        name: "MEJORAMIENTO Y AMPLIACIÓN DE LOS SERVICIOS OPERATIVOS O MISIONALES INSTITUCIONALES EN LABORATORIO AMBIENTAL SAN AGUSTÍN DE TORATA",
        short: "Laboratorio Ambiental San Agustín",
        video: "https://web.facebook.com/reel/2023450718568759",
        likes: 0
    },
    {
        id: 8,
        name: "PUESTA EN VALOR DEL SITIO ARQUEOLOGICO CERRO BAUL DE LA PROVINCIA MARISCAL NIETO",
        short: "Sitio Arqueológico Cerro Baúl",
        video: "https://web.facebook.com/reel/948733077860059",
        likes: 0
    },
    {
        id: 9,
        name: "MEJORAMIENTO DE LA VÍA VECINAL MO-581: EMP. MO-586 (DV. YACANGO BAJO) – COPLAY – NUEVO COPLAY – DOCE QUEBRADAS – NUEVA ESPERANZA – BUENA VISTA ONCE DEL DISTRITO DE TORATA",
        short: "Vía Vecinal MO-581 Yacango - Buena Vista",
        video: "https://web.facebook.com/reel/26644557555247216",
        likes: 0
    },
    {
        id: 10,
        name: "MEJORAMIENTO Y AMPLIACION DEL SERVICIO DE TRANSITABILIDAD VIAL INTERURBANA EN LA VIA VECINAL MO-583, DESDE EMPALME PE-36A, HASTA EMPALME MO-576, DISTRITO DE TORATA",
        short: "Vía Vecinal MO-583",
        video: "https://web.facebook.com/reel/1444200476952442",
        likes: 0
    },
    {
        id: 11,
        name: "MEJORAMIENTO DEL SERVICIO DE TRANSITABILIDAD VIAL INTERURBANA DE LA VÍA VECINAL MO-576 TRAMO: EMP. PE-36A - ILUBAYA, DISTRITO DE TORATA",
        short: "Vía Vecinal MO-576 Ilubaya",
        video: "https://web.facebook.com/reel/1288773996537556",
        likes: 0
    },
    {
        id: 12,
        name: "RECUPERACION DEL SERVICIO DE INTERPRETACION CULTURAL DEL SITIO ARQUEOLOGICO CAMATA, SECTORES: CAMATA-PUEBLO, CAMATA-TAMBO, CEMENTERIO, CHULLPAS, CANAL PREHISPANICO Y CAMINO PREHISPANICO (QHAPAQ ÑAN) DEL DISTRITO DE TORATA",
        short: "Sitio Arqueológico Camata (1)",
        video: "https://web.facebook.com/reel/951089914550480",
        likes: 0
    },
    {
        id: 13,
        name: "RECUPERACION DEL SERVICIO DE INTERPRETACIÓN CULTURAL DEL SITIO ARQUEOLÓGICO CAMATA, SECTORES: CAMATA-PUEBLO, CAMATA-TAMBO, CEMENTERIO, CHULLPAS, CANAL PREHISPÁNICO Y CAMINO PREHISPÁNICO (QHAPAQ ÑAN) DEL DISTRITO DE TORATA",
        short: "Sitio Arqueológico Camata (2)",
        video: "https://web.facebook.com/reel/935737052587369",
        likes: 0
    }
];

// ===== STATE =====
let obras = [];
let currentSort = 'likes';
let searchQuery = '';
let editingObraId = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    createParticles();
    renderPodium();
    renderRanking();
    renderChart();
    updateStats();
    bindEvents();
});

// ===== PERSISTENCE =====
function loadData() {
    const saved = localStorage.getItem('torata_likes_data');
    if (saved) {
        const parsed = JSON.parse(saved);
        obras = OBRAS_DATA.map(o => {
            const found = parsed.find(p => p.id === o.id);
            return { ...o, likes: found ? found.likes : 0 };
        });
    } else {
        obras = OBRAS_DATA.map(o => ({ ...o }));
    }
}

function saveData() {
    const toSave = obras.map(o => ({ id: o.id, likes: o.likes }));
    localStorage.setItem('torata_likes_data', JSON.stringify(toSave));
    localStorage.setItem('torata_last_update', new Date().toISOString());
    updateLastUpdate();
}

function updateLastUpdate() {
    const el = document.getElementById('lastUpdate');
    const saved = localStorage.getItem('torata_last_update');
    if (saved) {
        const d = new Date(saved);
        el.textContent = d.toLocaleDateString('es-PE', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    }
}

// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('bgParticles');
    const colors = ['rgba(245,158,11,0.15)', 'rgba(59,130,246,0.12)', 'rgba(139,92,246,0.12)', 'rgba(236,72,153,0.1)'];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 2;
        p.style.cssText = `
            width:${size}px;height:${size}px;
            left:${Math.random()*100}%;
            background:${colors[Math.floor(Math.random()*colors.length)]};
            animation-duration:${Math.random()*15+10}s;
            animation-delay:${Math.random()*10}s;
        `;
        container.appendChild(p);
    }
}

// ===== SORTING =====
function getSorted() {
    let sorted = [...obras];
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        sorted = sorted.filter(o =>
            o.name.toLowerCase().includes(q) || o.short.toLowerCase().includes(q)
        );
    }
    if (currentSort === 'likes') {
        sorted.sort((a, b) => b.likes - a.likes);
    } else {
        sorted.sort((a, b) => a.short.localeCompare(b.short, 'es'));
    }
    return sorted;
}

// ===== RENDER PODIUM =====
function renderPodium() {
    const sorted = [...obras].sort((a, b) => b.likes - a.likes);
    const top3 = sorted.slice(0, 3);
    const container = document.getElementById('podiumContainer');

    const medals = ['🥇', '🥈', '🥉'];
    const classes = ['gold', 'silver', 'bronze'];

    container.innerHTML = top3.map((obra, i) => `
        <div class="podium-card ${classes[i]}">
            <div class="podium-medal">${medals[i]}</div>
            <div class="podium-likes">${obra.likes.toLocaleString()}</div>
            <div class="podium-likes-label">likes</div>
            <div class="podium-name">${obra.short}</div>
            <a href="${obra.video}" target="_blank" class="podium-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                Ver Video
            </a>
        </div>
    `).join('');
}

// ===== RENDER RANKING =====
function renderRanking() {
    const sorted = getSorted();
    const maxLikes = Math.max(...obras.map(o => o.likes), 1);
    const grid = document.getElementById('rankingGrid');

    // Get rank positions from full sorted-by-likes list
    const fullSorted = [...obras].sort((a, b) => b.likes - a.likes);
    const rankMap = {};
    fullSorted.forEach((o, i) => { rankMap[o.id] = i + 1; });

    grid.innerHTML = sorted.map((obra, i) => {
        const rank = rankMap[obra.id];
        const pct = maxLikes > 0 ? (obra.likes / maxLikes * 100) : 0;
        const topClass = rank <= 3 ? `top-${rank}` : '';
        return `
        <div class="rank-card ${topClass}" style="animation-delay:${i * 0.05}s" data-id="${obra.id}">
            <div class="card-header">
                <div class="rank-badge">${rank <= 3 ? ['🥇','🥈','🥉'][rank-1] : rank}</div>
                <div class="card-info">
                    <div class="card-obra-name" title="${obra.name}">${obra.name}</div>
                    <div class="card-short-name">${obra.short}</div>
                </div>
            </div>
            <div class="card-body">
                <div class="likes-display">
                    <span class="likes-heart">❤️</span>
                    <span class="likes-count">${obra.likes.toLocaleString()}</span>
                </div>
                <div class="card-actions">
                    <a href="${obra.video}" target="_blank" class="btn-icon btn-fb" title="Ver video en Facebook">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                    </a>
                    <button class="btn-icon btn-edit" title="Actualizar likes" onclick="openSingleUpdate(${obra.id})">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                </div>
            </div>
            <div class="likes-bar-container">
                <div class="likes-bar"><div class="likes-bar-fill" style="width:${pct}%"></div></div>
                <div class="likes-percent">${pct.toFixed(1)}% del líder</div>
            </div>
        </div>`;
    }).join('');
}

// ===== CHART =====
function renderChart() {
    const canvas = document.getElementById('likesChart');
    const ctx = canvas.getContext('2d');
    const sorted = [...obras].sort((a, b) => b.likes - a.likes);
    const maxLikes = Math.max(...sorted.map(o => o.likes), 1);

    const dpr = window.devicePixelRatio || 1;
    const barH = 36;
    const gap = 10;
    const labelW = 220;
    const padding = { top: 20, right: 80, bottom: 20, left: labelW + 10 };
    const totalH = padding.top + padding.bottom + sorted.length * (barH + gap);
    const containerW = canvas.parentElement.clientWidth - 32;

    canvas.style.width = containerW + 'px';
    canvas.style.height = totalH + 'px';
    canvas.width = containerW * dpr;
    canvas.height = totalH * dpr;
    ctx.scale(dpr, dpr);

    const chartW = containerW - padding.left - padding.right;

    // Colors
    const barColors = [
        '#f59e0b', '#c0c0c0', '#cd7f32',
        '#3b82f6', '#8b5cf6', '#ec4899', '#10b981',
        '#06b6d4', '#f43f5e', '#a855f7', '#14b8a6',
        '#6366f1', '#eab308'
    ];

    sorted.forEach((obra, i) => {
        const y = padding.top + i * (barH + gap);
        const barWidth = maxLikes > 0 ? (obra.likes / maxLikes) * chartW : 0;
        const color = barColors[i % barColors.length];

        // Label
        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const label = obra.short.length > 30 ? obra.short.substring(0, 28) + '…' : obra.short;
        ctx.fillText(label, padding.left - 10, y + barH / 2);

        // Bar background
        ctx.fillStyle = 'rgba(255,255,255,0.03)';
        ctx.beginPath();
        roundRect(ctx, padding.left, y, chartW, barH, 6);
        ctx.fill();

        // Bar fill with gradient
        if (barWidth > 0) {
            const grad = ctx.createLinearGradient(padding.left, 0, padding.left + barWidth, 0);
            grad.addColorStop(0, color);
            grad.addColorStop(1, color + '88');
            ctx.fillStyle = grad;
            ctx.beginPath();
            roundRect(ctx, padding.left, y, Math.max(barWidth, 8), barH, 6);
            ctx.fill();
        }

        // Value
        ctx.fillStyle = '#f1f5f9';
        ctx.font = 'bold 13px Outfit, Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(obra.likes.toLocaleString(), padding.left + barWidth + 8, y + barH / 2);
    });
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

// ===== STATS =====
function updateStats() {
    const total = obras.reduce((sum, o) => sum + o.likes, 0);
    document.getElementById('totalLikes').textContent = total.toLocaleString();
    updateLastUpdate();
}

// ===== EVENTS =====
function bindEvents() {
    // Search
    document.getElementById('searchInput').addEventListener('input', e => {
        searchQuery = e.target.value;
        renderRanking();
    });

    // Sort buttons
    document.getElementById('btnSortLikes').addEventListener('click', () => {
        currentSort = 'likes';
        document.querySelectorAll('.btn-sort').forEach(b => b.classList.remove('active'));
        document.getElementById('btnSortLikes').classList.add('active');
        renderRanking();
    });
    document.getElementById('btnSortName').addEventListener('click', () => {
        currentSort = 'name';
        document.querySelectorAll('.btn-sort').forEach(b => b.classList.remove('active'));
        document.getElementById('btnSortName').classList.add('active');
        renderRanking();
    });

    // Update all button
    document.getElementById('btnUpdateAll').addEventListener('click', openUpdateModal);

    // Modal close
    document.getElementById('modalClose').addEventListener('click', closeUpdateModal);
    document.getElementById('updateModal').addEventListener('click', e => {
        if (e.target === e.currentTarget) closeUpdateModal();
    });

    // Save all
    document.getElementById('btnSaveAll').addEventListener('click', saveAllFromModal);

    // Single update popover
    document.getElementById('popoverCancel').addEventListener('click', closeSingleUpdate);
    document.getElementById('popoverConfirm').addEventListener('click', confirmSingleUpdate);
    document.getElementById('singleUpdatePopover').addEventListener('click', e => {
        if (e.target === e.currentTarget) closeSingleUpdate();
    });
    document.getElementById('popoverLikesInput').addEventListener('keydown', e => {
        if (e.key === 'Enter') confirmSingleUpdate();
    });

    // Resize chart
    window.addEventListener('resize', () => renderChart());
}

// ===== MODAL =====
function openUpdateModal() {
    const sorted = [...obras].sort((a, b) => b.likes - a.likes);
    const list = document.getElementById('modalList');

    list.innerHTML = sorted.map((obra, i) => `
        <div class="modal-item">
            <span class="modal-rank">${i + 1}</span>
            <span class="modal-item-name">${obra.short}</span>
            <a href="${obra.video}" target="_blank" class="modal-item-link">Abrir ▸</a>
            <input type="number" class="modal-item-input" value="${obra.likes}" min="0" data-id="${obra.id}">
        </div>
    `).join('');

    document.getElementById('updateModal').classList.add('active');
}

function closeUpdateModal() {
    document.getElementById('updateModal').classList.remove('active');
}

function saveAllFromModal() {
    const inputs = document.querySelectorAll('.modal-item-input');
    inputs.forEach(input => {
        const id = parseInt(input.dataset.id);
        const val = parseInt(input.value) || 0;
        const obra = obras.find(o => o.id === id);
        if (obra) obra.likes = val;
    });

    saveData();
    refreshAll();
    closeUpdateModal();
    showToast('Likes actualizados correctamente');
}

// ===== SINGLE UPDATE =====
function openSingleUpdate(id) {
    editingObraId = id;
    const obra = obras.find(o => o.id === id);
    document.getElementById('popoverObra').textContent = obra.short;
    document.getElementById('popoverLikesInput').value = obra.likes;
    document.getElementById('singleUpdatePopover').classList.add('active');
    setTimeout(() => document.getElementById('popoverLikesInput').select(), 100);
}

function closeSingleUpdate() {
    document.getElementById('singleUpdatePopover').classList.remove('active');
    editingObraId = null;
}

function confirmSingleUpdate() {
    if (editingObraId === null) return;
    const val = parseInt(document.getElementById('popoverLikesInput').value) || 0;
    const obra = obras.find(o => o.id === editingObraId);
    if (obra) {
        obra.likes = val;
        saveData();
        refreshAll();
        showToast(`${obra.short}: ${val} likes`);
    }
    closeSingleUpdate();
}

// ===== REFRESH =====
function refreshAll() {
    renderPodium();
    renderRanking();
    renderChart();
    updateStats();
}

// ===== TOAST =====
function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast success';
    toast.innerHTML = `<span class="toast-icon">✅</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
