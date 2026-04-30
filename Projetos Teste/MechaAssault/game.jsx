import React, { useState, useEffect, useMemo } from 'react';
import {
  Shield, Swords, Zap, Flame, Activity, Battery, Crosshair, Settings,
  AlertTriangle, CheckCircle2, Info, ChevronRight, Cpu, Weight, RefreshCw,
  Box, Hexagon, Octagon, Gift, Sparkles, Layers
} from 'lucide-react';

// --- CONFIGURAÇÕES DE UI E RARIDADE ---
const RARITY = {
  common: { name: 'Comum', color: 'text-gray-400', bg: 'bg-gray-800', border: 'border-gray-600', weight: 60 },
  rare: { name: 'Raro', color: 'text-blue-400', bg: 'bg-blue-900/30', border: 'border-blue-500', weight: 30 },
  epic: { name: 'Épico', color: 'text-purple-400', bg: 'bg-purple-900/30', border: 'border-purple-500', weight: 10 },
  legendary: { name: 'Lendário', color: 'text-yellow-400', bg: 'bg-yellow-900/50', border: 'border-yellow-400', weight: 0 }, // Só obtido via Merge
};

const TYPE_COLORS = { phys: 'text-gray-300', elec: 'text-blue-400', therm: 'text-orange-500' };
const TYPE_NAMES = { phys: 'Físico', elec: 'Elétrico', therm: 'Térmico' };

const generateUID = () => Math.random().toString(36).substr(2, 9);

