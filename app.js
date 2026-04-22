// ==========================================
// FIREBASE CONFIG - REPLACE WITH YOUR OWN
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyDh1JocXIWxD0-8es7EWVqJIMQGYlto94Q",
    authDomain: "torata-be96b.firebaseapp.com",
    databaseURL: "https://torata-be96b-default-rtdb.firebaseio.com",
    projectId: "torata-be96b",
    storageBucket: "torata-be96b.firebasestorage.app",
    messagingSenderId: "235335081728",
    appId: "1:235335081728:web:0288c6e4f6036d7f565de5"
};

// ==========================================
// OBRAS DATA
// ==========================================
const OBRAS = [
    { id: 1, name: "MEJORAMIENTO Y AMPLIACION DEL ACCESO VIAL A LOS SECTORES DE LA PASCANA Y CHACANE, DISTRITO DE TORATA", short: "Acceso Vial Pascana y Chacane", video: "https://web.facebook.com/reel/713872555120566", likes: 0 },
    { id: 2, name: "MEJORAMIENTO Y AMPLIACION DEL SERVICIO DE EDUCACION PRIMARIA Y SERVICIO DE EDUCACIÓN SECUNDARIA EN I.E. JOSE CARLOS MARIATEGUI DISTRITO DE TORATA", short: "I.E. José Carlos Mariátegui", video: "https://web.facebook.com/reel/1488467816234955", likes: 0 },
    { id: 3, name: "MEJORAMIENTO DEL SERVICIO DE AGUA PARA RIEGO MEDIANTE EL SISTEMA DE RIEGO TECNIFICADO EN LOS SECTORES DE RIEGO ALTO COPLAY Y SAN MIGUEL, PERTENECIENTE AL COMITÉ DE RIEGO COPLAY DEL DISTRITO DE TORATA", short: "Riego Tecnificado Alto Coplay y San Miguel", video: "https://web.facebook.com/reel/1288202893405292", likes: 0 },
    { id: 4, name: "MEJORAMIENTO Y AMPLIACION DEL SERVICIO DE AGUA PARA RIEGO, MEDIANTE SISTEMA PRESURIZADO POR GOTEO EN EL ANEXO SAN JUAN SAN JUNE -, DISTRITO DE TORATA", short: "Riego por Goteo San Juan San June", video: "https://web.facebook.com/reel/1314914870700802", likes: 0 },
    { id: 5, name: "MEJORAMIENTO DE LA VIA VECINAL MO-578 TRAMO: EMP. PE-36A – SABAYA – PTA. CARRETERA, DISTRITO DE TORATA", short: "Vía Vecinal MO-578 Sabaya", video: "https://web.facebook.com/reel/969662458910885", likes: 0 },
    { id: 6, name: "MEJORAMIENTO DEL MALECON RIBEREÑO DESDE EL PUENTE TORATA A LA CALLE CORONEL MANUEL C. DE LA TORRE DEL, DISTRITO DE TORATA", short: "Malecón Ribereño Puente Torata", video: "https://web.facebook.com/reel/1479959960259783", likes: 0 },
    { id: 7, name: "MEJORAMIENTO Y AMPLIACIÓN DE LOS SERVICIOS OPERATIVOS O MISIONALES INSTITUCIONALES EN LABORATORIO AMBIENTAL SAN AGUSTÍN DE TORATA", short: "Laboratorio Ambiental San Agustín", video: "https://web.facebook.com/reel/2023450718568759", likes: 0 },
    { id: 8, name: "PUESTA EN VALOR DEL SITIO ARQUEOLOGICO CERRO BAUL DE LA PROVINCIA MARISCAL NIETO", short: "Sitio Arqueológico Cerro Baúl", video: "https://web.facebook.com/reel/948733077860059", likes: 0 },
    { id: 9, name: "MEJORAMIENTO DE LA VÍA VECINAL MO-581: EMP. MO-586 (DV. YACANGO BAJO) – COPLAY – NUEVO COPLAY – DOCE QUEBRADAS – NUEVA ESPERANZA – BUENA VISTA ONCE DEL DISTRITO DE TORATA", short: "Vía Vecinal MO-581 Yacango - Buena Vista", video: "https://web.facebook.com/reel/26644557555247216", likes: 0 },
    { id: 10, name: "MEJORAMIENTO Y AMPLIACION DEL SERVICIO DE TRANSITABILIDAD VIAL INTERURBANA EN LA VIA VECINAL MO-583, DESDE EMPALME PE-36A, HASTA EMPALME MO-576, DISTRITO DE TORATA", short: "Vía Vecinal MO-583", video: "https://web.facebook.com/reel/1444200476952442", likes: 0 },
    { id: 11, name: "MEJORAMIENTO DEL SERVICIO DE TRANSITABILIDAD VIAL INTERURBANA DE LA VÍA VECINAL MO-576 TRAMO: EMP. PE-36A - ILUBAYA, DISTRITO DE TORATA", short: "Vía Vecinal MO-576 Ilubaya", video: "https://web.facebook.com/reel/1288773996537556", likes: 0 },
    { id: 12, name: "RECUPERACION DEL SERVICIO DE INTERPRETACION CULTURAL DEL SITIO ARQUEOLOGICO CAMATA, SECTORES: CAMATA-PUEBLO, CAMATA-TAMBO, CEMENTERIO, CHULLPAS, CANAL PREHISPANICO Y CAMINO PREHISPANICO (QHAPAQ ÑAN) DEL DISTRITO DE TORATA", short: "Sitio Arqueológico Camata (1)", video: "https://web.facebook.com/reel/951089914550480", likes: 0 },
    { id: 13, name: "RECUPERACION DEL SERVICIO DE INTERPRETACIÓN CULTURAL DEL SITIO ARQUEOLÓGICO CAMATA, SECTORES: CAMATA-PUEBLO, CAMATA-TAMBO, CEMENTERIO, CHULLPAS, CANAL PREHISPÁNICO Y CAMINO PREHISPÁNICO (QHAPAQ ÑAN) DEL DISTRITO DE TORATA", short: "Sitio Arqueológico Camata (2)", video: "https://web.facebook.com/reel/935737052587369", likes: 0 }
];

