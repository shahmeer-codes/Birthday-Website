import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CandleFlameProps {
    position: [number, number, number];
    isBlownOut: boolean;
    scale?: number;
}

export const CandleFlame: React.FC<CandleFlameProps> = ({ position, isBlownOut, scale = 1 }) => {
    const flameRef = useRef<THREE.Group>(null);
    const lightRef = useRef<THREE.PointLight>(null);
    const smokeRef = useRef<THREE.Points>(null);

    // Generate smoke particles
    const smokeParticles = React.useMemo(() => {
        const count = 35;
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 0.15;
            positions[i * 3 + 1] = Math.random() * 0.8;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
            sizes[i] = Math.random() * 0.08 + 0.04;
        }
        return { positions, sizes };
    }, []);

    useFrame((state) => {
        const clock = state.clock.getElapsedTime();

        if (flameRef.current && !isBlownOut) {
            // Natural flame flicker animation
            const flicker = Math.sin(clock * 12 + position[0] * 10) * 0.15 + Math.cos(clock * 17) * 0.1;
            flameRef.current.scale.set(
                scale * (1 + flicker * 0.2),
                scale * (1 + Math.sin(clock * 20) * 0.25),
                scale * (1 + flicker * 0.2)
            );
            flameRef.current.rotation.z = Math.sin(clock * 8) * 0.1;

            if (lightRef.current) {
                lightRef.current.intensity = 1.8 + Math.sin(clock * 25) * 0.5;
            }
        }

        if (smokeRef.current && isBlownOut) {
            const positions = smokeRef.current.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < 35; i++) {
                positions[i * 3 + 1] += 0.008; // Rise upward
                positions[i * 3] += Math.sin(clock * 3 + i) * 0.002;
                if (positions[i * 3 + 1] > 1.2) {
                    positions[i * 3 + 1] = 0;
                }
            }
            smokeRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <group position={position}>
            {!isBlownOut ? (
                <group ref={flameRef}>
                    {/* Flame Core (Bright yellow-white) */}
                    <mesh position={[0, 0.15, 0]}>
                        <sphereGeometry args={[0.06 * scale, 16, 16]} />
                        <meshBasicMaterial color="#fffbe6" />
                    </mesh>

                    {/* Flame Outer Glow (Soft warm orange-rose) */}
                    <mesh position={[0, 0.2, 0]}>
                        <coneGeometry args={[0.09 * scale, 0.3 * scale, 16]} />
                        <meshBasicMaterial color="#ff7b00" transparent opacity={0.85} />
                    </mesh>

                    {/* Flame Halo */}
                    <mesh position={[0, 0.22, 0]}>
                        <coneGeometry args={[0.13 * scale, 0.4 * scale, 16]} />
                        <meshBasicMaterial color="#ff3366" transparent opacity={0.35} />
                    </mesh>

                    {/* Dynamic Light Source */}
                    <pointLight
                        ref={lightRef}
                        color="#ffaa44"
                        intensity={2}
                        distance={2.5}
                        decay={2}
                    />
                </group>
            ) : (
                /* Smoke when candle is blown out */
                <points ref={smokeRef} position={[0, 0.1, 0]}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[smokeParticles.positions, 3]}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        size={0.06}
                        color="#e2e8f0"
                        transparent
                        opacity={0.5}
                        blending={THREE.AdditiveBlending}
                    />
                </points>
            )}

            {/* Wick */}
            <mesh position={[0, 0.04, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 0.08, 8]} />
                <meshStandardMaterial color="#2d3748" />
            </mesh>
        </group>
    );
};