// --- DATABASE DE 60 PEÇAS (10 POR SLOT) ---
const PARTS_DB = {
  head: [
    { id: 'h1', name: 'Capacete de Sucata', rarity: 'common', hp: 20, weight: 5, energyDrain: 2, resPhys: 5, resElec: 0, resTherm: 0, desc: 'Apenas uma panela velha blindada.' },
    { id: 'h2', name: 'Sensor Padrão', rarity: 'common', hp: 40, weight: 10, energyDrain: 5, resPhys: 10, resElec: 5, resTherm: 5, desc: 'Equilíbrio básico militar.' },
    { id: 'h3', name: 'Antena Receptora', rarity: 'common', hp: 30, weight: 8, energyDrain: 10, resPhys: 0, resElec: 15, resTherm: 0, desc: 'Alta recepção, protege de curtos.' },
    { id: 'h4', name: 'Máscara de Solda', rarity: 'common', hp: 35, weight: 12, energyDrain: 4, resPhys: 5, resElec: 0, resTherm: 15, desc: 'Bloqueia calor e faíscas.' },
    { id: 'h5', name: 'Visor Isolante', rarity: 'rare', hp: 40, weight: 15, energyDrain: 10, resPhys: 5, resElec: 30, resTherm: 5, desc: 'Alta defesa elétrica.' },
    { id: 'h6', name: 'Lente Tática', rarity: 'rare', hp: 50, weight: 10, energyDrain: 8, resPhys: 15, resElec: 10, resTherm: 10, desc: 'Analisa o combate rapidamente.' },
    { id: 'h7', name: 'Capacete de Titânio', rarity: 'rare', hp: 70, weight: 25, energyDrain: 5, resPhys: 25, resElec: -5, resTherm: 10, desc: 'Muito resistente, mas atrai raios.' },
    { id: 'h8', name: 'Coroa Prismática', rarity: 'epic', hp: 80, weight: 12, energyDrain: 15, resPhys: 15, resElec: 20, resTherm: 20, desc: 'Defesa geral aprimorada.' },
    { id: 'h9', name: 'Processador Neural', rarity: 'epic', hp: 60, weight: 8, energyDrain: 25, resPhys: 5, resElec: 35, resTherm: 35, desc: 'Consome muita energia, defesa alta elemental.' },
    { id: 'h10', name: 'Módulo Golias', rarity: 'epic', hp: 120, weight: 40, energyDrain: 20, resPhys: 40, resElec: 10, resTherm: 10, desc: 'Cabeça massiva e indestrutível.' },
  ],
  body: [
    { id: 'b1', name: 'Barril Enferrujado', rarity: 'common', hp: 80, weight: 20, energyOutput: 50, resPhys: 5, resElec: 5, resTherm: 5, desc: 'Cheira a óleo velho. Pouca energia.' },
    { id: 'b2', name: 'Chassi Leve', rarity: 'common', hp: 120, weight: 30, energyOutput: 80, resPhys: 10, resElec: 10, resTherm: 10, desc: 'Ágil e funcional.' },
    { id: 'b3', name: 'Peitoral de Aço', rarity: 'common', hp: 150, weight: 45, energyOutput: 60, resPhys: 15, resElec: 0, resTherm: 5, desc: 'Resistente a impactos diretos.' },
    { id: 'b4', name: 'Gerador a Diesel', rarity: 'common', hp: 100, weight: 35, energyOutput: 90, resPhys: 5, resElec: 5, resTherm: -10, desc: 'Produz energia, mas aquece rápido.' },
    { id: 'b5', name: 'Reator Pesado', rarity: 'rare', hp: 200, weight: 70, energyOutput: 150, resPhys: 25, resElec: 15, resTherm: 15, desc: 'Suporta muitos equipamentos.' },
    { id: 'b6', name: 'Fornalha Interna', rarity: 'rare', hp: 160, weight: 50, energyOutput: 130, resPhys: 10, resElec: 10, resTherm: 30, desc: 'Absorve calor para funcionar.' },
    { id: 'b7', name: 'Chassi Aerodinâmico', rarity: 'rare', hp: 140, weight: 25, energyOutput: 110, resPhys: 5, resElec: 20, resTherm: 10, desc: 'Muito leve, dissipa estática.' },
    { id: 'b8', name: 'Núcleo de Antimatéria', rarity: 'epic', hp: 250, weight: 50, energyOutput: 250, resPhys: 20, resElec: 30, resTherm: 30, desc: 'Energia quase ilimitada.' },
    { id: 'b9', name: 'Golem de Batalha', rarity: 'epic', hp: 400, weight: 120, energyOutput: 180, resPhys: 50, resElec: 10, resTherm: 10, desc: 'Uma muralha intransponível de aço.' },
    { id: 'b10', name: 'Matriz Fotônica', rarity: 'epic', hp: 180, weight: 15, energyOutput: 200, resPhys: 0, resElec: 50, resTherm: 50, desc: 'Corpo feito de luz sólida e energia.' },
  ],
  arms: [
    { id: 'a1', name: 'Braços de Sucata', rarity: 'common', hp: 20, weight: 10, energyDrain: 2, resPhys: 0, resElec: 0, resTherm: 0, desc: 'Mal conseguem segurar uma arma.' },
    { id: 'a2', name: 'Articulações Simples', rarity: 'common', hp: 40, weight: 15, energyDrain: 5, resPhys: 5, resElec: 0, resTherm: 0, desc: 'Braços padrão.' },
    { id: 'a3', name: 'Pistões Enferrujados', rarity: 'common', hp: 50, weight: 25, energyDrain: 8, resPhys: 10, resElec: 0, resTherm: 0, dmgBonus: 5, desc: 'Pesados, batem um pouco mais forte.' },
    { id: 'a4', name: 'Cabos Frouxos', rarity: 'common', hp: 30, weight: 5, energyDrain: 10, resPhys: 0, resElec: 15, resTherm: 0, desc: 'Isolamento de borracha ajuda em curtos.' },
    { id: 'a5', name: 'Servomotores de Impacto', rarity: 'rare', hp: 60, weight: 25, energyDrain: 15, resPhys: 15, resElec: 5, resTherm: 5, dmgBonus: 15, desc: 'Aumenta significativamente o dano.' },
    { id: 'a6', name: 'Manipuladores Ágeis', rarity: 'rare', hp: 45, weight: 12, energyDrain: 10, resPhys: 5, resElec: 10, resTherm: 5, spdBonus: 1.2, desc: 'Aumenta a velocidade de ataque.' },
    { id: 'a7', name: 'Condutores de Prata', rarity: 'rare', hp: 50, weight: 18, energyDrain: 12, resPhys: 5, resElec: 25, resTherm: 5, desc: 'Dissipação elétrica perfeita.' },
    { id: 'a8', name: 'Braços de Fibra Óptica', rarity: 'epic', hp: 60, weight: 10, energyDrain: 20, resPhys: 5, resElec: 25, resTherm: 15, spdBonus: 1.5, desc: 'Velocidade de ataque extrema.' },
    { id: 'a9', name: 'Garras de Energia', rarity: 'epic', hp: 80, weight: 20, energyDrain: 35, resPhys: 10, resElec: 15, resTherm: 15, dmgBonus: 25, desc: 'Ataques violentos e cortantes.' },
    { id: 'a10', name: 'Braços Colossais', rarity: 'epic', hp: 120, weight: 60, energyDrain: 10, resPhys: 30, resElec: 0, resTherm: 0, dmgBonus: 20, spdBonus: 0.8, desc: 'Lentos, mas incrivelmente duros.' },
  ],
  legs: [
    { id: 'l1', name: 'Monociclo', rarity: 'common', hp: 30, weightCap: 80, energyDrain: 5, resPhys: 0, resElec: 0, resTherm: 0, desc: 'Desequilibrado, suporta pouco peso.' },
    { id: 'l2', name: 'Pernas Bípedes', rarity: 'common', hp: 60, weightCap: 150, energyDrain: 10, resPhys: 5, resElec: 5, resTherm: 5, desc: 'Básico.' },
    { id: 'l3', name: 'Perna de Pau Metálica', rarity: 'common', hp: 80, weightCap: 180, energyDrain: 2, resPhys: 10, resElec: 0, resTherm: -10, desc: 'Madeira e metal. Cuidado com fogo.' },
    { id: 'l4', name: 'Esteiras Leves', rarity: 'common', hp: 100, weightCap: 220, energyDrain: 15, resPhys: 10, resElec: 0, resTherm: 0, desc: 'Mais tração, mais capacidade de carga.' },
    { id: 'l5', name: 'Esteiras de Tanque', rarity: 'rare', hp: 150, weightCap: 350, energyDrain: 25, resPhys: 20, resElec: 5, resTherm: 5, desc: 'Suporta muito peso, alto HP.' },
    { id: 'l6', name: 'Patins de Combate', rarity: 'rare', hp: 70, weightCap: 130, energyDrain: 15, resPhys: 5, resElec: 15, resTherm: 5, desc: 'Muito rápido, ajuda a evitar ataques elétricos.' },
    { id: 'l7', name: 'Pernas Aracnídeas', rarity: 'rare', hp: 90, weightCap: 250, energyDrain: 20, resPhys: 15, resElec: 0, resTherm: 15, desc: '4 patas, boa dissipação de calor.' },
    { id: 'l8', name: 'Levitação Magnética', rarity: 'epic', hp: 100, weightCap: 200, energyDrain: 45, resPhys: 0, resElec: 40, resTherm: 15, desc: 'Flutua. Imunidade a aterramento.' },
    { id: 'l9', name: 'Propulsores a Jato', rarity: 'epic', hp: 80, weightCap: 180, energyDrain: 60, resPhys: 10, resElec: 10, resTherm: 40, desc: 'Gasta absurdos de energia, expele calor.' },
    { id: 'l10', name: 'Base Colossal', rarity: 'epic', hp: 250, weightCap: 600, energyDrain: 30, resPhys: 35, resElec: 0, resTherm: 0, desc: 'Transforma seu mecha em um forte.' },
  ],
  weapon: [
    { id: 'w1', name: 'Pistola de Prego', rarity: 'common', hp: 10, weight: 10, energyDrain: 0, dmg: 15, type: 'phys', speed: 1.2, desc: 'Dano físico baixo, nenhum custo de energia.' },
    { id: 'w2', name: 'Metralhadora AP', rarity: 'common', hp: 20, weight: 25, energyDrain: 10, dmg: 25, type: 'phys', speed: 1.0, desc: 'Dano físico consistente.' },
    { id: 'w3', name: 'Fio Desencapado', rarity: 'common', hp: 10, weight: 5, energyDrain: 15, dmg: 20, type: 'elec', speed: 1.5, desc: 'Ataques rápidos elétricos.' },
    { id: 'w4', name: 'Lança-Chamas Caseiro', rarity: 'common', hp: 15, weight: 20, energyDrain: 20, dmg: 22, type: 'therm', speed: 0.8, desc: 'Fogo a curto alcance.' },
    { id: 'w5', name: 'Canhão Laser', rarity: 'rare', hp: 20, weight: 35, energyDrain: 40, dmg: 55, type: 'therm', speed: 0.7, desc: 'Dano térmico pesado, lento.' },
    { id: 'w6', name: 'Espada Montante', rarity: 'rare', hp: 40, weight: 30, energyDrain: 5, dmg: 45, type: 'phys', speed: 0.9, desc: 'Forte ataque físico corpo a corpo.' },
    { id: 'w7', name: 'Escopeta de Sucata', rarity: 'rare', hp: 25, weight: 28, energyDrain: 15, dmg: 40, type: 'phys', speed: 0.8, desc: 'Disparo espalhado destrutivo.' },
    { id: 'w8', name: 'Chicote Voltaico', rarity: 'epic', hp: 40, weight: 20, energyDrain: 35, dmg: 35, type: 'elec', speed: 1.8, desc: 'Ataques elétricos muito rápidos.' },
    { id: 'w9', name: 'Lançador de Mísseis', rarity: 'epic', hp: 50, weight: 45, energyDrain: 25, dmg: 80, type: 'therm', speed: 0.5, desc: 'Massivo dano térmico/explosivo, recarga muito lenta.' },
    { id: 'w10', name: 'Canhão de Antimatéria', rarity: 'epic', hp: 30, weight: 50, energyDrain: 70, dmg: 100, type: 'elec', speed: 0.4, desc: 'Devastador. Drena quase toda a bateria.' },
  ],
  shield: [
    { id: 's1', name: 'Nenhum', rarity: 'common', hp: 0, weight: 0, energyDrain: 0, resPhys: 0, resElec: 0, resTherm: 0, desc: 'Economiza peso e energia.' },
    { id: 's2', name: 'Tampa de Lata', rarity: 'common', hp: 20, weight: 5, energyDrain: 0, resPhys: 10, resElec: 0, resTherm: 0, desc: 'Melhor que nada.' },
    { id: 's3', name: 'Tábua de Madeira', rarity: 'common', hp: 30, weight: 10, energyDrain: 0, resPhys: 15, resElec: 5, resTherm: -20, desc: 'Boa contra socos, péssima contra fogo.' },
    { id: 's4', name: 'Malha de Cobre', rarity: 'common', hp: 20, weight: 15, energyDrain: 0, resPhys: 5, resElec: 15, resTherm: 5, desc: 'Ajuda a aterrar eletricidade.' },
    { id: 's5', name: 'Escudo de Titânio', rarity: 'rare', hp: 100, weight: 45, energyDrain: 5, resPhys: 40, resElec: -10, resTherm: 10, desc: 'Bloqueia físico muito bem.' },
    { id: 's6', name: 'Defletor de Íons', rarity: 'rare', hp: 60, weight: 20, energyDrain: 25, resPhys: 5, resElec: 35, resTherm: 5, desc: 'Cria uma barreira eletromagnética.' },
    { id: 's7', name: 'Escudo Térmico', rarity: 'rare', hp: 70, weight: 25, energyDrain: 15, resPhys: 10, resElec: 5, resTherm: 30, desc: 'Placas dissipadoras de calor.' },
    { id: 's8', name: 'Égide de Plasma', rarity: 'epic', hp: 80, weight: 25, energyDrain: 45, resPhys: 15, resElec: 20, resTherm: 50, desc: 'Defesa absoluta contra calor.' },
    { id: 's9', name: 'Campo Magnético', rarity: 'epic', hp: 60, weight: 10, energyDrain: 55, resPhys: 10, resElec: 60, resTherm: 10, desc: 'Isolamento elétrico de alta tecnologia.' },
    { id: 's10', name: 'Muralha Absoluta', rarity: 'epic', hp: 150, weight: 70, energyDrain: 10, resPhys: 50, resElec: 20, resTherm: 20, desc: 'Extremamente pesado. Bloqueia quase tudo.' },
  ]
};

