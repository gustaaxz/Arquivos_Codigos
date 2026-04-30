/* ══════════════════════════════════════════
   HIDE 'N SEEK — game_engine.js (Part 2: Phaser 3 Gameplay)
══════════════════════════════════════════ */

class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }
  preload() {
    document.getElementById('loading-overlay').classList.remove('hidden');
    document.getElementById('loader-msg').textContent = 'Carregando Assets...';
    // Generate simple placeholder textures since we don't have real assets yet
    const gfx = this.make.graphics();
    gfx.fillStyle(0x333333); gfx.fillRect(0,0,32,32);
    gfx.generateTexture('wall', 32, 32);
    gfx.clear();
    gfx.fillStyle(0x111111); gfx.fillRect(0,0,32,32);
    gfx.generateTexture('floor', 32, 32);
    gfx.clear();
    gfx.fillStyle(0xff3366); gfx.fillCircle(16,16,16);
    gfx.generateTexture('hunter', 32, 32);
    gfx.clear();
    gfx.fillStyle(0x00ff88); gfx.fillRect(0,0,32,32);
    gfx.generateTexture('hider', 32, 32);
    gfx.clear();
    // props
    gfx.fillStyle(0x8B4513); gfx.fillRect(0,0,40,40); gfx.generateTexture('prop_box', 40, 40);
    gfx.clear();
    gfx.fillStyle(0x228B22); gfx.fillCircle(16,16,16); gfx.generateTexture('prop_plant', 32, 32);
    gfx.clear();
    gfx.fillStyle(0x4682B4); gfx.fillRect(0,0,24,36); gfx.generateTexture('prop_barrel', 24, 36);
  }
  create() {
    hideLoading();
    this.scene.start('GameScene', this.game.registry.get('roomData'));
  }
}

class GameScene extends Phaser.Scene {
  constructor() { super('GameScene'); }

  init(data) {
    this.roomData = data || window._offlineRoom || {};
    this.uid = FirebaseManager.getUID();
    this.playerInfo = this.roomData.players ? this.roomData.players[this.uid] : null;
    this.isHunter = this.playerInfo ? this.playerInfo.isHunter : false;
    this.otherPlayers = {};
    this.timeRemaining = this.roomData.duration || 180;
    this.mapName = this.roomData.map || 'abandoned_house';
  }

  create() {
    showScreen('screen-game');
    this.cameras.main.setBackgroundColor('#1a1a1a');

    // Simple procedural map generation for demo
    this.mapW = 1600; this.mapH = 1200;
    this.physics.world.setBounds(0, 0, this.mapW, this.mapH);

    // Grid background
    this.add.tileSprite(this.mapW/2, this.mapH/2, this.mapW, this.mapH, 'floor').setAlpha(0.5);

    // Walls
    this.walls = this.physics.add.staticGroup();
    for (let i=0; i<this.mapW; i+=32) { this.walls.create(i,0,'wall'); this.walls.create(i,this.mapH-32,'wall'); }
    for (let i=0; i<this.mapH; i+=32) { this.walls.create(0,i,'wall'); this.walls.create(this.mapW-32,i,'wall'); }
    // Some random internal walls
    for (let i=0; i<20; i++) {
        this.walls.create(Phaser.Math.Between(100, this.mapW-100), Phaser.Math.Between(100, this.mapH-100), 'wall').setScale(1, Phaser.Math.Between(2,5)).refreshBody();
    }

    // Props (that hiders can turn into)
    this.props = this.physics.add.staticGroup();
    const propTypes = ['prop_box', 'prop_plant', 'prop_barrel'];
    for (let i=0; i<30; i++) {
      const type = Phaser.Math.RND.pick(propTypes);
      const p = this.props.create(Phaser.Math.Between(100, this.mapW-100), Phaser.Math.Between(100, this.mapH-100), type);
      p.propType = type;
    }

    // Local Player
    const spawnX = Phaser.Math.Between(200, this.mapW-200);
    const spawnY = Phaser.Math.Between(200, this.mapH-200);
    this.player = this.physics.add.sprite(spawnX, spawnY, this.isHunter ? 'hunter' : 'hider');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.walls);
    this.physics.add.collider(this.player, this.props);
    this.cameras.main.startFollow(this.player);

    // Vision System (Fog of war)
    this.visionMask = this.make.graphics();
    this.visionMask.fillStyle(0xffffff, 1);
    this.visionMask.fillCircle(0, 0, this.isHunter ? 250 : 150); // Hunter has bigger vision or directional
    const mask = new Phaser.Display.Masks.BitmapMask(this, this.visionMask);
    // In a full game, we'd apply this mask to a dark overlay, but for simplicity here we just show it
    
