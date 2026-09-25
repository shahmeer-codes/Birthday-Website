import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { gameConfig, initialCollectibles, CollectibleItem } from '../../game/gameConfig';
import { birthdayConfig } from '../../data/birthdayConfig';
import { Player } from './Player';
import { Collectibles } from './Collectibles';
import { GameEnvironment } from './GameEnvironment';
import { GameCamera } from './GameCamera';
import { GameHUD } from './GameHUD';
import { MobileControls } from './MobileControls';
import { WinningSequence } from './WinningSequence';

// Inner game logic loop inside R3F Canvas context
const GameLoop: React.FC<{
    playerPos: [number, number, number];
    playerRot: number;
    isMoving: boolean;
    gameStatus: string;
    items: CollectibleItem[];
    onUpdatePlayer: (pos: [number, number, number], rot: number, moving: boolean) => void;
    onCollect: (item: CollectibleItem) => void;
    touchDir: 'up' | 'down' | 'left' | 'right' | 'none';
    keysPressed: Record<string, boolean>;
}> = ({
    playerPos,
    playerRot,
    isMoving,
    gameStatus,
    items,
    onUpdatePlayer,
    onCollect,
    touchDir,
    keysPressed,
}) => {
        useFrame((_, delta) => {
            if (gameStatus !== 'playing') return;

            let moveX = 0;
            let moveZ = 0;

            if (keysPressed['KeyW'] || keysPressed['ArrowUp'] || touchDir === 'up') moveZ -= 1;
            if (keysPressed['KeyS'] || keysPressed['ArrowDown'] || touchDir === 'down') moveZ += 1;
            if (keysPressed['KeyA'] || keysPressed['ArrowLeft'] || touchDir === 'left') moveX -= 1;
            if (keysPressed['KeyD'] || keysPressed['ArrowRight'] || touchDir === 'right') moveX += 1;

            const moving = moveX !== 0 || moveZ !== 0;

            let newRot = playerRot;
            let newX = playerPos[0];
            let newZ = playerPos[2];

            if (moving) {
                const angle = Math.atan2(moveX, moveZ);
                newRot = angle;

                const speed = gameConfig.playerSpeed * delta;
                newX += Math.sin(angle) * speed;
                newZ += Math.cos(angle) * speed;

                // Clamp movement within world radius
                const dist = Math.sqrt(newX * newX + newZ * newZ);
                if (dist > gameConfig.worldRadius) {
                    newX = (newX / dist) * gameConfig.worldRadius;
                    newZ = (newZ / dist) * gameConfig.worldRadius;
                }
            }

            onUpdatePlayer([newX, 0.4, newZ], newRot, moving);

            // Collision Check with Collectibles (Radius: 0.85 units)
            items.forEach((item) => {
                if (!item.collected) {
                    const dx = newX - item.position[0];
                    const dz = newZ - item.position[2];
                    const distance = Math.sqrt(dx * dx + dz * dz);

                    if (distance < 0.85) {
                        onCollect(item);
                    }
                }
            });
        });

        return (
            <>
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 15, 10]} intensity={1.3} castShadow />
                <pointLight position={[0, 8, 0]} intensity={0.6} color="#ffe066" />

                <GameEnvironment />
                <Collectibles items={items} />
                <Player
                    position={playerPos}
                    rotationY={playerRot}
                    isMoving={isMoving}
                    isWinning={gameStatus === 'completed'}
                />
                <GameCamera targetPosition={playerPos} isCompleted={gameStatus === 'completed'} />
            </>
        );
    };

export const GameCanvas: React.FC<{ onContinueCelebration: () => void }> = ({
    onContinueCelebration,
}) => {
    const [gameStatus, setGameStatus] = useState<'intro' | 'playing' | 'paused' | 'completed'>('intro');
    const [playerPos, setPlayerPos] = useState<[number, number, number]>([0, 0.4, 0]);
    const [playerRot, setPlayerRot] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const [items, setItems] = useState<CollectibleItem[]>(initialCollectibles);
    const [starsCollected, setStarsCollected] = useState(0);
    const [score, setScore] = useState(0);
    const [secretsFound, setSecretsFound] = useState(0);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [touchDir, setTouchDir] = useState<'up' | 'down' | 'left' | 'right' | 'none'>('none');
    const keysPressed = useRef<Record<string, boolean>>({});

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            keysPressed.current[e.code] = true;
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
    }, []);

    const handleStartGame = () => {
        setGameStatus('playing');
    };

    const handlePauseGame = () => setGameStatus('paused');
    const handleResumeGame = () => setGameStatus('playing');

    const handleRestartGame = () => {
        setGameStatus('playing');
        setPlayerPos([0, 0.4, 0]);
        setPlayerRot(0);
        setIsMoving(false);
        setItems(initialCollectibles.map(i => ({ ...i, collected: false })));
        setStarsCollected(0);
        setScore(0);
        setSecretsFound(0);
        setToastMessage(null);
    };

    const handleCollect = (collectedItem: CollectibleItem) => {
        setItems((prev) =>
            prev.map((i) => (i.id === collectedItem.id ? { ...i, collected: true } : i))
        );

        setScore((s) => s + collectedItem.value);

        if (collectedItem.type === 'star' || collectedItem.type === 'final_star') {
            const newStars = starsCollected + 1;
            setStarsCollected(newStars);

            if (newStars === gameConfig.requiredStars - 1) {
                setToastMessage("One last little star... ✨");
            }

            if (newStars >= gameConfig.requiredStars) {
                setTimeout(() => {
                    setGameStatus('completed');
                }, 600);
            }
        } else if (collectedItem.type === 'gift') {
            setSecretsFound((sec) => sec + 1);
            if (collectedItem.message) setToastMessage(collectedItem.message);
        } else if (collectedItem.type === 'heart') {
            setToastMessage("💗 Pure Joy Collected!");
        } else if (collectedItem.type === 'ribbon') {
            setToastMessage("🎀 Sparkles Unwrapped!");
        }

        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };

    return (
        <div className="relative w-full h-[550px] sm:h-[650px] rounded-3xl overflow-hidden glass-card border border-rose-300/30 shadow-2xl">
            <Canvas shadows camera={{ position: [0, 4.5, 6.5], fov: 50 }}>
                <GameLoop
                    playerPos={playerPos}
                    playerRot={playerRot}
                    isMoving={isMoving}
                    gameStatus={gameStatus}
                    items={items}
                    onUpdatePlayer={(pos, rot, moving) => {
                        setPlayerPos(pos);
                        setPlayerRot(rot);
                        setIsMoving(moving);
                    }}
                    onCollect={handleCollect}
                    touchDir={touchDir}
                    keysPressed={keysPressed.current}
                />
            </Canvas>

            {/* Girlish Game HUD */}
            <GameHUD
                starsCollected={starsCollected}
                requiredStars={gameConfig.requiredStars}
                score={score}
                secretsFound={secretsFound}
                totalSecrets={gameConfig.totalSecrets}
                gameStatus={gameStatus}
                toastMessage={toastMessage}
                onStartGame={handleStartGame}
                onPauseGame={handlePauseGame}
                onResumeGame={handleResumeGame}
                onRestartGame={handleRestartGame}
            />

            {/* Mobile Touch D-Pad */}
            {gameStatus === 'playing' && (
                <MobileControls onDirectionPress={(dir) => setTouchDir(dir)} />
            )}

            {/* Cinematic 6-Phase Winning Sequence */}
            {gameStatus === 'completed' && (
                <WinningSequence
                    name={birthdayConfig.name}
                    onContinue={onContinueCelebration}
                />
            )}
        </div>
    );
};
