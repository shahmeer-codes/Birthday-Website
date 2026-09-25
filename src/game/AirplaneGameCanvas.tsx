import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, RotateCcw, Pause, Heart, Gift } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { AirplaneModel } from './airplane/AirplaneModel';
import { Projectiles, Projectile, ImpactExplosion } from './airplane/Projectiles';
import { SkyCollectibles, SkyItem } from './collectibles/SkyCollectibles';
import { SkyEnvironments } from './environments/SkyEnvironments';
import { AirplaneControls } from './controls/AirplaneControls';
import { CakeReveal3D } from './victory/CakeReveal3D';
import { WinningCinematic } from './victory/WinningCinematic';

const initialSkyItems: SkyItem[] = [
    { id: 'star_1', type: 'star', position: [-3, 1, -10], collected: false, value: 10 },
    { id: 'ring_1', type: 'ring', position: [0, 0, -18], collected: false, value: 15 },
    { id: 'target_1', type: 'target', position: [3, 1.5, -25], collected: false, value: 15 },
    { id: 'heart_1', type: 'heart', position: [-2.5, 0.5, -32], collected: false, value: 10 },
    { id: 'ring_2', type: 'ring', position: [2, 0, -40], collected: false, value: 15 },
    { id: 'target_2', type: 'target', position: [-3, 1, -48], collected: false, value: 15 },
    { id: 'star_2', type: 'star', position: [0, 2, -55], collected: false, value: 10 },
    { id: 'final_target', type: 'final_target', position: [0, 0.5, -65], collected: false, value: 20 },
];

const GameLoop: React.FC<{
    planePos: [number, number, number];
    planeRot: [number, number, number];
    gameStatus: string;
    items: SkyItem[];
    projectiles: Projectile[];
    isFiring: boolean;
    onUpdatePlane: (pos: [number, number, number], rot: [number, number, number]) => void;
    onCollectItem: (item: SkyItem) => void;
    onHitTarget: (targetId: string, hitPos: [number, number, number]) => void;
    touchDir: 'up' | 'down' | 'left' | 'right' | 'none';
    keysPressed: Record<string, boolean>;
}> = ({
    planePos,
    planeRot,
    gameStatus,
    items,
    projectiles,
    isFiring,
    onUpdatePlane,
    onCollectItem,
    onHitTarget,
    touchDir,
    keysPressed,
}) => {
        useFrame((state, delta) => {
            if (gameStatus !== 'playing') return;

            let dx = 0;
            let dy = 0;

            if (keysPressed['KeyW'] || keysPressed['ArrowUp'] || touchDir === 'up') dy += 1;
            if (keysPressed['KeyS'] || keysPressed['ArrowDown'] || touchDir === 'down') dy -= 1;
            if (keysPressed['KeyA'] || keysPressed['ArrowLeft'] || touchDir === 'left') dx -= 1;
            if (keysPressed['KeyD'] || keysPressed['ArrowRight'] || touchDir === 'right') dx += 1;

            let newX = planePos[0] + dx * 7.5 * delta;
            let newY = planePos[1] + dy * 5.5 * delta;
            let newZ = planePos[2] - 8.0 * delta; // Forward flight motion

            newX = Math.max(-5.5, Math.min(5.5, newX));
            newY = Math.max(-2.5, Math.min(3.5, newY));

            // Roll and pitch bank inclination angles
            const rollZ = -dx * 0.35;
            const pitchX = dy * 0.2;

            onUpdatePlane([newX, newY, newZ], [pitchX, 0, rollZ]);

            // Camera Lerp tracking plane position
            state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, newX * 0.4, 0.1);
            state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, newY * 0.3 + 2.5, 0.1);
            state.camera.position.z = newZ + 6.5;

            // Plane Collision with Collectibles (Radius: 1.35)
            items.forEach((item) => {
                if (!item.collected) {
                    const dist = Math.hypot(newX - item.position[0], newY - item.position[1], newZ - item.position[2]);
                    if (dist < 1.35) {
                        onCollectItem(item);
                    }
                }
            });

            // Projectile Collision with Targets
            projectiles.forEach((p) => {
                items.forEach((item) => {
                    if (!item.collected && (item.type === 'target' || item.type === 'final_target')) {
                        const pDist = Math.hypot(p.position[0] - item.position[0], p.position[1] - item.position[1], p.position[2] - item.position[2]);
                        if (pDist < 1.4) {
                            onHitTarget(item.id, item.position);
                        }
                    }
                });
            });
        });

        return (
            <>
                <AirplaneModel position={planePos} rotation={planeRot} isFiring={isFiring} />
                <Projectiles projectiles={projectiles} explosions={[]} />
                <SkyCollectibles items={items} />
                {gameStatus === 'completed' && <CakeReveal3D litCandles={5} />}
            </>
        );
    };

