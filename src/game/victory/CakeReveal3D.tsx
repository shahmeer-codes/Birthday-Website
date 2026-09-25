import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CakeReveal3DProps {
    litCandles: number; // 0 to 5
}

export const CakeReveal3D: React.FC<CakeReveal3DProps> = ({ litCandles }) => {
    const cakeGroupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (cakeGroupRef.current) {
            cakeGroupRef.current.rotation.y = t * 0.3;
        }
    });

    return (
        <group ref={cakeGroupRef} position={[0, -0.2, 0]}>
            {/* Porcelain Plate */}
            <mesh position={[0, -0.05, 0]} receiveShadow castShadow>
                <cylinderGeometry args={[1.5, 1.4, 0.08, 64]} />
                <meshStandardMaterial color="#ffffff" roughness={0.1} />
            </mesh>

            {/* Bottom Tier Cake (Vanilla Base & Pink Frosting) */}
            <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
                <cylinderGeometry args={[1.2, 1.2, 0.6, 64]} />
                <meshStandardMaterial color="#fff0f5" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.58, 0]} receiveShadow castShadow>
                <cylinderGeometry args={[1.22, 1.22, 0.08, 64]} />
                <meshStandardMaterial color="#ff85a1" roughness={0.2} />
            </mesh>

            {/* Top Tier Cake */}
            <mesh position={[0, 0.85, 0]} receiveShadow castShadow>
                <cylinderGeometry args={[0.8, 0.8, 0.5, 64]} />
                <meshStandardMaterial color="#fffdfa" roughness={0.3} />
            </mesh>
            <mesh position={[0, 1.08, 0]} receiveShadow castShadow>
                <cylinderGeometry args={[0.82, 0.82, 0.06, 64]} />
                <meshStandardMaterial color="#ff85a1" roughness={0.2} />
            </mesh>

            {/* 5 Candles & Flames */}
            {[0, 1, 2, 3, 4].map((i) => {
                const angle = (i / 5) * Math.PI * 2;
                const x = Math.cos(angle) * 0.45;
                const z = Math.sin(angle) * 0.45;
                const isLit = i < litCandles;

                return (
                    <group key={i} position={[x, 1.12, z]}>
                        {/* Candle Stick */}
                        <mesh position={[0, 0.2, 0]} castShadow>
                            <cylinderGeometry args={[0.04, 0.04, 0.4, 16]} />
                            <meshStandardMaterial color={isLit ? "#ffb3c6" : "#475569"} />
                        </mesh>

                        {/* Candle Flame & Glow */}
                        {isLit && (
                            <group position={[0, 0.45, 0]}>
                                <mesh>
                                    <sphereGeometry args={[0.06, 12, 12]} />
                                    <meshBasicMaterial color="#ffe066" />
                                </mesh>
                                <pointLight color="#ffe066" intensity={2.5} distance={1.8} />
                            </group>
                        )}
                    </group>
                );
            })}
        </group>
    );
};
