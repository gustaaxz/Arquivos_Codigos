/* ══════════════════════════════════════════
   HIDE 'N SEEK — game.js (Part 1: UI + Menu)
══════════════════════════════════════════ */

// ── Globals ────────────────────────────
let phaserGame = null;
let currentScreen = 'screen-main';
let selectedMap = 'abandoned_house';
let gameSettings = {
  volMusic: 70, volSfx: 100, quality: 'medium',
  playerName: ''
};

// ── Screen Navigation ──────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) { el.classList.add('active'); currentScreen = id; }
}

function showToast(msg, isError) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.toggle('error', !!isError);
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function hideLoading() {
  document.getElementById('loading-overlay').classList.add('hidden');
}

// ── Background Particles ───────────────
function initParticles() {
  const c = document.getElementById('bg-canvas');
  const ctx = c.getContext('2d');
  let W, H, pts = [];
  function resize() { W = c.width = innerWidth; H = c.height = innerHeight; }
  resize(); window.addEventListener('resize', resize);
  for (let i = 0; i < 60; i++) {
    pts.push({ x: Math.random()*W, y: Math.random()*H,
      r: Math.random()*2+0.5, dx: (Math.random()-0.5)*0.4, dy: (Math.random()-0.5)*0.4,
      a: Math.random()*0.4+0.1 });
  }
  (function draw() {
    ctx.clearRect(0,0,W,H);
    pts.forEach(p => {
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(124,92,252,${p.a})`; ctx.fill();
    });
    // draw lines between close particles
    for (let i = 0; i < pts.length; i++) {
      for (let j = i+1; j < pts.length; j++) {
        const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if (d < 120) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(124,92,252,${0.08*(1-d/120)})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  })();
}

// ── Map Picker ─────────────────────────
function initMapPicker() {
  document.querySelectorAll('.map-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.map-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedMap = card.dataset.map;
    });
  });
}

// ── Join Code Display ──────────────────
function updateCodeDisplay(code) {
  const chars = (code || '------').split('');
  for (let i = 0; i < 4; i++) {
    const el = document.getElementById('code-d'+(i+1));
    if (el) el.textContent = chars[i] || '-';
  }
}

// ── Settings ───────────────────────────
function loadSettings() {
  const raw = localStorage.getItem('hns_settings');
  if (raw) Object.assign(gameSettings, JSON.parse(raw));
  document.getElementById('vol-music').value = gameSettings.volMusic;
  document.getElementById('vol-sfx').value = gameSettings.volSfx;
  document.getElementById('gfx-quality').value = gameSettings.quality;
  document.getElementById('player-name-input').value = gameSettings.playerName || '';
  updateSettingsLabels();
}

function saveSettings() {
  gameSettings.volMusic = +document.getElementById('vol-music').value;
  gameSettings.volSfx = +document.getElementById('vol-sfx').value;
  gameSettings.quality = document.getElementById('gfx-quality').value;
  gameSettings.playerName = document.getElementById('player-name-input').value.trim();
  localStorage.setItem('hns_settings', JSON.stringify(gameSettings));
  if (gameSettings.playerName) FirebaseManager.setPlayerName(gameSettings.playerName);
}

function updateSettingsLabels() {
  document.getElementById('vol-music-val').textContent = document.getElementById('vol-music').value + '%';
  document.getElementById('vol-sfx-val').textContent = document.getElementById('vol-sfx').value + '%';
}

// ── Stats Display ──────────────────────
function updateStatsDisplay() {
  const s = FirebaseManager.loadStats();
  document.getElementById('stat-wins').textContent = s.wins;
  document.getElementById('stat-losses').textContent = s.losses;
  document.getElementById('stat-kills').textContent = s.kills;
  document.getElementById('stat-survived').textContent = s.survived;
  document.getElementById('stat-xp').textContent = s.xp;
  document.getElementById('stat-games').textContent = s.games;
  // Rank
  let rank = '⭐', rname = 'Novato';
  if (s.xp >= 5000) { rank = '💎'; rname = 'Lenda'; }
  else if (s.xp >= 2000) { rank = '🏆'; rname = 'Elite'; }
  else if (s.xp >= 500) { rank = '🎯'; rname = 'Caçador'; }
  document.getElementById('rank-badge').textContent = rank;
  document.getElementById('rank-name').textContent = rname;
}

function updatePlayerBar() {
  const name = FirebaseManager.getPlayerName();
  const s = FirebaseManager.loadStats();
  document.getElementById('player-name-display').textContent = name;
  let rank = '⭐ Novato';
  if (s.xp >= 5000) rank = '💎 Lenda';
  else if (s.xp >= 2000) rank = '🏆 Elite';
  else if (s.xp >= 500) rank = '🎯 Caçador';
  document.getElementById('player-rank-display').textContent = rank;
  document.getElementById('player-xp-display').textContent = s.xp + ' XP';
  const pct = Math.min(100, (s.xp % 500) / 5);
  document.getElementById('xp-bar').style.width = pct + '%';
  document.getElementById('player-avatar').textContent = name.charAt(0).toUpperCase();
}

// ── Lobby ──────────────────────────────
let lobbyRoomCode = null;

function showLobby(code, roomData) {
  lobbyRoomCode = code;
  showScreen('screen-lobby');
  document.getElementById('lobby-code-display').textContent = code;
  updateLobby(roomData);
  FirebaseManager.watchRoom(code, updateLobby);
}

function updateLobby(room) {
  if (!room) return;
  const list = document.getElementById('lobby-players-list');
  const players = room.players || {};
  const pids = Object.keys(players);
  const maxP = room.maxPlayers || 4;
  const mapIcons = { abandoned_house:'🏚️', warehouse:'🏭', school:'🏫', mansion:'🏰', lab:'🔬', city:'🌃' };
  const mapNames = { abandoned_house:'Casa Abandonada', warehouse:'Armazém', school:'Escola', mansion:'Mansão', lab:'Laboratório', city:'Cidade' };

  document.getElementById('lobby-map-icon').textContent = mapIcons[room.map] || '🏚️';
  document.getElementById('lobby-map-name').textContent = mapNames[room.map] || room.map;
  document.getElementById('lobby-duration-display').textContent = Math.floor(room.duration/60) + ' minutos';

  let html = '';
  for (let i = 0; i < maxP; i++) {
    if (i < pids.length) {
      const p = players[pids[i]];
      const roleClass = p.isHunter ? 'role-hunter' : 'role-hider';
      const roleText = p.isHunter ? '🔫 Hunter' : '🎭 Hider';
      html += `<div class="player-slot"><div class="slot-avatar">${(p.name||'?').charAt(0)}</div><div><div class="slot-name">${p.name||'Jogador'}</div><div class="slot-role ${roleClass}">${p.isHost?'👑 ':'' }${roleText}</div></div></div>`;
    } else {
      html += `<div class="player-slot empty"><div class="slot-avatar">?</div><div><div class="slot-name">Aguardando...</div><div class="slot-role">-</div></div></div>`;
    }
  }
  list.innerHTML = html;

  if (room.status === 'playing') {
    startPhaserGame(room);
  }
}

// ── Menu Button Bindings ───────────────
function initMenuButtons() {
  // Main menu
  document.getElementById('btn-quick-play').onclick = async () => {
    showToast('Criando partida rápida...');
    const code = await FirebaseManager.quickPlay();
    const room = window._offlineRoom || {};
    showLobby(code, room);
  };
  document.getElementById('btn-create-room').onclick = () => showScreen('screen-create');
  document.getElementById('btn-join-room').onclick = () => {
    showScreen('screen-join');
    FirebaseManager.watchPublicRooms(renderPublicRooms);
  };
  document.getElementById('btn-settings').onclick = () => { loadSettings(); showScreen('screen-settings'); };
  document.getElementById('btn-stats').onclick = () => { updateStatsDisplay(); showScreen('screen-stats'); };

  // Back buttons
  document.getElementById('btn-back-create').onclick = () => showScreen('screen-main');
  document.getElementById('btn-back-join').onclick = () => showScreen('screen-main');
  document.getElementById('btn-back-settings').onclick = () => showScreen('screen-main');
  document.getElementById('btn-back-stats').onclick = () => showScreen('screen-main');

  // Create room
  document.getElementById('btn-confirm-create').onclick = async () => {
    const config = {
      name: document.getElementById('room-name').value || 'Sala',
      maxPlayers: +document.getElementById('room-max-players').value,
      duration: +document.getElementById('room-duration').value,
      map: selectedMap,
      isPrivate: document.getElementById('room-private').checked,
      playerName: FirebaseManager.getPlayerName()
    };
    const code = await FirebaseManager.createRoom(config);
    showToast('Sala criada: ' + code);
    showLobby(code, window._offlineRoom);
  };

  // Join room
  document.getElementById('btn-confirm-join').onclick = async () => {
    const code = document.getElementById('join-code').value.trim().toUpperCase();
    if (code.length < 4) { showToast('Código inválido', true); return; }
    try {
      await FirebaseManager.joinRoom(code, FirebaseManager.getPlayerName());
      showToast('Conectado!');
      showLobby(code, window._offlineRoom);
    } catch(e) { showToast(e.message, true); }
  };

  // Join code display update
  document.getElementById('join-code').addEventListener('input', e => {
    const v = e.target.value.toUpperCase();
    updateCodeDisplay(v);
  });

  // Copy code
  document.getElementById('btn-copy-code').onclick = () => {
    navigator.clipboard.writeText(lobbyRoomCode || '');
    showToast('Código copiado!');
  };

  // Lobby
  document.getElementById('btn-leave-lobby').onclick = async () => {
    await FirebaseManager.leaveRoom();
    showScreen('screen-main');
  };
  document.getElementById('btn-start-game').onclick = async () => {
    if (!lobbyRoomCode) return;
    showToast('Iniciando...');
    await FirebaseManager.startGame(lobbyRoomCode);
  };

  // Settings
  document.getElementById('vol-music').addEventListener('input', updateSettingsLabels);
  document.getElementById('vol-sfx').addEventListener('input', updateSettingsLabels);
  document.getElementById('btn-save-settings').onclick = () => {
    saveSettings(); updatePlayerBar(); showToast('Salvo!'); showScreen('screen-main');
  };

  // Result
  document.getElementById('btn-play-again').onclick = async () => {
    const code = await FirebaseManager.quickPlay();
    showLobby(code, window._offlineRoom);
  };
  document.getElementById('btn-back-menu-result').onclick = () => {
    if (phaserGame) { phaserGame.destroy(true); phaserGame = null; }
    showScreen('screen-main');
  };
}

function renderPublicRooms(rooms) {
  const list = document.getElementById('public-rooms-list');
  if (!rooms || rooms.length === 0) {
    list.innerHTML = '<p class="empty-msg">Nenhuma sala pública disponível</p>';
    return;
  }
  list.innerHTML = rooms.map(r => {
    const ct = Object.keys(r.players||{}).length;
    return `<div class="room-entry" onclick="document.getElementById('join-code').value='${r.code}';updateCodeDisplay('${r.code}')"><div class="room-entry-name">${r.name}</div><div class="room-entry-info">${ct}/${r.maxPlayers} 🎮</div></div>`;
  }).join('');
}