export const AirplaneGameCanvas: React.FC<{ onContinueCelebration: () => void }> = ({
    onContinueCelebration,
}) => {
    const [gameStatus, setGameStatus] = useState<'intro' | 'playing' | 'paused' | 'completed'>('intro');
    const [planePos, setPlanePos] = useState<[number, number, number]>([0, 0, 0]);
    const [planeRot, setPlaneRot] = useState<[number, number, number]>([0, 0, 0]);
    const [items, setItems] = useState<SkyItem[]>(initialSkyItems);
    const [projectiles, setProjectiles] = useState<Projectile[]>([]);
    const [explosions, setExplosions] = useState<ImpactExplosion[]>([]);
    const [progressPercent, setProgressPercent] = useState(0);
    const [score, setScore] = useState(0);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [touchDir, setTouchDir] = useState<'up' | 'down' | 'left' | 'right' | 'none'>('none');
    const [isFiring, setIsFiring] = useState(false);
    const keysPressed = useRef<Record<string, boolean>>({});

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            keysPressed.current[e.code] = true;
            if (e.code === 'Space') fireProjectile();
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            keysPressed.current[e.code] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [planePos, gameStatus]);

    const fireProjectile = () => {
        if (gameStatus !== 'playing') return;
        setIsFiring(true);
        setTimeout(() => setIsFiring(false), 200);

        const newProj: Projectile = {
            id: `proj_${Date.now()}`,
            position: [planePos[0], planePos[1] + 0.1, planePos[2] - 0.8],
            velocity: [0, 0, -22],
            life: 1.0,
        };
        setProjectiles((prev) => [...prev, newProj]);
    };

    const handleCollectItem = (collected: SkyItem) => {
        setItems((prev) => prev.map((i) => (i.id === collected.id ? { ...i, collected: true } : i)));
        setScore((s) => s + collected.value);

        const collectedCount = items.filter((i) => i.collected).length + 1;
        const newProg = Math.min(100, Math.round((collectedCount / items.length) * 100));
        setProgressPercent(newProg);

        if (collected.type === 'final_target') {
            setTimeout(() => setGameStatus('completed'), 800);
        }
    };

    const handleHitTarget = (targetId: string, hitPos: [number, number, number]) => {
        const targetItem = items.find((i) => i.id === targetId);
        if (targetItem) {
            handleCollectItem(targetItem);
            setToastMessage("✨ Target Burst!");
            setTimeout(() => setToastMessage(null), 2000);
        }
    };

    const handleRestart = () => {
        setGameStatus('playing');
        setPlanePos([0, 0, 0]);
        setPlaneRot([0, 0, 0]);
        setItems(initialSkyItems.map((i) => ({ ...i, collected: false })));
        setProjectiles([]);
        setExplosions([]);
        setProgressPercent(0);
        setScore(0);
        setToastMessage(null);
    };

    return (
        <div className="relative w-full h-[550px] sm:h-[650px] rounded-3xl overflow-hidden glass-card border border-rose-300/30 shadow-2xl">
            <Canvas shadows camera={{ position: [0, 2.5, 6.5], fov: 50 }}>
                <SkyEnvironments progressPercent={progressPercent} />
                <GameLoop
                    planePos={planePos}
                    planeRot={planeRot}
                    gameStatus={gameStatus}
                    items={items}
                    projectiles={projectiles}
                    isFiring={isFiring}
                    onUpdatePlane={(pos, rot) => {
                        setPlanePos(pos);
                        setPlaneRot(rot);
                    }}
                    onCollectItem={handleCollectItem}
                    onHitTarget={handleHitTarget}
                    touchDir={touchDir}
                    keysPressed={keysPressed.current}
                />
            </Canvas>

            {/* Glassmorphic Progress HUD */}
            {gameStatus === 'playing' && (
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                    <div className="px-5 py-2.5 rounded-2xl glass-card border border-rose-300/30 flex items-center gap-3 shadow-xl pointer-events-auto">
                        <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-rose-300 font-mono">Birthday Magic</span>
                            <div className="w-28 sm:w-36 h-2 rounded-full bg-white/20 overflow-hidden mt-1">
                                <div className="h-full bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                            </div>
                        </div>
                        <span className="text-xs font-bold font-mono text-amber-300">{progressPercent}%</span>
                    </div>

                    <button
                        onClick={() => setGameStatus('paused')}
                        className="p-2.5 rounded-2xl glass-card border border-white/20 text-slate-200 hover:text-white pointer-events-auto transition-colors"
                    >
                        <Pause className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Game Intro Overlay */}
            {gameStatus === 'intro' && (
                <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-[#09060e]/80 backdrop-blur-md rounded-3xl">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full p-8 glass-card rounded-3xl border border-rose-300/30 text-center shadow-2xl">
                        <div className="inline-flex p-4 rounded-2xl bg-rose-500/10 border border-rose-400/20 text-rose-300 mb-4 shadow-inner">
                            <Sparkles className="w-8 h-8 animate-pulse" />
                        </div>
                        <h3 className="font-serif text-3xl font-bold text-slate-100 mb-3">{birthdayConfig.gameTitle}</h3>
                        <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">{birthdayConfig.gameSubtitle}</p>
                        <button onClick={() => setGameStatus('playing')} className="px-9 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white font-bold text-base shadow-[0_0_35px_rgba(255,92,138,0.7)] hover:scale-105 transition-all">
                            Start the Birthday Adventure ✈️
                        </button>
                    </motion.div>
                </div>
            )}

            {/* Airplane Controls */}
            {gameStatus === 'playing' && (
                <AirplaneControls onMove={(dir) => setTouchDir(dir)} onFire={fireProjectile} />
            )}

            {/* 8-Phase Victory Cinematic Overlay */}
            {gameStatus === 'completed' && (
                <WinningCinematic onContinueCelebration={onContinueCelebration} onReplayGame={handleRestart} />
            )}
        </div>
    );
};