const getIcon = (type, className = "w-5 h-5") => {
  if (type === 'phys') return <Swords className={className} />;
  if (type === 'elec') return <Zap className={className} />;
  if (type === 'therm') return <Flame className={className} />;
  return <Activity className={className} />;
};

function generateEnemy(level) {
  const types = ['phys', 'elec', 'therm'];
  const type = types[(level - 1) % 3]; 
  const hp = Math.floor(150 * Math.pow(1.2, level - 1));
  const dmg = Math.floor(20 * Math.pow(1.15, level - 1));
  const speed = type === 'elec' ? 1.5 : type === 'phys' ? 0.8 : 1.0;
  
  const names = { 
    phys: ['Batedor de Aço', 'Golias Blindado', 'Demolidor Omega'], 
    elec: ['Drone Faiscante', 'Sentinela Iônica', 'Trovão Mecânico'], 
    therm: ['Ignis Beta', 'Andróide Fornalha', 'Dragão de Plasma'] 
  };
  
  const nameVariant = names[type][Math.min(2, Math.floor((level - 1) / 3))];
  return { name: `${nameVariant} Lvl.${level}`, type, hp, maxHp: hp, dmg, speed, level };
}

function generateRewards(count = 3) {
  const allParts = Object.values(PARTS_DB).flat();
  const rewards = [];
  
  for (let i = 0; i < count; i++) {
    const roll = Math.random() * 100;
    let targetRarity = 'common';
    if (roll > RARITY.common.weight && roll <= (RARITY.common.weight + RARITY.rare.weight)) targetRarity = 'rare';
    else if (roll > (RARITY.common.weight + RARITY.rare.weight)) targetRarity = 'epic';

    const pool = allParts.filter(p => p.rarity === targetRarity);
    const selected = pool[Math.floor(Math.random() * pool.length)];
    
    let slotName = '';
    for (const [key, arr] of Object.entries(PARTS_DB)) {
      if (arr.some(p => p.id === selected.id)) slotName = key;
    }

    rewards.push({ ...selected, uid: generateUID(), slotKey: slotName });
  }
  return rewards;
}

function getInitialInventory() {
  return [
    { ...PARTS_DB.head[0], uid: generateUID(), slotKey: 'head' },
    { ...PARTS_DB.body[0], uid: generateUID(), slotKey: 'body' },
    { ...PARTS_DB.arms[0], uid: generateUID(), slotKey: 'arms' },
    { ...PARTS_DB.legs[0], uid: generateUID(), slotKey: 'legs' },
    { ...PARTS_DB.weapon[0], uid: generateUID(), slotKey: 'weapon' },
    { ...PARTS_DB.shield[0], uid: generateUID(), slotKey: 'shield' },
  ];
}


// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [gameState, setGameState] = useState('hangar'); 
  const [level, setLevel] = useState(1);
  const [enemy, setEnemy] = useState(generateEnemy(1));
  const [battleResult, setBattleResult] = useState(null);
  const [combatData, setCombatData] = useState(null);
  
  const [inventory, setInventory] = useState(getInitialInventory());
  const [rewards, setRewards] = useState([]);

  const [build, setBuild] = useState({
    head: inventory[0].uid, body: inventory[1].uid, arms: inventory[2].uid,
    legs: inventory[3].uid, weapon: inventory[4].uid, shield: inventory[5].uid,
  });

  const equippedParts = useMemo(() => {
    return {
      head: inventory.find(p => p.uid === build.head),
      body: inventory.find(p => p.uid === build.body),
      arms: inventory.find(p => p.uid === build.arms),
      legs: inventory.find(p => p.uid === build.legs),
      weapon: inventory.find(p => p.uid === build.weapon),
      shield: inventory.find(p => p.uid === build.shield),
    };
  }, [build, inventory]);

  const robotStats = useMemo(() => {
    if (Object.values(equippedParts).some(p => !p)) return { isValid: false };

    const all = Object.values(equippedParts);
    const maxHp = all.reduce((acc, p) => acc + p.hp, 0);
    const weight = equippedParts.head.weight + equippedParts.body.weight + equippedParts.arms.weight + equippedParts.weapon.weight + equippedParts.shield.weight;
    const energyDrain = all.reduce((acc, p) => acc + (p.energyDrain || 0), 0);
    
    const dmgBonus = equippedParts.arms.dmgBonus || 0;
    const spdBonus = equippedParts.arms.spdBonus || 1.0;

    return {
      maxHp, weight, weightCap: equippedParts.legs.weightCap,
      energyOutput: equippedParts.body.energyOutput, energyDrain,
      resPhys: Math.min(80, all.reduce((acc, p) => acc + (p.resPhys || 0), 0)),
      resElec: Math.min(80, all.reduce((acc, p) => acc + (p.resElec || 0), 0)),
      resTherm: Math.min(80, all.reduce((acc, p) => acc + (p.resTherm || 0), 0)),
      damage: equippedParts.weapon.dmg + dmgBonus,
      speed: equippedParts.weapon.speed * spdBonus,
      damageType: equippedParts.weapon.type,
      isValid: weight <= equippedParts.legs.weightCap && energyDrain <= equippedParts.body.energyOutput
    };
  }, [equippedParts]);

  const initBattle = () => {
    let php = robotStats.maxHp;
    let ehp = enemy.hp;
    const events = [];
    let pTime = 0, eTime = 0, globalTime = 0;
    const pInterval = 1000 / robotStats.speed;
    const eInterval = 1000 / enemy.speed;

    while (php > 0 && ehp > 0 && globalTime < 30000) {
      if (pTime + pInterval <= eTime + eInterval) {
        pTime += pInterval;
        globalTime = pTime;
        ehp = Math.max(0, ehp - robotStats.damage);
        events.push({ time: globalTime, type: 'attack', actor: 'player' });
        events.push({ time: globalTime + 200, type: 'hit', actor: 'enemy', dmg: robotStats.damage, dmgType: robotStats.damageType, hp: ehp });
        if (ehp === 0) events.push({ time: globalTime + 400, type: 'die', actor: 'enemy' });
      } else {
        eTime += eInterval;
        globalTime = eTime;
        let res = 0;
        if (enemy.type === 'phys') res = robotStats.resPhys;
        if (enemy.type === 'elec') res = robotStats.resElec;
        if (enemy.type === 'therm') res = robotStats.resTherm;

        const mitigado = Math.floor(enemy.dmg * (res / 100));
        const finalDmg = Math.max(1, enemy.dmg - mitigado);
        
        php = Math.max(0, php - finalDmg);
        events.push({ time: globalTime, type: 'attack', actor: 'enemy' });
        events.push({ time: globalTime + 200, type: 'hit', actor: 'player', dmg: finalDmg, dmgType: enemy.type, hp: php });
        if (php === 0) events.push({ time: globalTime + 400, type: 'die', actor: 'player' });
      }
    }

    setCombatData({ events, playerMaxHp: robotStats.maxHp, enemyMaxHp: enemy.maxHp });
    setGameState('battle');
  };

  const handleBattleEnd = (winner) => {
    setBattleResult(winner);
    if (winner === 'player') {
      setRewards(generateRewards(3));
      setGameState('reward');
    } else {
      setGameState('result');
    }
  };

  const handleClaimReward = (item) => {
    setInventory(prev => [...prev, item]);
    setLevel(l => l + 1);
    setEnemy(generateEnemy(level + 1));
    setGameState('hangar');
  };

  // Lógica de Evolução de Peças (MERGE)
  const handleMergeAll = () => {
    let newInv = [...inventory];
    let newBuild = { ...build };
    let mergedAnything = false;
    let hasMerges = true;

    while (hasMerges) {
      hasMerges = false;
      const counts = {};
      
      for (let item of newInv) {
        const key = `${item.id}_${item.rarity}`;
        if (!counts[key]) counts[key] = [];
        counts[key].push(item);
      }

      for (let key in counts) {
        // Precisa de 2 peças idênticas da mesma raridade
        if (counts[key].length >= 2) {
          const item1 = counts[key][0];
          const item2 = counts[key][1];

          if (item1.rarity === 'legendary') continue; // Limite máximo

          hasMerges = true;
          mergedAnything = true;

          // Remove as 2 peças velhas
          newInv = newInv.filter(i => i.uid !== item1.uid && i.uid !== item2.uid);

          const rarities = ['common', 'rare', 'epic', 'legendary'];
          const nextRarity = rarities[rarities.indexOf(item1.rarity) + 1];

          // Cria a peça evoluída com atributos turbinados
          const upgraded = {
            ...item1,
            uid: generateUID(),
            rarity: nextRarity,
            hp: item1.hp ? Math.floor(item1.hp * 1.5) : 0,
            dmg: item1.dmg ? Math.floor(item1.dmg * 1.5) : 0,
            energyOutput: item1.energyOutput ? Math.floor(item1.energyOutput * 1.5) : 0,
            weightCap: item1.weightCap ? Math.floor(item1.weightCap * 1.5) : 0,
            resPhys: item1.resPhys > 0 ? item1.resPhys + 5 : item1.resPhys,
            resElec: item1.resElec > 0 ? item1.resElec + 5 : item1.resElec,
            resTherm: item1.resTherm > 0 ? item1.resTherm + 5 : item1.resTherm,
            dmgBonus: item1.dmgBonus ? Math.floor(item1.dmgBonus * 1.5) : 0,
            spdBonus: item1.spdBonus ? Number((item1.spdBonus * 1.1).toFixed(2)) : undefined,
          };

          newInv.push(upgraded);

          // Se alguma das peças velhas estava equipada, auto-equipa a nova
          const slot = item1.slotKey;
          if (newBuild[slot] === item1.uid || newBuild[slot] === item2.uid) {
            newBuild[slot] = upgraded.uid;
          }

          break; // Recomeça o loop para checar fusões em cascata
        }
      }
    }

    if (mergedAnything) {
      setInventory(newInv);
      setBuild(newBuild);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-gray-200 overflow-hidden flex flex-col">
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4B5563; border-radius: 10px; }
        @keyframes float-up { 0% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(-50px) scale(1.2); } }
        .animate-float-up { animation: float-up 1s ease-out forwards; }
        @keyframes lunge-right { 0% { transform: translateX(0); } 50% { transform: translateX(40px); } 100% { transform: translateX(0); } }
        .anim-attack-player { animation: lunge-right 0.3s ease-in-out; }
        @keyframes lunge-left { 0% { transform: translateX(0); } 50% { transform: translateX(-40px); } 100% { transform: translateX(0); } }
        .anim-attack-enemy { animation: lunge-left 0.3s ease-in-out; }
        @keyframes hit-shake { 0% { transform: translate(0,0) rotate(0); filter: brightness(1); } 25% { transform: translate(-5px, 5px) rotate(-2deg); filter: brightness(2) invert(0.2) sepia(1) hue-rotate(-50deg) saturate(5); } 50% { transform: translate(5px, -5px) rotate(2deg); filter: brightness(2) invert(0.2) sepia(1) hue-rotate(-50deg) saturate(5); } 75% { transform: translate(-5px, -5px) rotate(-1deg); } 100% { transform: translate(0,0) rotate(0); filter: brightness(1); } }
        .anim-hit { animation: hit-shake 0.3s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes idle-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .anim-idle { animation: idle-bob 2s ease-in-out infinite; }
        @keyframes explode { 0% { transform: scale(1); opacity: 1; filter: brightness(1); } 50% { transform: scale(1.5); filter: brightness(3); opacity: 0.8; } 100% { transform: scale(0); opacity: 0; filter: brightness(0); } }
        .anim-die { animation: explode 0.8s ease-out forwards; }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 15px rgba(234, 179, 8, 0.4); } 50% { box-shadow: 0 0 25px rgba(234, 179, 8, 0.8); } }
        .btn-merge-glow { animation: pulse-glow 2s infinite; }
      `}} />
      
      <header className="bg-gray-900 border-b border-gray-800 p-4 shadow-md shrink-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <Cpu className="text-cyan-500 w-8 h-8" />
             <h1 className="text-2xl font-black tracking-tighter text-white">
               MECHA<span className="text-cyan-500">ASSAULT</span>
             </h1>
          </div>
          <div className="bg-gray-800 px-4 py-1.5 rounded-full border border-gray-700 font-mono text-sm">
             NÍVEL DE AMEAÇA: <span className="text-red-400 font-bold">{level}</span>
          </div>
        </div>
      </header>

      <main className="relative flex-1 overflow-y-auto custom-scrollbar">
        {gameState === 'hangar' && (
          <Hangar 
            build={build} setBuild={setBuild} 
            inventory={inventory} equippedParts={equippedParts}
            robotStats={robotStats} enemy={enemy} 
            initBattle={initBattle} onMergeAll={handleMergeAll}
          />
        )}
        {gameState === 'battle' && (
          <BattleArena 
            combatData={combatData} 
            equippedParts={equippedParts} 
            enemy={enemy} 
            onEnd={handleBattleEnd} 
          />
        )}
        {gameState === 'reward' && (
          <RewardScreen 
            rewards={rewards}
            inventory={inventory}
            onClaim={handleClaimReward}
          />
        )}
        {gameState === 'result' && (
          <ResultScreen 
            isWin={battleResult === 'player'} 
            level={level} enemy={enemy} robotStats={robotStats}
            onRetry={() => {
              setLevel(1);
              setEnemy(generateEnemy(1));
              const initialInv = getInitialInventory();
              setInventory(initialInv);
              setBuild({
                head: initialInv[0].uid, body: initialInv[1].uid, arms: initialInv[2].uid,
                legs: initialInv[3].uid, weapon: initialInv[4].uid, shield: initialInv[5].uid,
              });
              setGameState('hangar');
            }}
          />
        )}
      </main>
    </div>
  );
}

// --- TELA DE MONTAGEM (HANGAR) ---
function Hangar({ build, setBuild, inventory, equippedParts, robotStats, enemy, initBattle, onMergeAll }) {
  const equip = (slotKey, uid) => setBuild(prev => ({ ...prev, [slotKey]: uid }));
  const slots = ['head', 'body', 'arms', 'legs', 'weapon', 'shield'];

  const inventoryBySlot = inventory.reduce((acc, part) => {
    acc[part.slotKey] = acc[part.slotKey] || [];
    acc[part.slotKey].push(part);
    return acc;
  }, {});

  // Verifica se existem 2 peças idênticas para ativar o botão de Merge
  const canMerge = useMemo(() => {
    const counts = {};
    for (let item of inventory) {
      if (item.rarity === 'legendary') continue;
      const key = `${item.id}_${item.rarity}`;
      counts[key] = (counts[key] || 0) + 1;
      if (counts[key] >= 2) return true;
    }
    return false;
  }, [inventory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 max-w-7xl mx-auto py-8 h-full">
      {/* Esquerda: Informações e Status */}
      <div className="lg:col-span-4 space-y-6">
        <div className="p-5 rounded-xl border border-gray-700 bg-gray-800/80 backdrop-blur shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             {getIcon(enemy.type, "w-32 h-32")}
          </div>
          <h2 className="text-xl font-bold text-gray-200 mb-2 flex items-center gap-2">
            <AlertTriangle className="text-red-400" /> Alvo: {enemy.name}
          </h2>
          <div className="space-y-3 relative z-10 mt-4">
            <div className="flex justify-between items-center p-3 bg-gray-900 rounded-lg">
               <span className="text-gray-400 text-sm">Tipo de Ataque</span>
               <div className="flex items-center gap-2 font-bold text-lg">
                 <span className={`${TYPE_COLORS[enemy.type]} flex items-center gap-1`}>
                    {getIcon(enemy.type, "w-5 h-5")} {TYPE_NAMES[enemy.type]}
                 </span>
               </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-900 rounded-lg">
               <span className="text-gray-400 text-sm">Durabilidade / Vel.</span>
               <span className="font-bold text-white flex items-center gap-3">
                 <span className="text-green-400 flex items-center gap-1"><Activity className="w-4 h-4"/> {enemy.hp}</span>
                 <span className="text-blue-300 flex items-center gap-1"><Box className="w-4 h-4"/> {(enemy.speed).toFixed(1)}s</span>
               </span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-gray-700 bg-gray-800/80 shadow-xl">
           <h2 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
            <Settings className="text-cyan-400" /> Status do Mecha
           </h2>
           {!robotStats.isValid && (
              <div className="p-3 mb-4 bg-red-900/30 border border-red-500/50 rounded-lg flex gap-3 text-xs text-red-200">
                <AlertTriangle className="w-5 h-5 shrink-0" /> Peso ou Energia excedem a capacidade!
              </div>
            )}
           <div className="space-y-4">
              <StatBar label="Integridade (HP)" val={robotStats.maxHp} max={1000} color="bg-green-500" />
              <StatBar label="Energia" val={robotStats.energyDrain} max={robotStats.energyOutput} color="bg-yellow-400" invertedAlert />
              <StatBar label="Carga (Peso)" val={robotStats.weight} max={robotStats.weightCap} color="bg-blue-400" invertedAlert />
              
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-700">
                 <ResistBox type="phys" val={robotStats.resPhys} />
                 <ResistBox type="elec" val={robotStats.resElec} />
                 <ResistBox type="therm" val={robotStats.resTherm} />
              </div>

              <button 
                onClick={initBattle}
                disabled={!robotStats.isValid}
                className={`w-full py-4 rounded-xl font-black text-lg transition-all ${
                  robotStats.isValid ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)]' : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                ENTRAR NA ARENA
              </button>
           </div>
        </div>
      </div>

      {/* Direita: Inventário e Equipamentos */}
      <div className="lg:col-span-8 bg-gray-800/50 rounded-xl border border-gray-700 p-6 flex flex-col max-h-[85vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Box className="text-cyan-400" /> Garagem e Inventário
          </h2>
          
          {/* Botão de Fundir (Merge) */}
          <button 
            onClick={onMergeAll}
            disabled={!canMerge}
            className={`flex items-center gap-2 px-4 py-2 font-bold rounded-lg transition-all ${
              canMerge 
                ? 'bg-yellow-600 hover:bg-yellow-500 text-white btn-merge-glow' 
                : 'bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600'
            }`}
          >
            <Layers className="w-5 h-5" />
            {canMerge ? 'FUNDIR DUPLICATAS' : 'NENHUMA FUSÃO'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 overflow-hidden">
          {/* Peças Equipadas */}
          <div className="space-y-3 overflow-y-auto custom-scrollbar pr-2 pb-4">
             <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 sticky top-0 bg-gray-800/90 py-1 z-10 border-b border-gray-700">Equipado Atualmente</div>
             {slots.map(s => <EquippedSlot key={s} slot={s} part={equippedParts[s]} />)}
          </div>

          {/* Inventário Pessoal */}
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-700 overflow-y-auto custom-scrollbar pr-2">
             <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 sticky top-0 bg-gray-900/90 py-1 z-10 border-b border-gray-800">Seus Itens</div>
             {slots.map(slotKey => {
               const partsInSlot = inventoryBySlot[slotKey] || [];
               if (partsInSlot.length === 0) return null;

               return (
                 <div key={slotKey} className="mb-8">
                   <h3 className="text-cyan-400 capitalize mb-3 text-sm font-semibold border-b border-gray-800 pb-1">
                     {slotKey === 'head' ? 'Cabeça' : slotKey === 'body' ? 'Chassi' : slotKey === 'arms' ? 'Braços' : slotKey === 'legs' ? 'Pernas' : slotKey === 'weapon' ? 'Armamento' : 'Escudo'}
                     <span className="text-gray-500 ml-2 text-xs">({partsInSlot.length})</span>
                   </h3>
                   <div className="space-y-3">
                     {partsInSlot.map(part => (
                       <PartCard 
                         key={part.uid} part={part} 
                         isEquipped={build[slotKey] === part.uid}
                         onEquip={() => equip(slotKey, part.uid)}
                       />
                     ))}
                   </div>
                 </div>
               )
             })}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- TELA DE RECOMPENSA (LOOT) ---
function RewardScreen({ rewards, inventory, onClaim }) {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
      <div className="text-center mb-10">
        <Gift className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
        <h2 className="text-4xl font-black text-white uppercase tracking-widest">Ameaça Neutralizada</h2>
        <p className="text-gray-400 mt-2 text-lg">Vasculhe os destroços e extraia <span className="text-yellow-400 font-bold">1 peça</span> para o seu inventário.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {rewards.map(part => {
          const r = RARITY[part.rarity];
          // Mostra quantas dessas peças de id/raridade exata o jogador já possui
          const countOwned = inventory.filter(i => i.id === part.id && i.rarity === part.rarity).length;

          return (
            <div 
              key={part.uid}
              onClick={() => onClaim(part)}
              className={`bg-gray-800 rounded-2xl p-6 border-2 ${r.border} hover:scale-105 transition-all cursor-pointer shadow-2xl relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>
              
              <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold ${r.bg} ${r.color} rounded-bl-xl z-10`}>
                {r.name.toUpperCase()}
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-end mb-1">
                  <div className="text-xs text-gray-500 font-bold uppercase">
                    {part.slotKey === 'head' ? 'Cabeça' : part.slotKey === 'body' ? 'Chassi' : part.slotKey === 'arms' ? 'Braços' : part.slotKey === 'legs' ? 'Pernas' : part.slotKey === 'weapon' ? 'Armamento' : 'Escudo'}
                  </div>
                  {/* Feedback de fusão */}
                  {countOwned > 0 && (
                     <div className={`text-xs font-bold px-2 py-0.5 rounded animate-pulse ${countOwned >= 1 ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                        {countOwned === 1 ? 'Pegue para Fundir!' : `Possui: ${countOwned}`}
                     </div>
                  )}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${r.color}`}>{part.name}</h3>
                <p className="text-sm text-gray-400 italic mb-4 h-10">{part.desc}</p>
                
                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-gray-900/80 p-3 rounded-lg border border-gray-700">
                  {part.hp > 0 && <div>HP: <span className="text-green-400">+{part.hp}</span></div>}
                  {part.weight > 0 && <div>Peso: <span className="text-gray-300">{part.weight}</span></div>}
                  {part.energyDrain > 0 && <div>Gasto En: <span className="text-red-400">-{part.energyDrain}</span></div>}
                  {part.energyOutput > 0 && <div>Gerador: <span className="text-yellow-400">+{part.energyOutput}</span></div>}
                  {part.weightCap > 0 && <div>Carga Max: <span className="text-blue-400">{part.weightCap}</span></div>}
                  {part.dmg > 0 && <div>Dano: <span className={TYPE_COLORS[part.type]}>{part.dmg}</span></div>}
                  {part.spdBonus && <div>Velocidade: <span className="text-purple-400">x{part.spdBonus}</span></div>}
                  {part.dmgBonus && <div>Dano Extra: <span className="text-red-400">+{part.dmgBonus}</span></div>}
                </div>

                {(part.resPhys > 0 || part.resElec > 0 || part.resTherm > 0 || part.resTherm < 0 || part.resElec < 0) && (
                  <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold">
                    {part.resPhys !== 0 && <span className={`px-2 py-1 rounded ${part.resPhys > 0 ? 'bg-gray-700 text-gray-200' : 'bg-red-900/50 text-red-400'}`}>FÍS {part.resPhys > 0 ? '+' : ''}{part.resPhys}%</span>}
                    {part.resElec !== 0 && <span className={`px-2 py-1 rounded ${part.resElec > 0 ? 'bg-blue-900/50 text-blue-300' : 'bg-red-900/50 text-red-400'}`}>ELÉ {part.resElec > 0 ? '+' : ''}{part.resElec}%</span>}
                    {part.resTherm !== 0 && <span className={`px-2 py-1 rounded ${part.resTherm > 0 ? 'bg-orange-900/50 text-orange-300' : 'bg-red-900/50 text-red-400'}`}>TÉR {part.resTherm > 0 ? '+' : ''}{part.resTherm}%</span>}
                  </div>
                )}
              </div>
              
              <div className="absolute inset-0 border-4 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// --- ARENA DE COMBATE 2D ---
function BattleArena({ combatData, equippedParts, enemy, onEnd }) {
  const [php, setPhp] = useState(combatData.playerMaxHp);
  const [ehp, setEhp] = useState(combatData.enemyMaxHp);
  const [animP, setAnimP] = useState('anim-idle');
  const [animE, setAnimE] = useState('anim-idle');
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let timeouts = [];
    combatData.events.forEach(ev => {
      const t = setTimeout(() => {
        if (ev.type === 'attack') {
          if (ev.actor === 'player') { setAnimP(''); setTimeout(() => setAnimP('anim-attack-player'), 10); } 
          else { setAnimE(''); setTimeout(() => setAnimE('anim-attack-enemy'), 10); }
        } else if (ev.type === 'hit') {
          if (ev.actor === 'player') {
            setPhp(ev.hp); setAnimP('anim-hit'); setTimeout(() => setAnimP('anim-idle'), 300);
            spawnFloatingText(ev.dmg, ev.dmgType, 'left'); spawnParticles('left', ev.dmgType);
          } else {
            setEhp(ev.hp); setAnimE('anim-hit'); setTimeout(() => setAnimE('anim-idle'), 300);
            spawnFloatingText(ev.dmg, ev.dmgType, 'right'); spawnParticles('right', ev.dmgType);
          }
        } else if (ev.type === 'die') {
          if (ev.actor === 'player') setAnimP('anim-die'); else setAnimE('anim-die');
          spawnParticles(ev.actor === 'player' ? 'left' : 'right', 'explode');
          setTimeout(() => onEnd(ev.actor === 'player' ? 'enemy' : 'player'), 1500);
        }
      }, ev.time);
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [combatData]);

  const spawnFloatingText = (dmg, type, side) => {
    const id = Math.random().toString();
    const x = side === 'left' ? 20 + Math.random()*10 : 70 + Math.random()*10;
    const y = 30 + Math.random()*20;
    const color = type === 'phys' ? '#D1D5DB' : type === 'elec' ? '#60A5FA' : '#F97316';
    setFloatingTexts(prev => [...prev, { id, text: `-${dmg}`, x, y, color }]);
    setTimeout(() => setFloatingTexts(prev => prev.filter(t => t.id !== id)), 1000);
  };

  const spawnParticles = (side, type) => {
    const newParticles = Array.from({length: type==='explode'?20:5}).map((_, i) => ({
      id: Math.random().toString(), x: side === 'left' ? 30 : 70, y: 50,
      vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10 - 5,
      color: type === 'explode' ? '#ef4444' : type === 'phys' ? '#9ca3af' : type === 'elec' ? '#3b82f6' : '#f97316'
    }));
    setParticles(prev => [...prev, ...newParticles]);
  };

  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({ ...p, x: p.x + p.vx * 0.1, y: p.y + p.vy * 0.1, vy: p.vy + 0.5 })).filter(p => p.y < 120));
    }, 30);
    return () => clearInterval(interval);
  }, [particles]);

  return (
    <div className="h-full min-h-[500px] w-full flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-cyan-900/20 to-transparent"></div>
      <div className="absolute bottom-20 w-full h-1 bg-cyan-900/50 shadow-[0_0_20px_rgba(8,145,178,0.5)]"></div>

      <div className="w-full max-w-5xl mx-auto p-6 flex justify-between items-center z-10 shrink-0">
         <div className="w-5/12 bg-gray-900/80 p-4 rounded-xl border border-gray-700 backdrop-blur">
            <h3 className="font-bold text-cyan-400 mb-2">Seu Mecha</h3>
            <div className="flex justify-between font-mono text-sm mb-1">
              <span>HP</span> <span>{php} / {combatData.playerMaxHp}</span>
            </div>
            <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full transition-all duration-200" style={{width: `${(php/combatData.playerMaxHp)*100}%`}}></div>
            </div>
         </div>
         <div className="text-3xl font-black text-gray-700 italic">VS</div>
         <div className="w-5/12 bg-gray-900/80 p-4 rounded-xl border border-gray-700 backdrop-blur text-right">
            <h3 className="font-bold text-red-400 mb-2">{enemy.name}</h3>
            <div className="flex justify-between font-mono text-sm mb-1 flex-row-reverse">
              <span>HP</span> <span>{ehp} / {combatData.enemyMaxHp}</span>
            </div>
            <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden flex justify-end">
              <div className="bg-red-500 h-full transition-all duration-200" style={{width: `${(ehp/combatData.enemyMaxHp)*100}%`}}></div>
            </div>
         </div>
      </div>

      <div className="flex-1 relative max-w-5xl mx-auto w-full">
        {floatingTexts.map(t => (
          <div key={t.id} className="absolute text-4xl font-black drop-shadow-lg animate-float-up pointer-events-none z-50" style={{ left: `${t.x}%`, top: `${t.y}%`, color: t.color }}>{t.text}</div>
        ))}
        {particles.map(p => (
          <div key={p.id} className="absolute w-2 h-2 rounded-full z-40" style={{ left: `${p.x}%`, top: `${p.y}%`, backgroundColor: p.color, boxShadow: `0 0 10px ${p.color}` }}></div>
        ))}

        <div className={`absolute bottom-24 left-[20%] w-32 h-48 flex flex-col items-center justify-end ${animP} z-20`}>
           <div className={`text-cyan-400 ${RARITY[equippedParts.head.rarity].color}`}><Hexagon size={40} fill="currentColor" opacity={0.2} /></div>
           <div className={`relative flex items-center justify-center text-gray-300 w-24 h-24 bg-gray-800 border-2 ${RARITY[equippedParts.body.rarity].border} rounded-lg mt-1`}>
              <Box size={48} opacity={0.5} />
              <div className={`absolute -right-12 top-6 ${TYPE_COLORS[equippedParts.weapon.type]} z-30`}>{getIcon(equippedParts.weapon.type, "w-16 h-16")}</div>
              {equippedParts.shield.id !== 's1' && <div className="absolute -left-6 top-4 text-blue-400 z-30"><Shield className="w-12 h-12" /></div>}
           </div>
           <div className="flex gap-4 mt-2 text-gray-500">
             <div className="w-4 h-12 bg-gray-700 rounded-sm border-b-4 border-cyan-500"></div>
             <div className="w-4 h-12 bg-gray-700 rounded-sm border-b-4 border-cyan-500"></div>
           </div>
        </div>

        <div className={`absolute bottom-24 right-[20%] w-32 h-48 flex flex-col items-center justify-end ${animE} z-20`}>
           <div className="text-red-500"><Octagon size={48} fill="currentColor" opacity={0.3} /></div>
           <div className={`relative flex items-center justify-center text-gray-300 w-24 h-24 bg-red-950 border-2 border-red-800 rounded-lg mt-1`}>
              <div className={`absolute -left-12 top-6 ${TYPE_COLORS[enemy.type]} z-30 transform scale-x-[-1]`}>{getIcon(enemy.type, "w-16 h-16")}</div>
           </div>
           <div className="w-20 h-10 bg-gray-800 rounded-t-full mt-2 border-b-4 border-red-600"></div>
        </div>
      </div>
    </div>
  );
}

// --- TELA DE RESULTADO ---
function ResultScreen({ isWin, level, enemy, robotStats, onRetry }) {
  const feedback = `Sua carcaça foi vaporizada. O inimigo usou ataques do tipo ${TYPE_NAMES[enemy.type]}. Tente focar em peças com resistência a esse elemento na próxima run!`;

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 relative bg-red-950/20">
      <div className="w-full max-w-lg bg-gray-900 border border-red-900 rounded-3xl p-8 shadow-2xl text-center relative z-10">
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-red-900/50 flex items-center justify-center border-4 border-red-500"><AlertTriangle className="w-12 h-12 text-red-400" /></div>
        </div>
        <h2 className="text-4xl font-black uppercase mb-2 text-red-500">Mecha Abatido</h2>
        <div className="text-gray-400 mb-8 font-mono text-sm">Você sobreviveu até a Ameaça Nível {level}</div>
        <div className="bg-gray-800 rounded-xl p-5 border border-red-900/50 mb-8 text-left">
          <h3 className="font-bold text-white mb-2 flex items-center gap-2"><Info className="w-5 h-5 text-red-400" /> Análise Final</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{feedback}</p>
        </div>
        <button onClick={onRetry} className="w-full py-4 rounded-xl font-black text-lg bg-orange-600 hover:bg-orange-500 text-white transition-all flex items-center justify-center gap-2">
          <RefreshCw className="w-5 h-5" /> REINICIAR JORNADA
        </button>
      </div>
    </div>
  );
}

// --- COMPONENTES AUXILIARES DE UI ---
const StatBar = ({ label, val, max, color, invertedAlert = false }) => {
  const isDanger = invertedAlert ? val > max : val < (max * 0.2);
  const pct = Math.min(100, (val / max) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs font-bold mb-1 text-gray-400 uppercase tracking-wider">
        <span>{label}</span><span className={isDanger ? 'text-red-400' : 'text-white'}>{val} {max !== 1000 && `/ ${max}`}</span>
      </div>
      <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden border border-gray-700">
         <div className={`h-full ${isDanger && invertedAlert ? 'bg-red-500' : color}`} style={{ width: `${pct}%` }}></div>
      </div>
    </div>
  );
};

const ResistBox = ({ type, val }) => {
  const icons = { phys: <Swords className="w-4 h-4" />, elec: <Zap className="w-4 h-4" />, therm: <Flame className="w-4 h-4" /> };
  const colors = { phys: 'text-gray-300', elec: 'text-blue-400', therm: 'text-orange-500' };
  return (
    <div className="flex flex-col items-center p-2 bg-gray-900 rounded-lg border border-gray-800">
      <div className={`${colors[type]} mb-1`}>{icons[type]}</div>
      <span className="font-mono font-bold text-gray-200">{val}%</span>
    </div>
  );
};

const EquippedSlot = ({ slot, part }) => {
  if (!part) return null;
  const labels = { head: 'Cabeça', body: 'Chassi', arms: 'Braços', legs: 'Pernas', weapon: 'Armamento', shield: 'Escudo' };
  const r = RARITY[part.rarity];
  return (
    <div className={`bg-gray-900 rounded-lg p-3 border-l-4 ${r.border} flex justify-between items-center relative overflow-hidden`}>
      <div className={`absolute top-0 right-0 px-2 py-0.5 text-[10px] font-bold ${r.bg} ${r.color} rounded-bl-lg`}>{r.name}</div>
      <div className="flex-1">
        <div className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">{labels[slot]}</div>
        <div className="font-bold text-white text-sm">{part.name}</div>
        <div className="flex flex-wrap gap-2 mt-1 text-[10px] text-gray-400 font-mono">
          {part.hp > 0 && <span className="text-green-400 flex items-center"><Activity size={12}/>{part.hp}</span>}
          {part.weight > 0 && <span className="text-gray-400 flex items-center"><Weight size={12}/>{part.weight}</span>}
          {part.energyDrain > 0 && <span className="text-red-400 flex items-center"><Zap size={12}/>-{part.energyDrain}</span>}
          {part.dmg > 0 && <span className={TYPE_COLORS[part.type]}>Dano: {part.dmg}</span>}
        </div>
      </div>
    </div>
  );
};

const PartCard = ({ part, isEquipped, onEquip }) => {
  const r = RARITY[part.rarity];
  return (
    <div 
      onClick={!isEquipped ? onEquip : undefined}
      className={`relative p-3 rounded-lg border transition-all cursor-pointer ${
        isEquipped ? 'bg-cyan-900/20 border-cyan-500 cursor-default ring-1 ring-cyan-500/50' : `bg-gray-800 ${r.border} hover:bg-gray-700`
      }`}
    >
      <div className="flex justify-between items-start mb-1 pr-14">
        <div className={`font-bold text-sm ${r.color}`}>{part.name}</div>
        {isEquipped && <span className="absolute top-3 right-3 text-[10px] bg-cyan-600 text-white font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Equipado</span>}
      </div>
      <div className="text-[11px] text-gray-400 mb-2 italic leading-tight">{part.desc}</div>
      
      <div className="grid grid-cols-2 gap-1 text-[10px] font-mono bg-gray-900/50 p-2 rounded">
         {part.hp > 0 && <div>HP: <span className="text-green-400">+{part.hp}</span></div>}
         {part.weight > 0 && <div>Peso: <span className="text-gray-300">{part.weight}</span></div>}
         {part.energyDrain > 0 && <div>Energia: <span className="text-red-400">-{part.energyDrain}</span></div>}
         {part.energyOutput > 0 && <div>Gerador: <span className="text-yellow-400">+{part.energyOutput}</span></div>}
         {part.weightCap > 0 && <div>Carga Max: <span className="text-blue-400">{part.weightCap}</span></div>}
         {part.dmg > 0 && <div>Dano: <span className={TYPE_COLORS[part.type]}>{part.dmg}</span></div>}
         {part.spdBonus && <div>Vel: <span className="text-purple-400">x{part.spdBonus}</span></div>}
         {part.dmgBonus && <div>Dano Extra: <span className="text-red-400">+{part.dmgBonus}</span></div>}
      </div>

      {(part.resPhys !== 0 || part.resElec !== 0 || part.resTherm !== 0) && (
        <div className="mt-2 flex gap-1 text-[9px] font-bold flex-wrap">
          {part.resPhys !== 0 && <span className={`px-1 rounded ${part.resPhys > 0 ? 'bg-gray-700 text-gray-200' : 'bg-red-900/50 text-red-400'}`}>FÍS {part.resPhys > 0 ? '+' : ''}{part.resPhys}%</span>}
          {part.resElec !== 0 && <span className={`px-1 rounded ${part.resElec > 0 ? 'bg-blue-900/50 text-blue-300' : 'bg-red-900/50 text-red-400'}`}>ELÉ {part.resElec > 0 ? '+' : ''}{part.resElec}%</span>}
          {part.resTherm !== 0 && <span className={`px-1 rounded ${part.resTherm > 0 ? 'bg-orange-900/50 text-orange-300' : 'bg-red-900/50 text-red-400'}`}>TÉR {part.resTherm > 0 ? '+' : ''}{part.resTherm}%</span>}
        </div>
      )}
    </div>
  );
};