// ==========================================
// STATE
// ==========================================
let obras = OBRAS.map(o => ({ ...o }));
let currentSort = 'likes';
let searchQuery = '';
let editingObraId = null;
let db = null;
let firebaseReady = false;

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initFirebase();
    createParticles();
    bindEvents();
    // Initial render with zeros, Firebase will update
    renderAll();
});

// ==========================================
// FIREBASE
// ==========================================
function initFirebase() {
    try {
        if (firebaseConfig.apiKey === "YOUR_API_KEY") {
            setDbStatus('⚠️', 'Sin configurar', 'warning');
            console.warn('Firebase no configurado. Edita firebaseConfig en app.js');
            // Load from localStorage as fallback
            loadFromLocal();
            return;
        }
        const app = firebase.initializeApp(firebaseConfig);
        db = firebase.database();

        // Listen for connection state
        db.ref('.info/connected').on('value', (snap) => {
            if (snap.val() === true) {
                setDbStatus('🟢', 'Conectado', 'connected');
            } else {
                setDbStatus('🔴', 'Desconectado', 'disconnected');
            }
        });

        // Listen for real-time changes
        db.ref('likes').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                obras.forEach(o => {
                    if (data[`obra_${o.id}`] !== undefined) {
                        o.likes = data[`obra_${o.id}`].likes || 0;
                    }
                });
            }
            firebaseReady = true;
            renderAll();

            // Update last update time
            db.ref('lastUpdate').once('value', (snap) => {
                const ts = snap.val();
                if (ts) {
                    document.getElementById('lastUpdate').textContent = new Date(ts).toLocaleString('es-PE');
                    document.getElementById('modalLastUpdate').textContent = 'Última act: ' + new Date(ts).toLocaleString('es-PE');
                }
            });
        });

    } catch (err) {
        console.error('Firebase error:', err);
        setDbStatus('❌', 'Error', 'error');
        loadFromLocal();
    }
}

function setDbStatus(icon, text, cls) {
    document.getElementById('dbIcon').textContent = icon;
    document.getElementById('dbLabel').textContent = text;
    const pill = document.getElementById('dbStatus');
    pill.className = 'stat-pill db-' + cls;
}

function saveToFirebase() {
    if (!db) {
        saveToLocal();
        showToast('Datos guardados localmente (Firebase no configurado)', 'warning');
        return;
    }

    const updates = {};
    obras.forEach(o => {
        updates[`likes/obra_${o.id}`] = { likes: o.likes, name: o.short };
    });
    updates['lastUpdate'] = new Date().toISOString();

    db.ref().update(updates)
        .then(() => showToast('✅ Likes actualizados en Firebase'))
        .catch(err => {
            console.error(err);
            showToast('❌ Error al guardar: ' + err.message, 'error');
        });
}