    // Inputs
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W,A,S,D,E,F');
    this.input.on('pointerdown', this.handleShoot, this);

    // HUD Setup
    document.getElementById('hud').classList.remove('hidden');
    document.getElementById('hud-role').textContent = this.isHunter ? 'HUNTER' : 'HIDER';
    document.getElementById('hud-role').className = 'hud-role ' + (this.isHunter ? 'hunter' : 'hider');
    if (this.isHunter) {
        document.getElementById('hud-hunter').classList.remove('hidden');
        document.getElementById('hud-hider').classList.add('hidden');
        document.getElementById('crosshair').classList.remove('hidden');
    } else {
        document.getElementById('hud-hunter').classList.add('hidden');
        document.getElementById('hud-hider').classList.remove('hidden');
        document.getElementById('crosshair').classList.add('hidden');
    }

    // Multiplayer Sync
    this.lastSync = 0;
    FirebaseManager.watchPlayerStates(states => this.updateOtherPlayers(states));
    FirebaseManager.watchEvents(ev => this.handleNetworkEvent(ev));

    // Timer
    this.timerEvent = this.time.addEvent({ delay: 1000, callback: this.updateTimer, callbackScope: this, loop: true });
    
    this.isDead = false;
    this.currentProp = null; // For hider
  }

  updateTimer() {
    if (this.timeRemaining <= 0) {
      this.timerEvent.remove();
      this.endGame('time_up');
      return;
    }
    this.timeRemaining--;
    const m = Math.floor(this.timeRemaining / 60);
    const s = this.timeRemaining % 60;
    document.getElementById('hud-timer').textContent = `${m}:${s.toString().padStart(2, '0')}`;
  }

  updateOtherPlayers(states) {
    for (const uid in states) {
      if (uid === this.uid) continue;
      const state = states[uid];
      if (!this.otherPlayers[uid]) {
         this.otherPlayers[uid] = this.physics.add.sprite(state.x, state.y, state.isHunter ? 'hunter' : (state.prop || 'hider'));
         // Setup simple health/death state here if needed
      } else {
         // Interpolate in a real game, just snap for demo
         const p = this.otherPlayers[uid];
         p.setPosition(state.x, state.y);
         p.setRotation(state.r);
         if (state.prop && p.texture.key !== state.prop) p.setTexture(state.prop);
      }
    }
  }

  handleNetworkEvent(ev) {
    if (ev.type === 'shoot') {
       // Draw bullet line
       const line = this.add.line(0,0, ev.data.startX, ev.data.startY, ev.data.endX, ev.data.endY, 0xffff00).setOrigin(0,0);
       this.time.delayedCall(100, () => line.destroy());
    } else if (ev.type === 'kill') {
       this.showKillFeed(ev.data.killerName, ev.data.victimName);
       if (ev.data.victimId === this.uid) {
           this.die();
       } else if (this.otherPlayers[ev.data.victimId]) {
           this.otherPlayers[ev.data.victimId].destroy();
           delete this.otherPlayers[ev.data.victimId];
       }
    } else if (ev.type === 'game_end') {
       this.scene.stop();
       showResultScreen(ev.data);
    }
  }

  showKillFeed(killer, victim) {
      const feed = document.getElementById('kill-feed');
      const entry = document.createElement('div');
      entry.className = 'kill-entry';
      entry.innerHTML = `<span style="color:var(--hunter)">${killer}</span> 🔫 <span style="color:var(--hider)">${victim}</span>`;
      feed.appendChild(entry);
      setTimeout(() => entry.remove(), 4000);
  }

  handleShoot(pointer) {
      if (!this.isHunter || this.isDead) return;
      
      const targetX = pointer.worldX;
      const targetY = pointer.worldY;
      
      // Simple raycast/distance check
      let hitId = null;
      for (const uid in this.otherPlayers) {
          const op = this.otherPlayers[uid];
          // Simple distance check for hit
          if (Phaser.Math.Distance.Between(this.player.x, this.player.y, op.x, op.y) < 30) {
              hitId = uid;
              break;
          }
      }

      FirebaseManager.sendEvent('shoot', {
          startX: this.player.x, startY: this.player.y,
          endX: targetX, endY: targetY
      });

      if (hitId) {
          const victimName = this.roomData.players[hitId]?.name || 'Hider';
          FirebaseManager.sendEvent('kill', {
              killerId: this.uid, killerName: this.playerInfo.name,
              victimId: hitId, victimName: victimName
          });
          // For sudden death, end game
          FirebaseManager.endGame(this.uid, 'hunter_win');
      }
  }

  transform() {
      // Find nearest prop
      let nearest = null;
      let minDist = 100;
      this.props.getChildren().forEach(p => {
          const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, p.x, p.y);
          if (d < minDist) { minDist = d; nearest = p; }
      });

      if (nearest) {
          this.currentProp = nearest.propType;
          this.player.setTexture(this.currentProp);
          showToast('Disfarçado!');
      }
  }

  die() {
      this.isDead = true;
      this.player.setTint(0xff0000);
      showToast('Você foi eliminado!', true);
  }

  endGame(reason) {
      if (this.uid === this.roomData.hostId) {
          FirebaseManager.endGame(reason === 'time_up' ? 'hiders' : this.uid, reason);
      }
  }

  update(time, delta) {
    if (this.isDead) return;

    const speed = this.isHunter ? 150 : 200;
    let vx = 0, vy = 0;

    if (this.cursors.left.isDown || this.keys.A.isDown) vx = -speed;
    if (this.cursors.right.isDown || this.keys.D.isDown) vx = speed;
    if (this.cursors.up.isDown || this.keys.W.isDown) vy = -speed;
    if (this.cursors.down.isDown || this.keys.S.isDown) vy = speed;

    this.player.setVelocity(vx, vy);
    
    // Rotate towards mouse for hunter, or movement dir for hider
    if (this.isHunter) {
        this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input.activePointer.worldX, this.input.activePointer.worldY);
    } else if (vx !== 0 || vy !== 0) {
        this.player.rotation = Math.atan2(vy, vx);
    }

    if (!this.isHunter && Phaser.Input.Keyboard.JustDown(this.keys.E)) {
        this.transform();
    }

    // Update vision mask position
    this.visionMask.clear();
    this.visionMask.fillStyle(0xffffff, 1);
    this.visionMask.fillCircle(this.player.x, this.player.y, this.isHunter ? 300 : 150);

    // Network sync
    if (time > this.lastSync + 50) { // 20fps sync
        FirebaseManager.syncPlayerState({
            x: this.player.x,
            y: this.player.y,
            r: this.player.rotation,
            isHunter: this.isHunter,
            prop: this.currentProp
        });
        this.lastSync = time;
    }
  }
}

