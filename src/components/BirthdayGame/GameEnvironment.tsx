import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const GameEnvironment: React.FC = () => {
    const cloudsGroupRef = useRef<THREE.Group>(null);
    const balloonsGroupRef = useRef<THREE.Group>(null);
    const heartsRainGroupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (cloudsGroupRef.current) {
            cloudsGroupRef.current.rotation.y = t * 0.02;
        }
        if (balloonsGroupRef.current) {
            balloonsGroupRef.current.children.forEach((b, idx) => {
                b.position.y = (b.userData.baseY || 1) + Math.sin(t * 1.5 + idx) * 0.3;
            });
        }
        if (heartsRainGroupRef.current) {
            heartsRainGroupRef.current.children.forEach((h) => {
                h.position.y -= 0.02;
                if (h.position.y < 0.2) h.position.y = 4.5;
                h.rotation.y += 0.03;
            });
        }
    });

    return (
        <group>
            {/* Central Floating Birthday Garden Island */}
            <mesh position={[0, -0.7, 0]} receiveShadow castShadow>
                <cylinderGeometry args={[9.0, 8.0, 1.2, 64]} />
                <meshStandardMaterial color="#bbf7d0" roughness={0.6} />
            </mesh>
            {/* Island Pastel Soil Base */}
            <mesh position={[0, -1.8, 0]} receiveShadow castShadow>
                <cylinderGeometry args={[8.0, 5.5, 1.0, 64]} />
                <meshStandardMaterial color="#fbcfe8" roughness={0.7} />
            </mesh>

            {/* Decorative Gold Rim Trim Around Island */}
            <mesh position={[0, -0.1, 0]}>
                <torusGeometry args={[9.02, 0.06, 16, 64]} />
                <meshStandardMaterial color="#ffe066" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Area Dividers / Low-Poly Pink & Lavender Trees */}
            {[
                [-6.5, 0.5, -4],
                [7.0, 0.5, -3.5],
                [-6.0, 0.5, 6.0],
                [6.5, 0.5, 5.5],
                [0, 0.5, -7.5],
            ].map((pos, i) => (
                <group key={i} position={pos as [number, number, number]}>
                    <mesh position={[0, 0.5, 0]} castShadow>
                        <cylinderGeometry args={[0.12, 0.18, 1.0, 8]} />
                        <meshStandardMaterial color="#f472b6" roughness={0.5} />
                    </mesh>
                    <mesh position={[0, 1.2, 0]} castShadow>
                        <coneGeometry args={[0.7, 1.2, 8]} />
                        <meshStandardMaterial color={i % 2 === 0 ? "#ff85a1" : "#d8b4fe"} roughness={0.4} />
                    </mesh>
                    <mesh position={[0, 1.7, 0]} castShadow>
                        <coneGeometry args={[0.5, 1.0, 8]} />
                        <meshStandardMaterial color={i % 2 === 0 ? "#f8c8dc" : "#e9d5ff"} roughness={0.4} />
                    </mesh>
                </group>
            ))}

            {/* Floating Puffy White & Blush Clouds */}
            <group ref={cloudsGroupRef} position={[0, 4.2, 0]}>
                {[
                    [-8, 0, -4],
                    [8, 1, 4],
                    [-4, 0.5, 8],
                    [5, -0.5, -8],
                ].map((cPos, idx) => (
                    <group key={idx} position={cPos as [number, number, number]} scale={1.2}>
                        <mesh position={[0, 0, 0]}>
                            <sphereGeometry args={[0.8, 16, 16]} />
                            <meshStandardMaterial color="#ffffff" roughness={0.1} transparent opacity={0.9} />
                        </mesh>
                        <mesh position={[0.6, 0.1, 0.2]}>
                            <sphereGeometry args={[0.6, 16, 16]} />
                            <meshStandardMaterial color="#fff0f5" roughness={0.1} transparent opacity={0.9} />
                        </mesh>
                        <mesh position={[-0.6, -0.1, -0.2]}>
                            <sphereGeometry args={[0.55, 16, 16]} />
                            <meshStandardMaterial color="#ffffff" roughness={0.1} transparent opacity={0.9} />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* Floating Balloons Parade */}
            <group ref={balloonsGroupRef}>
                {[
                    { pos: [-4, 2, -4], color: '#ff85a1' },
                    { pos: [4, 2.5, -3], color: '#d8b4fe' },
                    { pos: [-5, 2.2, 4], color: '#ffe066' },
                    { pos: [5, 2.8, 4], color: '#ffb3c6' },
                ].map((b, idx) => (
                    <group key={idx} position={b.pos as [number, number, number]} userData={{ baseY: b.pos[1] }}>
                        <mesh castShadow>
                            <sphereGeometry args={[0.35, 24, 24]} />
                            <meshStandardMaterial color={b.color} roughness={0.2} />
                        </mesh>
                        <mesh position={[0, -0.38, 0]}>
                            <coneGeometry args={[0.05, 0.08, 10]} />
                            <meshStandardMaterial color={b.color} />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* Gentle Floating Heart Rain Particles */}
            <group ref={heartsRainGroupRef}>
                {Array.from({ length: 12 }).map((_, idx) => (
                    <mesh
                        key={idx}
                        position={[
                            (Math.random() - 0.5) * 14,
                            1 + Math.random() * 3.5,
                            (Math.random() - 0.5) * 14,
                        ]}
                        scale={0.25}
                    >
                        <sphereGeometry args={[0.2, 8, 8]} />
                        <meshBasicMaterial color={idx % 2 === 0 ? "#ff85a1" : "#d8b4fe"} transparent opacity={0.7} />
                    </mesh>
                ))}
            </group>

            {/* Small Flowers & Ribbons Decorated Around Island */}
            {Array.from({ length: 22 }).map((_, idx) => {
                const angle = (idx / 22) * Math.PI * 2;
                const radius = 2.2 + (idx % 6) * 1.1;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                return (
                    <mesh key={idx} position={[x, -0.05, z]}>
                        <sphereGeometry args={[0.08, 8, 8]} />
                        <meshStandardMaterial color={idx % 2 === 0 ? "#ff85a1" : "#f8c8dc"} />
                    </mesh>
                );
            })}
        </group>
    );
};