// LocalStorage fallback
function loadFromLocal() {
    const saved = localStorage.getItem('torata_likes');
    if (saved) {
        const data = JSON.parse(saved);
        obras.forEach(o => {
            if (data[o.id] !== undefined) o.likes = data[o.id];
        });
    }
    renderAll();
}
function saveToLocal() {
    const data = {};
    obras.forEach(o => { data[o.id] = o.likes; });
    localStorage.setItem('torata_likes', JSON.stringify(data));
}

// ==========================================
// PARTICLES
// ==========================================
function createParticles() {
    const c = document.getElementById('bgParticles');
    const colors = ['rgba(245,158,11,0.15)', 'rgba(59,130,246,0.12)', 'rgba(139,92,246,0.12)', 'rgba(236,72,153,0.1)'];
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const s = Math.random() * 4 + 2;
        p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;background:${colors[i%4]};animation-duration:${Math.random()*15+10}s;animation-delay:${Math.random()*10}s;`;
        c.appendChild(p);
    }
}

// ==========================================
// SORTING
// ==========================================
function getSorted() {
    let list = [...obras];
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        list = list.filter(o => o.name.toLowerCase().includes(q) || o.short.toLowerCase().includes(q));
    }
    if (currentSort === 'likes') list.sort((a, b) => b.likes - a.likes);
    else list.sort((a, b) => a.short.localeCompare(b.short, 'es'));
    return list;
}

function getRankMap() {
    const sorted = [...obras].sort((a, b) => b.likes - a.likes);
    const map = {};
    sorted.forEach((o, i) => map[o.id] = i + 1);
    return map;
}

// ==========================================
// RENDER ALL
// ==========================================
function renderAll() {
    renderPodium();
    renderRanking();
    renderChart();
    updateStats();
}

// ==========================================
// PODIUM
// ==========================================
function renderPodium() {
    const sorted = [...obras].sort((a, b) => b.likes - a.likes).slice(0, 3);
    const medals = ['🥇', '🥈', '🥉'];
    const cls = ['gold', 'silver', 'bronze'];
    document.getElementById('podiumContainer').innerHTML = sorted.map((o, i) => `
        <div class="podium-card ${cls[i]}">
            <div class="podium-medal">${medals[i]}</div>
            <div class="podium-likes">${o.likes.toLocaleString()}</div>
            <div class="podium-likes-label">LIKES</div>
            <div class="podium-name">${o.short}</div>
            <a href="${o.video}" target="_blank" class="podium-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                Ver Video
            </a>
        </div>`).join('');
}

// ==========================================
// RANKING CARDS
// ==========================================
function renderRanking() {
    const sorted = getSorted();
    const maxLikes = Math.max(...obras.map(o => o.likes), 1);
    const rankMap = getRankMap();

    document.getElementById('rankingGrid').innerHTML = sorted.map((o, i) => {
        const rank = rankMap[o.id];
        const pct = (o.likes / maxLikes * 100);
        const topCls = rank <= 3 ? `top-${rank}` : '';
        return `
        <div class="rank-card ${topCls}" style="animation-delay:${i*0.05}s">
            <div class="card-header">
                <div class="rank-badge">${rank <= 3 ? ['🥇','🥈','🥉'][rank-1] : rank}</div>
                <div class="card-info">
                    <div class="card-obra-name" title="${o.name}">${o.name}</div>
                    <div class="card-short-name">${o.short}</div>
                </div>
            </div>
            <div class="card-body">
                <div class="likes-display">
                    <span class="likes-heart">❤️</span>
                    <span class="likes-count">${o.likes.toLocaleString()}</span>
                </div>
                <div class="card-actions">
                    <a href="${o.video}" target="_blank" class="btn-icon btn-fb" title="Ver video"><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
                    <button class="btn-icon btn-edit" title="Actualizar likes" onclick="openSingleUpdate(${o.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                </div>
            </div>
            <div class="likes-bar-container">
                <div class="likes-bar"><div class="likes-bar-fill" style="width:${pct}%"></div></div>
                <div class="likes-percent">${pct.toFixed(1)}% del líder</div>
            </div>
        </div>`;
    }).join('');
}

// ==========================================
// CHART (Canvas)
// ==========================================
function renderChart() {
    const canvas = document.getElementById('likesChart');
    const ctx = canvas.getContext('2d');
    const sorted = [...obras].sort((a, b) => b.likes - a.likes);
    const maxLikes = Math.max(...sorted.map(o => o.likes), 1);
    const dpr = window.devicePixelRatio || 1;
    const barH = 36, gap = 10, labelW = 220;
    const pad = { top: 20, right: 80, bottom: 20, left: labelW + 10 };
    const totalH = pad.top + pad.bottom + sorted.length * (barH + gap);
    const w = canvas.parentElement.clientWidth - 32;
    canvas.style.width = w + 'px'; canvas.style.height = totalH + 'px';
    canvas.width = w * dpr; canvas.height = totalH * dpr;
    ctx.scale(dpr, dpr);
    const chartW = w - pad.left - pad.right;
    const colors = ['#f59e0b','#c0c0c0','#cd7f32','#3b82f6','#8b5cf6','#ec4899','#10b981','#06b6d4','#f43f5e','#a855f7','#14b8a6','#6366f1','#eab308'];

    sorted.forEach((o, i) => {
        const y = pad.top + i * (barH + gap);
        const bw = (o.likes / maxLikes) * chartW;
        const c = colors[i % colors.length];
        ctx.fillStyle = '#94a3b8'; ctx.font = '11px Inter,sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        const lbl = o.short.length > 30 ? o.short.substring(0, 28) + '…' : o.short;
        ctx.fillText(lbl, pad.left - 10, y + barH / 2);
        ctx.fillStyle = 'rgba(255,255,255,0.03)'; ctx.beginPath(); roundRect(ctx, pad.left, y, chartW, barH, 6); ctx.fill();
        if (bw > 0) {
            const g = ctx.createLinearGradient(pad.left, 0, pad.left + bw, 0);
            g.addColorStop(0, c); g.addColorStop(1, c + '88');
            ctx.fillStyle = g; ctx.beginPath(); roundRect(ctx, pad.left, y, Math.max(bw, 8), barH, 6); ctx.fill();
        }
        ctx.fillStyle = '#f1f5f9'; ctx.font = 'bold 13px Outfit,Inter,sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(o.likes.toLocaleString(), pad.left + bw + 8, y + barH / 2);
    });
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
    ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
    ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
}

// ==========================================
// STATS
// ==========================================
function updateStats() {
    document.getElementById('totalLikes').textContent = obras.reduce((s, o) => s + o.likes, 0).toLocaleString();
}

// ==========================================
// EVENTS
// ==========================================
function bindEvents() {
    document.getElementById('searchInput').addEventListener('input', e => { searchQuery = e.target.value; renderRanking(); });

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

    document.getElementById('btnUpdateAll').addEventListener('click', openModal);
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('updateModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
    document.getElementById('btnSaveAll').addEventListener('click', saveAllFromModal);

    document.getElementById('popoverCancel').addEventListener('click', closeSingleUpdate);
    document.getElementById('popoverConfirm').addEventListener('click', confirmSingleUpdate);
    document.getElementById('singleUpdatePopover').addEventListener('click', e => { if (e.target === e.currentTarget) closeSingleUpdate(); });
    document.getElementById('popoverLikesInput').addEventListener('keydown', e => { if (e.key === 'Enter') confirmSingleUpdate(); });

    window.addEventListener('resize', () => renderChart());
}

// ==========================================
// MODAL - UPDATE ALL
// ==========================================
function openModal() {
    const sorted = [...obras].sort((a, b) => b.likes - a.likes);
    document.getElementById('modalList').innerHTML = sorted.map((o, i) => `
        <div class="modal-item">
            <span class="modal-rank">${i + 1}</span>
            <span class="modal-item-name">${o.short}</span>
            <a href="${o.video}" target="_blank" class="modal-item-link">Abrir ▸</a>
            <input type="number" class="modal-item-input" value="${o.likes}" min="0" data-id="${o.id}">
        </div>`).join('');
    document.getElementById('updateModal').classList.add('active');
}

function closeModal() {
    document.getElementById('updateModal').classList.remove('active');
}

function saveAllFromModal() {
    document.querySelectorAll('.modal-item-input').forEach(input => {
        const id = parseInt(input.dataset.id);
        const val = parseInt(input.value) || 0;
        const obra = obras.find(o => o.id === id);
        if (obra) obra.likes = val;
    });
    saveToFirebase();
    closeModal();
}

// ==========================================
// SINGLE UPDATE
// ==========================================
function openSingleUpdate(id) {
    editingObraId = id;
    const obra = obras.find(o => o.id === id);
    document.getElementById('popoverObra').textContent = obra.short;
    document.getElementById('popoverLikesInput').value = obra.likes;
    document.getElementById('popoverVideoLink').href = obra.video;
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
        saveToFirebase();
    }
    closeSingleUpdate();
}

// ==========================================
// TOAST
// ==========================================
function showToast(msg, type = 'success') {
    const c = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<span class="toast-icon">${type === 'success' ? '✅' : '⚠️'}</span><span>${msg}</span>`;
    c.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(100%)'; t.style.transition = 'all 0.3s'; setTimeout(() => t.remove(), 300); }, 3000);
}