// ── Game Start/Result ──────────────────

function startPhaserGame(roomData) {
    if (phaserGame) {
        phaserGame.destroy(true);
    }
    
    const config = {
        type: Phaser.AUTO,
        parent: 'game-container',
        width: window.innerWidth,
        height: window.innerHeight,
        physics: {
            default: 'arcade',
            arcade: { debug: false }
        },
        scene: [BootScene, GameScene]
    };
    
    phaserGame = new Phaser.Game(config);
    phaserGame.registry.set('roomData', roomData);

    window.addEventListener('resize', () => {
        if(phaserGame) phaserGame.scale.resize(window.innerWidth, window.innerHeight);
    });
}

function showResultScreen(data) {
    showScreen('screen-result');
    document.getElementById('hud').classList.add('hidden');
    const isHunter = window._offlineRoom?.players[FirebaseManager.getUID()]?.isHunter;
    
    let won = false;
    if (data.reason === 'hunter_win' && isHunter) won = true;
    if (data.reason === 'time_up' && !isHunter) won = true;

    document.getElementById('result-title').textContent = won ? 'VITÓRIA!' : 'DERROTA';
    document.getElementById('result-title').style.background = won ? 'linear-gradient(135deg, #fff, var(--gold))' : 'linear-gradient(135deg, #fff, var(--hunter))';
    document.getElementById('result-icon').textContent = won ? '🏆' : '💀';
    
    const xp = won ? 150 : 50;
    document.getElementById('result-xp-gain').textContent = xp;
    FirebaseManager.addXP(xp);
    FirebaseManager.recordResult(won, isHunter ? 1 : 0, won);
}



// Wait for DOM
window.addEventListener('DOMContentLoaded', async () => {
    initParticles();
    initMapPicker();
    initMenuButtons();
    loadSettings();
    
    try {
        await FirebaseManager.init();
    } catch(e) {
        console.error("Firebase init failed:", e);
    }
    
    updatePlayerBar();
    hideLoading();
});
