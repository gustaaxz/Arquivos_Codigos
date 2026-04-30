import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { 
  Play, Pause, Square, Plus, Box, Move, 
  Maximize, Clock, RotateCcw, Layers, 
  MousePointer2, Eye, EyeOff, Video, Sun, 
  Camera, LayoutGrid, Cpu, BoxSelect, Hand, 
  Globe, Trash2, Zap, Monitor, ChevronDown, 
  Settings, MoreVertical, Activity, Database,
  Search, Filter, Save, Download, Share2,
  Box as BoxIcon, Circle, Triangle, Disc,
  Type, Image as ImageIcon, Lightbulb,
  MousePointer, Crosshair, Target
} from 'lucide-react';

/**
 * MINI BLENDER 4.0 - ULTIMATE PROFESSIONAL EDITION (FIXED)
 * -----------------------------------------------
 * Uma aplicação completa de modelação e animação 3D.
 * Correção: THREE.SRGBColorSpace substituindo sRGBEncoding para versões recentes do Three.js.
 */

// --- UTILITÁRIOS DE ANIMAÇÃO ---
const lerp = (a, b, t) => a + (b - a) * t;

const getInterpolatedValue = (t, k1, k2, valKey) => {
  const factor = (t - k1.time) / (k2.time - k1.time);
  if (Array.isArray(k1.state[valKey])) {
    return k1.state[valKey].map((v, i) => lerp(v, k2.state[valKey][i], factor));
  }
  return lerp(k1.state[valKey], k2.state[valKey], factor);
};

// --- COMPONENTES DE UI REUTILIZÁVEIS ---
const PropRow = ({ label, children, active = true }) => (
  <div className={`grid grid-cols-[90px,1fr] items-center gap-2 mb-2 ${!active && 'opacity-30 pointer-events-none'}`}>
    <span className="text-[10px] text-gray-500 font-semibold truncate uppercase tracking-tighter">{label}</span>
    <div className="flex gap-1">{children}</div>
  </div>
);

const NumberInput = ({ value, label, colorClass = "text-gray-400", onChange, step = 0.1 }) => (
  <div className="flex-1 flex bg-[#121212] rounded border border-[#333] overflow-hidden group hover:border-[#555] transition-colors">
    <span className={`w-3.5 text-[8px] flex items-center justify-center font-bold border-r border-[#333] ${colorClass}`}>{label}</span>
    <input 
      type="number" 
      step={step}
      value={typeof value === 'number' ? value.toFixed(2) : value}
      onChange={(e) => onChange && onChange(parseFloat(e.target.value))}
      className="bg-transparent w-full text-[10px] px-1.5 focus:outline-none text-gray-200 py-1.5 font-mono"
    />
  </div>
);

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-2 px-2 py-1.5 bg-[#3d3d3d] border-y border-black/40 text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-4 first:mt-0">
    {Icon && <Icon size={12} className="text-orange-500" />}
    {title}
  </div>
);

