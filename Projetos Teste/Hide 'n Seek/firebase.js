/* ═══════════════════════════════════════════════════════════
   FIREBASE.JS — Multiplayer Backend
   Hide 'n Seek | Firebase 9 Compat SDK
   ═══════════════════════════════════════════════════════════
   INSTRUÇÕES: Substitua os valores abaixo pelos do seu projeto
   Firebase em: console.firebase.google.com > Configurações
   ═══════════════════════════════════════════════════════════ */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBs01jzv4b-e9v7MDm5e7-S6g2ZgpwmOMg",
  authDomain: "hide-nseek.firebaseapp.com",
  projectId: "hide-nseek",
  storageBucket: "hide-nseek.firebasestorage.app",
  messagingSenderId: "289426146463",
  appId: "1:289426146463:web:89e27938ed618239250eaa",
  measurementId: "G-G9LT97RNZL"
};

// ════════════════════════════════════════════════════════════
// FIREBASE MANAGER
// ════════════════════════════════════════════════════════════
const FirebaseManager = (() => {
  let app, auth, db, rtdb;
  let currentUser = null;
  let currentRoomId = null;
  let syncInterval = null;
  let listeners = [];
  const OFFLINE_MODE = true; // Muda para false quando tiver config real

  // ─── Inicialização ───────────────────────────────────────
  async function init() {
    if (OFFLINE_MODE) {
      console.warn('[Firebase] Modo offline ativo. Configure FIREBASE_CONFIG para multiplayer real.');
      currentUser = { uid: 'local_' + Math.random().toString(36).slice(2, 8), displayName: null };
      return { offline: true };
    }
    try {
      app  = firebase.initializeApp(FIREBASE_CONFIG);
      auth = firebase.auth();
      db   = firebase.firestore();
      rtdb = firebase.database();
      await signInAnonymously();
      return { offline: false };
    } catch (e) {
      console.error('[Firebase] Init falhou, modo offline ativado:', e.message);
      currentUser = { uid: 'local_' + Math.random().toString(36).slice(2, 8), displayName: null };
      return { offline: true };
    }
  }

  // ─── Auth ────────────────────────────────────────────────
  async function signInAnonymously() {
    const cred = await auth.signInAnonymously();
    currentUser = cred.user;
    return currentUser;
  }

  function getUID()  { return currentUser?.uid || 'guest'; }
  function getUser() { return currentUser; }

  // ─── Room Helpers ────────────────────────────────────────
  function generateCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }

  // ─── CREATE ROOM ─────────────────────────────────────────
  async function createRoom(config) {
    if (OFFLINE_MODE) return createRoomOffline(config);

    const code = generateCode();
    const roomData = {
      code,
      name:       config.name || 'Sala Sem Nome',
      hostId:     getUID(),
      map:        config.map || 'abandoned_house',
      duration:   config.duration || 180,
      maxPlayers: config.maxPlayers || 4,
      isPrivate:  config.isPrivate || false,
      status:     'waiting', // waiting | countdown | playing | finished
      createdAt:  firebase.firestore.FieldValue.serverTimestamp(),
      players:    {}
    };

    roomData.players[getUID()] = buildPlayerEntry(config.playerName, true);

    await db.collection('rooms').doc(code).set(roomData);
    currentRoomId = code;
    return code;
  }

  function createRoomOffline(config) {
    const code = generateCode();
    currentRoomId = code;
    const room = {
      code, name: config.name || 'Sala Local',
      hostId: getUID(), map: config.map || 'abandoned_house',
      duration: config.duration || 180, maxPlayers: config.maxPlayers || 4,
      isPrivate: true, status: 'waiting',
      players: {}
    };
    room.players[getUID()] = buildPlayerEntry(config.playerName, true);
    window._offlineRoom = room;
    return code;
  }

  // ─── JOIN ROOM ───────────────────────────────────────────
  async function joinRoom(code, playerName) {
    if (OFFLINE_MODE) return joinRoomOffline(code, playerName);

    const ref = db.collection('rooms').doc(code.toUpperCase());
    const snap = await ref.get();
    if (!snap.exists) throw new Error('Sala não encontrada');

    const room = snap.data();
    if (room.status !== 'waiting') throw new Error('Partida já em andamento');
    if (Object.keys(room.players).length >= room.maxPlayers) throw new Error('Sala cheia');

    await ref.update({ [`players.${getUID()}`]: buildPlayerEntry(playerName, false) });
    currentRoomId = code.toUpperCase();
    return snap.data();
  }

  function joinRoomOffline(code, playerName) {
    currentRoomId = code;
    return window._offlineRoom || null;
  }

  // ─── LEAVE ROOM ──────────────────────────────────────────
  async function leaveRoom() {
    stopAllListeners();
    if (OFFLINE_MODE || !currentRoomId) { currentRoomId = null; return; }
    await db.collection('rooms').doc(currentRoomId).update({
      [`players.${getUID()}`]: firebase.firestore.FieldValue.delete()
    });
    currentRoomId = null;
  }

  // ─── BUILD PLAYER ENTRY ──────────────────────────────────
  function buildPlayerEntry(name, isHost) {
    return {
      uid:    getUID(),
      name:   name || 'Jogador_' + getUID().slice(-4),
      isHost: isHost || false,
      ready:  false,
      isHunter: false,
      alive:  true,
      joinedAt: Date.now()
    };
  }

  // ─── WATCH ROOM (Firestore) ───────────────────────────────
  function watchRoom(code, callback) {
    if (OFFLINE_MODE) {
      // Simulate room watch with polling on local object
      const iv = setInterval(() => {
        if (window._offlineRoom) callback(window._offlineRoom);
      }, 500);
      listeners.push({ type: 'interval', ref: iv });
      return;
    }
    const unsub = db.collection('rooms').doc(code).onSnapshot(snap => {
      if (snap.exists) callback(snap.data());
    });
    listeners.push({ type: 'firestore', ref: unsub });
  }

  // ─── WATCH ROOM LIST (public) ─────────────────────────────
  function watchPublicRooms(callback) {
    if (OFFLINE_MODE) { callback([]); return; }
    const unsub = db.collection('rooms')
      .where('isPrivate', '==', false)
      .where('status', '==', 'waiting')
      .limit(10)
      .onSnapshot(snap => {
        const rooms = snap.docs.map(d => d.data());
        callback(rooms);
      });
    listeners.push({ type: 'firestore', ref: unsub });
  }

  // ─── START GAME ──────────────────────────────────────────
  async function startGame(code) {
    if (OFFLINE_MODE) {
      const room = window._offlineRoom;
      if (!room) return;
      // Assign hunter (host is hunter)
      const pids = Object.keys(room.players);
      room.players[pids[0]].isHunter = true;
      room.status = 'playing';
      window._offlineRoom = room;
      return room;
    }
    const ref = db.collection('rooms').doc(code);
    const snap = await ref.get();
    const room = snap.data();
    // Pick a random hunter
    const pids = Object.keys(room.players);
    const hunterIdx = Math.floor(Math.random() * pids.length);
    const updates = { status: 'playing' };
    pids.forEach((pid, i) => {
      updates[`players.${pid}.isHunter`] = (i === hunterIdx);
    });
    await ref.update(updates);
    return (await ref.get()).data();
  }

  // ─── REALTIME: Sync Player Position ──────────────────────
  let lastSyncTime = 0;
  const SYNC_RATE = 50; // ms

  function syncPlayerState(state) {
    const now = Date.now();
    if (now - lastSyncTime < SYNC_RATE) return;
    lastSyncTime = now;

    if (OFFLINE_MODE) {
      // Store locally for interpolation by other "players" (bots in single player)
      if (!window._offlineStates) window._offlineStates = {};
      window._offlineStates[getUID()] = { ...state, ts: now };
      return;
    }
    if (!rtdb || !currentRoomId) return;
    rtdb.ref(`rooms/${currentRoomId}/players/${getUID()}`).set({ ...state, ts: now });
  }

  // ─── REALTIME: Watch all players ─────────────────────────
  function watchPlayerStates(callback) {
    if (OFFLINE_MODE) {
      const iv = setInterval(() => {
        callback(window._offlineStates || {});
      }, 100);
      listeners.push({ type: 'interval', ref: iv });
      return;
    }
    const ref = rtdb.ref(`rooms/${currentRoomId}/players`);
    ref.on('value', snap => callback(snap.val() || {}));
    listeners.push({ type: 'rtdb', ref });
  }

  // ─── GAME EVENTS ─────────────────────────────────────────
  function sendEvent(type, data) {
    const event = { type, data, uid: getUID(), ts: Date.now() };

    if (OFFLINE_MODE) {
      if (!window._offlineEvents) window._offlineEvents = [];
      window._offlineEvents.push(event);
      return;
    }
    if (!rtdb || !currentRoomId) return;
    rtdb.ref(`rooms/${currentRoomId}/events`).push(event);
  }

  function watchEvents(callback) {
    if (OFFLINE_MODE) {
      let lastLen = 0;
      const iv = setInterval(() => {
        const evts = window._offlineEvents || [];
        if (evts.length > lastLen) {
          evts.slice(lastLen).forEach(e => callback(e));
          lastLen = evts.length;
        }
      }, 80);
      listeners.push({ type: 'interval', ref: iv });
      return;
    }
    const ref = rtdb.ref(`rooms/${currentRoomId}/events`).limitToLast(20);
    ref.on('child_added', snap => callback(snap.val()));
    listeners.push({ type: 'rtdb', ref });
  }

  // ─── END GAME ────────────────────────────────────────────
  async function endGame(winnerId, reason) {
    sendEvent('game_end', { winnerId, reason });
    if (OFFLINE_MODE) {
      if (window._offlineRoom) window._offlineRoom.status = 'finished';
      return;
    }
    if (!currentRoomId) return;
    await db.collection('rooms').doc(currentRoomId).update({ status: 'finished' });
  }

  // ─── XP / STATS ──────────────────────────────────────────
  function loadStats() {
    const raw = localStorage.getItem('hns_stats');
    return raw ? JSON.parse(raw) : { wins:0, losses:0, kills:0, survived:0, xp:0, games:0 };
  }

  function saveStats(stats) {
    localStorage.setItem('hns_stats', JSON.stringify(stats));
  }

  function addXP(amount) {
    const stats = loadStats();
    stats.xp += amount;
    stats.games++;
    saveStats(stats);
    return stats;
  }

  function recordResult(won, kills, survived) {
    const stats = loadStats();
    if (won) stats.wins++; else stats.losses++;
    stats.kills += (kills || 0);
    if (survived) stats.survived++;
    saveStats(stats);
  }

  // ─── PLAYER NAME ─────────────────────────────────────────
  function getPlayerName() {
    return localStorage.getItem('hns_playername') || 'Jogador_' + getUID().slice(-4);
  }
  function setPlayerName(name) {
    localStorage.setItem('hns_playername', name);
  }

  // ─── MATCHMAKING ─────────────────────────────────────────
  async function quickPlay() {
    if (OFFLINE_MODE) {
      // Create a local room instantly
      return createRoom({
        name: 'Partida Rápida',
        map: 'abandoned_house',
        duration: 180,
        maxPlayers: 4,
        playerName: getPlayerName()
      });
    }
    // Look for an open public room
    const snap = await db.collection('rooms')
      .where('isPrivate', '==', false)
      .where('status', '==', 'waiting')
      .limit(1)
      .get();

    if (!snap.empty) {
      const room = snap.docs[0].data();
      await joinRoom(room.code, getPlayerName());
      return room.code;
    } else {
      return createRoom({
        name: 'Partida Rápida',
        map: 'abandoned_house',
        duration: 180,
        maxPlayers: 4,
        isPrivate: false,
        playerName: getPlayerName()
      });
    }
  }

  // ─── Cleanup ─────────────────────────────────────────────
  function stopAllListeners() {
    listeners.forEach(l => {
      if (l.type === 'firestore') l.ref();
      else if (l.type === 'rtdb')  l.ref.off();
      else if (l.type === 'interval') clearInterval(l.ref);
    });
    listeners = [];
  }

  // ─── Interpolation helper ────────────────────────────────
  function interpolate(a, b, t) {
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
  }

  // Public API
  return {
    init, getUID, getUser, getPlayerName, setPlayerName,
    createRoom, joinRoom, leaveRoom,
    watchRoom, watchPublicRooms,
    startGame, syncPlayerState, watchPlayerStates,
    sendEvent, watchEvents, endGame,
    loadStats, saveStats, addXP, recordResult,
    quickPlay, stopAllListeners, interpolate,
    get roomId() { return currentRoomId; },
    get isOffline() { return OFFLINE_MODE; }
  };
})();

// Auto-init on load
window.FirebaseManager = FirebaseManager;
