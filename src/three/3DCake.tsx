import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CandleFlame } from './CandleFlame';

interface BirthdayCakeProps {
    isBlownOut: boolean;
    onCakeClick?: () => void;
    isWishMode?: boolean;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({
    isBlownOut,
    onCakeClick,
    isWishMode = false,
}) => {
    const cakeGroup = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const [clickScale, setClickScale] = useState(1);

    // Sparkles particle count around cake
    const sparkParticles = React.useMemo(() => {
        const count = 45;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const radius = 1.2 + Math.random() * 0.8;
            const angle = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.2) * 2;
            pos[i * 3] = Math.cos(angle) * radius;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = Math.sin(angle) * radius;
        }
        return pos;
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (cakeGroup.current) {
            // Gentle floating rotation
            cakeGroup.current.rotation.y = Math.sin(t * 0.4) * 0.15;
            cakeGroup.current.position.y = Math.sin(t * 1.5) * 0.06;

            // Elastic click animation recovery
            if (clickScale > 1) {
                setClickScale((prev) => Math.max(1, prev - 0.03));
            }
        }
    });

    const handleClick = (e: any) => {
        e.stopPropagation();
        setClickScale(1.15);
        if (onCakeClick) onCakeClick();
    };

    // Candle positions on the top tier
    const candlePositions: [number, number, number][] = [
        [0, 1.45, 0],
        [0.3, 1.42, 0.2],
        [-0.3, 1.42, 0.2],
        [0.2, 1.42, -0.3],
        [-0.2, 1.42, -0.3],
    ];

    return (
        <group
            ref={cakeGroup}
            position={[0, -0.6, 0]}
            scale={clickScale * (hovered ? 1.03 : 1)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={handleClick}
        >
            {/* Porcelain Cake Plate */}
            <mesh position={[0, -0.05, 0]} receiveShadow>
                <cylinderGeometry args={[2.2, 2.0, 0.12, 64]} />
                <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0.1}
                />
            </mesh>

            {/* Plate Gold Rim Accent */}
            <mesh position={[0, -0.05, 0]}>
                <torusGeometry args={[2.22, 0.03, 16, 64]} />
                <meshStandardMaterial color="#e0a96d" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Base Tier 1 (Bottom - Soft Rose Pink) */}
            <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[1.7, 1.7, 0.7, 64]} />
                <meshStandardMaterial
                    color="#ffb3c6"
                    roughness={0.4}
                    metalness={0.05}
                />
            </mesh>
            {/* Tier 1 Frosting Trim */}
            <mesh position={[0, 0.05, 0]}>
                <torusGeometry args={[1.72, 0.06, 16, 64]} />
                <meshStandardMaterial color="#fff0f5" roughness={0.3} />
            </mesh>

            {/* Tier 2 (Middle - Blush Lavender Cream) */}
            <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[1.2, 1.2, 0.6, 64]} />
                <meshStandardMaterial
                    color="#e9d5ff"
                    roughness={0.35}
                    metalness={0.05}
                />
            </mesh>
            {/* Tier 2 Gold Decorative Ribbon */}
            <mesh position={[0, 0.6, 0]}>
                <torusGeometry args={[1.22, 0.04, 16, 64]} />
                <meshStandardMaterial color="#e0a96d" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Tier 3 (Top - Pure Cream White) */}
            <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.75, 0.75, 0.45, 64]} />
                <meshStandardMaterial
                    color="#fff5f7"
                    roughness={0.25}
                    metalness={0.05}
                />
            </mesh>

            {/* Top Tier Pearl Border */}
            {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const x = Math.cos(angle) * 0.76;
                const z = Math.sin(angle) * 0.76;
                return (
                    <mesh key={i} position={[x, 1.48, z]}>
                        <sphereGeometry args={[0.045, 16, 16]} />
                        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} />
                    </mesh>
                );
            })}

            {/* Decorative Edible Flowers on Top */}
            {[
                { pos: [0.45, 1.49, 0.45], col: "#ff5c8a" },
                { pos: [-0.45, 1.49, -0.35], col: "#d8b4fe" },
                { pos: [-0.4, 1.49, 0.4], col: "#f8c8dc" },
            ].map((flower, idx) => (
                <group key={idx} position={flower.pos as [number, number, number]}>
                    <mesh>
                        <sphereGeometry args={[0.07, 12, 12]} />
                        <meshStandardMaterial color={flower.col} />
                    </mesh>
                    <mesh position={[0, 0.03, 0]}>
                        <sphereGeometry args={[0.03, 8, 8]} />
                        <meshStandardMaterial color="#e0a96d" metalness={0.8} />
                    </mesh>
                </group>
            ))}

            {/* Candles & Flames */}
            {candlePositions.map((pos, idx) => (
                <group key={idx}>
                    {/* Candle Body */}
                    <mesh position={[pos[0], pos[1] - 0.08, pos[2]]}>
                        <cylinderGeometry args={[0.03, 0.03, 0.22, 16]} />
                        <meshStandardMaterial
                            color={idx % 2 === 0 ? "#ff85a1" : "#d8b4fe"}
                            roughness={0.2}
                        />
                    </mesh>
                    {/* Candle Flame Component */}
                    <CandleFlame position={pos} isBlownOut={isBlownOut} />
                </group>
            ))}

            {/* Ambient Wish Sparkle Particles */}
            <points position={[0, 0.8, 0]}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[sparkParticles, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={isWishMode ? 0.09 : 0.045}
                    color={isWishMode ? "#ffe066" : "#ffb3c6"}
                    transparent
                    opacity={isWishMode ? 0.9 : 0.6}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Warm Point Light below top tier */}
            <pointLight
                position={[0, 1.2, 0]}
                intensity={isBlownOut ? 0.2 : 1.5}
                distance={3.5}
                color="#ffa8c5"
            />
        </group>
    );
};