export default function App() {
  const containerRef = useRef();
  const engine = useRef({
    scene: null, camera: null, renderer: null, 
    controls: null, transformControls: null,
    meshes: new Map(), clock: new THREE.Clock(),
    raycaster: new THREE.Raycaster(), mouse: new THREE.Vector2()
  });

  // --- ESTADO GLOBAL ---
  const [objects, setObjects] = useState([
    { id: 'env-world', name: 'Mundo', type: 'env', visible: true, state: { color: '#0b0b0b', exposure: 1, fog: 0 }, keyframes: [] },
    { id: 'cam-main', name: 'Câmara Principal', type: 'camera', visible: true, state: { position: [12, 12, 12], rotation: [0, 0, 0], fov: 45 }, keyframes: [] },
    { id: 'light-key', name: 'Luz Principal', type: 'light', visible: true, state: { position: [10, 15, 10], intensity: 1.5, color: '#ffffff' }, keyframes: [] },
    { 
      id: 'obj-cube-1', name: 'Cubo Protótipo', type: 'box', visible: true, color: '#3b82f6',
      state: { position: [0, 1, 0], rotation: [0, 0, 0], scale: [1.5, 1.5, 1.5], metalness: 0.5, roughness: 0.2, opacity: 1 }, 
      keyframes: [
        { id: 1, time: 0, state: { position: [0, 1, 0], rotation: [0, 0, 0], scale: [1.5, 1.5, 1.5] } },
        { id: 2, time: 5, state: { position: [0, 6, 0], rotation: [0, Math.PI, Math.PI/4], scale: [2, 0.5, 2] } },
        { id: 3, time: 10, state: { position: [0, 1, 0], rotation: [0, Math.PI * 2, 0], scale: [1.5, 1.5, 1.5] } }
      ] 
    }
  ]);

  const [selectedId, setSelectedId] = useState('obj-cube-1');
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('object');
  const [transformMode, setTransformMode] = useState('translate');
  const [viewportMode, setViewportMode] = useState('shaded');
  const [showGrid, setShowGrid] = useState(true);
  const [stats, setStats] = useState({ v: 0, f: 0, fps: 0 });
  
  const maxTime = 10;
  const fps = 24;

  // --- ENGINE INITIALIZATION ---
  useEffect(() => {
    if (!containerRef.current) return;

    // Cena & Renderizador
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0b0b);

    const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.set(12, 12, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // CORREÇÃO: Usando a nova propriedade outputColorSpace do Three.js
    if (renderer.outputColorSpace) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }

    containerRef.current.appendChild(renderer.domElement);

    // Auxiliares
    const grid = new THREE.GridHelper(40, 40, 0x222222, 0x333333);
    scene.add(grid);
    engine.current.grid = grid;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const tControls = new TransformControls(camera, renderer.domElement);
    tControls.size = 0.75;
    tControls.addEventListener('dragging-changed', (e) => controls.enabled = !e.value);
    scene.add(tControls);

    engine.current = { ...engine.current, scene, camera, renderer, controls, transformControls: tControls, meshes: new Map() };

    let lastTime = 0;
    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;
      
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
      
      if (Math.random() > 0.9) {
        setStats({ 
          v: renderer.info.render.vertices, 
          f: renderer.info.render.triangles,
          fps: Math.round(1000 / (delta || 1))
        });
      }
    };
    requestAnimationFrame(animate);

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- OBJECT SYNCHRONIZATION ---
  useEffect(() => {
    const { scene, meshes, transformControls, grid } = engine.current;
    if (!scene) return;

    grid.visible = showGrid;

    objects.forEach(obj => {
      if (obj.type === 'env') {
        scene.background.set(obj.state.color);
        return;
      }

      let mesh = meshes.get(obj.id);
      if (!mesh) {
        let geo;
        switch(obj.type) {
          case 'sphere': geo = new THREE.SphereGeometry(1, 32, 32); break;
          case 'cylinder': geo = new THREE.CylinderGeometry(1, 1, 2, 32); break;
          case 'plane': geo = new THREE.PlaneGeometry(10, 10); geo.rotateX(-Math.PI/2); break;
          default: geo = new THREE.BoxGeometry(1, 1, 1);
        }
        
        const mat = new THREE.MeshPhysicalMaterial({ 
          color: obj.color, 
          metalness: obj.state.metalness || 0,
          roughness: obj.state.roughness || 0.5,
          transparent: true,
          opacity: obj.state.opacity || 1
        });
        
        mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
        meshes.set(obj.id, mesh);
      }

      // Update Properties
      mesh.visible = obj.visible;
      mesh.material.color.set(obj.color);
      mesh.material.metalness = obj.state.metalness ?? 0.5;
      mesh.material.roughness = obj.state.roughness ?? 0.5;
      mesh.material.opacity = obj.state.opacity ?? 1;
      mesh.material.wireframe = viewportMode === 'wireframe';

      if (selectedId === obj.id) {
        transformControls.attach(mesh);
        transformControls.setMode(transformMode);
      }
    });

    // Desanexar se nada estiver selecionado ou se o selecionado for env/camera
    const currentSel = objects.find(o => o.id === selectedId);
    if (!currentSel || currentSel.type === 'env' || currentSel.type === 'camera') {
      transformControls.detach();
    }

    // Cleanup deleted objects
    meshes.forEach((mesh, id) => {
      if (!objects.find(o => o.id === id)) {
        scene.remove(mesh);
        meshes.delete(id);
        if (selectedId === id) transformControls.detach();
      }
    });

  }, [objects, selectedId, transformMode, viewportMode, showGrid]);

  // --- MAIN ANIMATION LOOP ---
  useEffect(() => {
    let frameId;
    let lastT = performance.now();

    const loop = (now) => {
      const dt = (now - lastT) / 1000;
      lastT = now;
      
      if (isPlaying) {
        setCurrentTime(p => (p + dt) >= maxTime ? 0 : p + dt);
      }

      objects.forEach(obj => {
        const mesh = engine.current.meshes.get(obj.id);
        if (!mesh || obj.keyframes.length === 0) return;

        const kf = [...obj.keyframes].sort((a,b) => a.time - b.time);
        let s = kf[0].state;

        if (currentTime <= kf[0].time) s = kf[0].state;
        else if (currentTime >= kf[kf.length-1].time) s = kf[kf.length-1].state;
        else {
          for(let i=0; i<kf.length-1; i++) {
            if (currentTime >= kf[i].time && currentTime <= kf[i+1].time) {
              s = {
                position: getInterpolatedValue(currentTime, kf[i], kf[i+1], 'position'),
                rotation: getInterpolatedValue(currentTime, kf[i], kf[i+1], 'rotation'),
                scale: getInterpolatedValue(currentTime, kf[i], kf[i+1], 'scale'),
              };
              break;
            }
          }
        }
        mesh.position.set(...s.position);
        mesh.rotation.set(...s.rotation);
        mesh.scale.set(...s.scale);
      });
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, currentTime, objects]);

  const selectedObject = objects.find(o => o.id === selectedId);

  const addPrimitive = (type) => {
    const id = `obj-${Date.now()}`;
    const newObj = {
      id,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)}.${objects.length}`,
      type,
      visible: true,
      color: '#888888',
      state: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1], metalness: 0.2, roughness: 0.5 },
      keyframes: []
    };
    setObjects([...objects, newObj]);
    setSelectedId(id);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#111] text-[#ccc] font-sans overflow-hidden select-none">
      
      {/* BARRA SUPERIOR (MENU) */}
      <nav className="h-10 bg-[#2d2d2d] flex items-center px-4 border-b border-black/60 justify-between shrink-0 z-50 shadow-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 group cursor-pointer">
             <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <LayoutGrid size={14} className="text-white" />
             </div>
             <span className="font-black text-white text-[12px] tracking-widest uppercase">Blender <span className="text-orange-500">4.0</span></span>
          </div>
          <div className="flex gap-5 text-[11px] text-gray-400 font-semibold tracking-wide">
            {['Ficheiro', 'Editar', 'Render', 'Janela', 'Ajuda'].map(m => (
              <span key={m} className="hover:text-white cursor-pointer transition-colors border-b border-transparent hover:border-orange-500 pb-0.5">{m}</span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-3 bg-black/40 px-4 py-1.5 rounded-full border border-white/5 shadow-inner">
              <div className="flex items-center gap-1.5">
                <Cpu size={12} className="text-blue-400" />
                <span className="text-[10px] text-blue-200/70 font-mono">RTX 4090: ACTIVE</span>
              </div>
              <div className="w-[1px] h-3 bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Activity size={12} className="text-orange-500" />
                <span className="text-[10px] text-orange-200/70 font-mono">{stats.fps} FPS</span>
              </div>
           </div>
           <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-1.5 rounded text-[10px] font-bold shadow-lg transition-all active:scale-95">RENDERIZAR</button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* BARRA DE FERRAMENTAS ESQUERDA */}
        <aside className="w-14 bg-[#2b2b2b] border-r border-black/60 flex flex-col items-center py-6 gap-5 shrink-0 z-40 shadow-2xl">
          <div className="flex flex-col gap-2">
            {[
              { id: 'translate', icon: Move, color: 'bg-blue-600' },
              { id: 'rotate', icon: RotateCcw, color: 'bg-green-600' },
              { id: 'scale', icon: Maximize, color: 'bg-red-600' }
            ].map(tool => (
              <button 
                key={tool.id}
                onClick={() => setTransformMode(tool.id)} 
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${transformMode === tool.id ? `${tool.color} text-white shadow-lg scale-105` : 'text-gray-500 hover:bg-[#3d3d3d] hover:text-gray-300'}`}
              >
                <tool.icon size={20} />
              </button>
            ))}
          </div>

          <div className="h-[1px] w-8 bg-white/5 my-2" />

          <div className="flex flex-col gap-2">
            {[
              { type: 'box', icon: BoxIcon },
              { type: 'sphere', icon: Circle },
              { type: 'cylinder', icon: Target },
              { type: 'plane', icon: Square }
            ].map(prim => (
              <button 
                key={prim.type}
                onClick={() => addPrimitive(prim.type)}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-orange-500/70 hover:bg-orange-500/10 hover:text-orange-400 transition-all border border-transparent hover:border-orange-500/20"
              >
                <prim.icon size={18} />
              </button>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-2 mb-4">
             <button className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-[#3d3d3d]"><Settings size={20} /></button>
          </div>
        </aside>

        {/* VIEWPORT PRINCIPAL */}
        <main className="flex-1 relative bg-[#151515] overflow-hidden group">
          {/* Viewport HUD */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="bg-[#2a2a2a]/90 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-[10px] font-black text-white flex items-center gap-3 shadow-2xl">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="tracking-widest uppercase">Perspetiva de Utilizador</span>
              </div>
              <div className="flex bg-[#2a2a2a]/90 backdrop-blur-md p-1 rounded-lg border border-white/10 shadow-2xl">
                {['wireframe', 'shaded', 'rendered'].map(m => (
                  <button 
                    key={m} 
                    onClick={() => setViewportMode(m)} 
                    className={`px-3 py-1.5 rounded-md text-[9px] uppercase font-black transition-all tracking-tighter ${viewportMode === m ? 'bg-orange-600 text-white shadow-inner' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
               <button onClick={() => setShowGrid(!showGrid)} className={`px-3 py-1.5 rounded-lg border text-[9px] font-bold transition-all ${showGrid ? 'bg-orange-500/20 border-orange-500/40 text-orange-400' : 'bg-[#2a2a2a]/90 border-white/5 text-gray-500'}`}>GRELHA: {showGrid ? 'ON' : 'OFF'}</button>
            </div>
          </div>

          {/* Gizmo de Orientação (Visual apenas) */}
          <div className="absolute top-4 right-4 z-20 w-16 h-16 pointer-events-none opacity-50">
             <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute w-full h-[1px] bg-red-500/50" />
                <div className="absolute h-full w-[1px] bg-green-500/50" />
                <div className="w-2 h-2 bg-white rounded-full z-10" />
             </div>
          </div>
          
          <div ref={containerRef} className="w-full h-full cursor-crosshair" />

          {/* Estatísticas Inferiores */}
          <div className="absolute bottom-4 left-6 pointer-events-none z-20">
             <div className="flex flex-col gap-1">
                <div className="text-[11px] text-white/80 font-bold drop-shadow-md flex items-center gap-2 uppercase tracking-widest">
                   <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                   {selectedObject?.name || 'Cena Principal'}
                </div>
                <div className="text-[9px] text-gray-500 font-mono flex gap-4 uppercase">
                   <span>Vérts: {stats.v.toLocaleString()}</span>
                   <span>Faces: {stats.f.toLocaleString()}</span>
                   <span>Mem: 42.4MB</span>
                </div>
             </div>
          </div>
        </main>

        {/* PAINÉIS LATERAIS DIREITOS */}
        <aside className="w-80 bg-[#2d2d2d] border-l border-black flex flex-col shrink-0 z-40 shadow-2xl relative">
          
          {/* Outliner (Hierarquia) */}
          <div className="h-[40%] flex flex-col border-b border-black/60 shadow-lg overflow-hidden">
             <div className="h-9 bg-[#383838] flex items-center px-4 justify-between border-b border-black/40">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 tracking-widest uppercase">
                  <Layers size={12} className="text-orange-500" /> Outliner
                </div>
                <div className="flex items-center gap-2">
                   <Search size={12} className="text-gray-600" />
                   <Filter size={12} className="text-gray-600" />
                </div>
             </div>
             <div className="flex-1 overflow-y-auto bg-[#232323] custom-scrollbar">
                {objects.map(obj => (
                  <div 
                    key={obj.id} 
                    onClick={() => setSelectedId(obj.id)}
                    className={`flex items-center justify-between px-4 py-2 text-[11px] cursor-pointer transition-all border-l-2 ${selectedId === obj.id ? 'bg-[#4b5d7d] text-white border-blue-400' : 'text-gray-400 hover:bg-[#2d2d2d] border-transparent'}`}
                  >
                    <div className="flex items-center gap-3">
                      {obj.type === 'box' && <BoxIcon size={13} className={selectedId === obj.id ? 'text-blue-300' : 'text-gray-600'} />}
                      {obj.type === 'sphere' && <Circle size={13} className={selectedId === obj.id ? 'text-blue-300' : 'text-gray-600'} />}
                      {obj.type === 'camera' && <Camera size={13} className="text-orange-500/60" />}
                      {obj.type === 'light' && <Sun size={13} className="text-yellow-500/60" />}
                      {obj.type === 'env' && <Globe size={13} className="text-green-500/60" />}
                      <span className={selectedId === obj.id ? 'font-bold' : 'font-medium'}>{obj.name}</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-40 hover:opacity-100">
                      {obj.visible ? <Eye size={12}/> : <EyeOff size={12} className="text-red-500"/>}
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Inspector (Propriedades) */}
          <div className="flex-1 flex flex-col bg-[#2d2d2d] overflow-hidden">
             <div className="h-11 bg-[#383838] flex border-b border-black/60 p-1">
                {[
                  { id: 'object', icon: BoxIcon },
                  { id: 'material', icon: Zap },
                  { id: 'render', icon: Monitor },
                  { id: 'settings', icon: Settings }
                ].map(t => (
                  <button 
                    key={t.id} 
                    onClick={() => setActiveTab(t.id)} 
                    className={`flex-1 flex items-center justify-center transition-all rounded ${activeTab === t.id ? 'bg-[#2d2d2d] text-orange-500 shadow-inner' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    <t.icon size={16} />
                  </button>
                ))}
             </div>
             
             <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-[#2d2d2d]">
                {selectedObject && activeTab === 'object' && (
                  <div className="space-y-1">
                    <SectionHeader title="Transformação" icon={Move} />
                    <div className="p-2 space-y-3">
                        <PropRow label="Localização">
                          <NumberInput label="X" value={selectedObject.state.position[0]} colorClass="text-red-500" />
                          <NumberInput label="Y" value={selectedObject.state.position[1]} colorClass="text-green-500" />
                          <NumberInput label="Z" value={selectedObject.state.position[2]} colorClass="text-blue-500" />
                        </PropRow>
                        <PropRow label="Rotação">
                          <NumberInput label="X" value={selectedObject.state.rotation[0]} colorClass="text-red-500" />
                          <NumberInput label="Y" value={selectedObject.state.rotation[1]} colorClass="text-green-500" />
                          <NumberInput label="Z" value={selectedObject.state.rotation[2]} colorClass="text-blue-500" />
                        </PropRow>
                        <PropRow label="Escala">
                          <NumberInput label="X" value={selectedObject.state.scale[0]} colorClass="text-red-500" />
                          <NumberInput label="Y" value={selectedObject.state.scale[1]} colorClass="text-green-500" />
                          <NumberInput label="Z" value={selectedObject.state.scale[2]} colorClass="text-blue-500" />
                        </PropRow>
                    </div>

                    <SectionHeader title="Visibilidade" icon={Eye} />
                    <div className="p-2 flex gap-4">
                       <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" checked={selectedObject.visible} onChange={(e) => setObjects(objects.map(o => o.id === selectedId ? {...o, visible: e.target.checked} : o))} className="hidden" />
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedObject.visible ? 'bg-orange-500 border-orange-600 shadow-[0_0_8px_rgba(255,102,0,0.4)]' : 'bg-black border-gray-600'}`}>
                             {selectedObject.visible && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                          <span className="text-[10px] uppercase font-black tracking-widest text-gray-400 group-hover:text-white">Renderizável</span>
                       </label>
                    </div>

                    <div className="pt-8 px-2">
                       <button 
                        onClick={() => setObjects(objects.filter(o => o.id !== selectedId))}
                        className="w-full py-2.5 bg-red-900/10 text-red-500 border border-red-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                       >
                         <Trash2 size={12} /> Eliminar Objeto
                       </button>
                    </div>
                  </div>
                )}

                {selectedObject && activeTab === 'material' && (
                  <div className="space-y-1">
                    <SectionHeader title="Superfície" icon={Zap} />
                    <div className="p-3 space-y-5">
                       <div className="space-y-2">
                          <div className="flex justify-between text-[9px] text-gray-500 uppercase font-black"><span>Cor de Albedo</span><span>{selectedObject.color}</span></div>
                          <div className="flex gap-2 items-center">
                             <div className="w-10 h-10 rounded-lg border-2 border-black/40 shadow-xl overflow-hidden cursor-pointer active:scale-90 transition-transform">
                                <input type="color" value={selectedObject.color} onChange={(e) => setObjects(objects.map(o => o.id === selectedId ? {...o, color: e.target.value} : o))} className="w-20 h-20 -translate-x-4 -translate-y-4 cursor-pointer" />
                             </div>
                             <div className="flex-1 bg-black/40 h-10 rounded-lg border border-white/5 flex items-center px-3 font-mono text-[10px] text-gray-400">{selectedObject.color}</div>
                          </div>
                       </div>

                       {['metalness', 'roughness', 'opacity'].map(prop => (
                          <div key={prop} className="space-y-2">
                             <div className="flex justify-between text-[9px] text-gray-400 uppercase font-black tracking-widest">
                                <span>{prop}</span>
                                <span className="text-orange-500 font-mono">{(selectedObject.state[prop] || 0).toFixed(3)}</span>
                             </div>
                             <input 
                              type="range" min="0" max="1" step="0.001" 
                              value={selectedObject.state[prop] ?? 0.5} 
                              onChange={(e) => setObjects(objects.map(o => o.id === selectedId ? {...o, state: {...o.state, [prop]: parseFloat(e.target.value)}} : o))} 
                              className="w-full accent-orange-500 h-1.5 bg-black/60 rounded-full appearance-none cursor-pointer hover:bg-black transition-colors" 
                             />
                          </div>
                       ))}
                    </div>
                    
                    <SectionHeader title="Modos de Blend" icon={Layers} />
                    <div className="p-3">
                       <div className="bg-black/40 rounded-lg border border-white/5 p-2 text-[10px] text-gray-500 italic text-center">
                          Otimizado para motor Eevee (Real-time)
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'render' && (
                  <div className="space-y-4">
                     <SectionHeader title="Motor de Renderização" icon={Monitor} />
                     <div className="p-3 space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                           {['Eevee', 'Cycles'].map(eng => (
                             <button key={eng} className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${eng === 'Eevee' ? 'bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-900/20' : 'bg-black/40 border-white/5 text-gray-500 hover:border-white/10'}`}>{eng}</button>
                           ))}
                        </div>
                        
                        <div className="space-y-3 pt-2">
                           {[
                            { l: 'Sampling', v: '64' },
                            { l: 'Max Bounces', v: '12' },
                            { l: 'Denoising', v: 'OptiX' }
                           ].map(p => (
                             <div key={p.l} className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-[10px] text-gray-400 uppercase font-bold">{p.l}</span>
                                <span className="text-[10px] text-orange-400 font-mono font-bold bg-black/40 px-2 py-0.5 rounded">{p.v}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
                )}
             </div>
          </div>
        </aside>
      </div>

      {/* TIMELINE DE ANIMAÇÃO PROFISSIONAL */}
      <footer className="h-44 bg-[#2b2b2b] border-t border-black flex flex-col shrink-0 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        {/* Toolbar da Timeline */}
        <div className="h-10 bg-[#353535] border-b border-black/60 flex items-center px-6 justify-between">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-black text-orange-500 tracking-[0.2em] uppercase">
                <Clock size={14} /> Animação / Timeline
              </div>
              <div className="h-4 w-[1px] bg-white/10" />
              <div className="flex items-center gap-4">
                 <div className="flex bg-black/40 px-3 py-1 rounded-md border border-white/5 text-[10px] font-mono">
                    <span className="text-gray-500 mr-2">FRAME:</span>
                    <span className="text-white font-bold">{Math.floor(currentTime * fps).toString().padStart(4, '0')}</span>
                 </div>
                 <div className="flex bg-black/40 px-3 py-1 rounded-md border border-white/5 text-[10px] font-mono">
                    <span className="text-gray-500 mr-2">TIME:</span>
                    <span className="text-orange-400 font-bold">{currentTime.toFixed(2)}s</span>
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-3">
              <div className="flex bg-black/40 p-1 rounded-lg border border-white/5 mr-4">
                 <button onClick={() => setCurrentTime(0)} className="p-1.5 text-gray-400 hover:text-white"><RotateCcw size={14}/></button>
                 <button onClick={() => setIsPlaying(!isPlaying)} className={`px-4 py-1 rounded-md flex items-center gap-2 transition-all ${isPlaying ? 'bg-orange-600 text-white shadow-lg' : 'bg-[#444] text-gray-300 hover:bg-[#555]'}`}>
                    {isPlaying ? <Pause size={14} fill="white"/> : <Play size={14} fill="currentColor"/>}
                    <span className="text-[10px] font-black uppercase tracking-widest">{isPlaying ? 'Parar' : 'Play'}</span>
                 </button>
              </div>
              
              <button 
                onClick={() => {
                  if (!selectedObject) return;
                  const mesh = engine.current.meshes.get(selectedId);
                  if (mesh) {
                    const newKf = { 
                      id: Date.now(), 
                      time: currentTime, 
                      state: { 
                        position: [mesh.position.x, mesh.position.y, mesh.position.z], 
                        rotation: [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z], 
                        scale: [mesh.scale.x, mesh.scale.y, mesh.scale.z] 
                      } 
                    };
                    setObjects(objects.map(o => o.id === selectedId ? {...o, keyframes: [...o.keyframes.filter(k => Math.abs(k.time - currentTime) > 0.05), newKf]} : o));
                  }
                }} 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-md shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <Target size={12} /> Keyframe
              </button>
           </div>
        </div>

        {/* Régua e Dopesheet */}
        <div className="flex-1 flex overflow-hidden">
           {/* Sidebar da Timeline */}
           <div className="w-48 bg-[#232323] border-r border-black/40 flex flex-col p-2 gap-1 overflow-y-auto custom-scrollbar">
              <div className="text-[9px] font-black text-gray-600 uppercase mb-2 px-2">Canais Ativos</div>
              {objects.filter(o => o.keyframes.length > 0).map(o => (
                <div key={o.id} className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded text-[10px] text-gray-400 border border-white/5">
                   <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                   <span className="truncate">{o.name}</span>
                </div>
              ))}
              {objects.filter(o => o.keyframes.length > 0).length === 0 && (
                <div className="px-2 py-4 text-[9px] text-gray-700 italic text-center">Sem animação</div>
              )}
           </div>

           {/* Área de Sequência */}
           <div className="flex-1 relative bg-[#181818] overflow-hidden group/timeline cursor-crosshair" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              setCurrentTime((x / rect.width) * maxTime);
           }}>
              {/* Grelha de Fundo */}
              <div className="absolute inset-0 flex">
                 {Array.from({length: 21}).map((_,i) => (
                   <div key={i} className="flex-1 border-r border-white/5 h-full relative group-hover/timeline:border-white/10 transition-colors">
                      <span className="absolute top-1 left-1 text-[8px] text-gray-800 font-mono">{(i * 12).toString()}</span>
                      {i % 2 === 0 && <div className="absolute inset-0 bg-white/[0.01]" />}
                   </div>
                 ))}
              </div>

              {/* Camada de Keyframes */}
              <div className="absolute inset-0 pointer-events-none">
                 {objects.map(obj => (
                    <div key={obj.id} className="h-6 mt-1 relative">
                       {obj.keyframes.map(k => (
                          <div 
                            key={k.id} 
                            className="absolute w-3 h-3 bg-orange-500 rotate-45 border border-white/20 shadow-[0_0_10px_rgba(255,102,0,0.5)] top-1/2 -translate-y-1/2" 
                            style={{ left: `calc(${(k.time/maxTime)*100}% - 6px)` }} 
                          />
                       ))}
                    </div>
                 ))}
              </div>

              {/* Indicador de Reprodução (Playhead) */}
              <div 
                className="absolute top-0 bottom-0 w-[2px] bg-blue-500 z-30 pointer-events-none" 
                style={{ left: `${(currentTime/maxTime)*100}%` }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-b-sm flex items-center justify-center shadow-lg shadow-blue-500/50">
                   <div className="w-1 h-2 bg-white/40 rounded-full" />
                </div>
              </div>
           </div>
        </div>
      </footer>

      {/* ESTILOS CUSTOMIZADOS */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #444; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ff6600; }
        
        input[type=range] { -webkit-appearance: none; background: transparent; }
        input[type=range]::-webkit-slider-thumb { 
          -webkit-appearance: none; 
          height: 14px; width: 14px; 
          border-radius: 50%; 
          background: #ff6600; 
          cursor: pointer; 
          border: 3px solid #111;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
          margin-top: -5px;
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%; height: 4px; background: #111; border-radius: 2px;
        }
      `}</style>
    </div>
  );
}