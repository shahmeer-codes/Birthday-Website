import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SkyEnvironmentsProps {
    progressPercent: number; // 0 to 100%
}

export const SkyEnvironments: React.FC<SkyEnvironmentsProps> = ({ progressPercent }) => {
    const cloudsRef = useRef<THREE.Group>(null);
    const sparklesRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (cloudsRef.current) {
            cloudsRef.current.position.z = (t * 2) % 40 - 20;
        }
        if (sparklesRef.current) {
            sparklesRef.current.rotation.y = t * 0.05;
        }
    });

    // Dynamic environment lighting & fog based on progress (Dreamy -> Sunset -> Starry Sky)
    const isSunset = progressPercent >= 50 && progressPercent < 80;
    const isStarrySky = progressPercent >= 80;

    const skyColor = isStarrySky ? "#140e2b" : isSunset ? "#fdba74" : "#bae6fd";
    const lightColor = isStarrySky ? "#d8b4fe" : isSunset ? "#ff85a1" : "#ffffff";

    return (
        <group>
            {/* Sky Background Color & Ambient Lights */}
            <color attach="background" args={[skyColor]} />
            <ambientLight intensity={isStarrySky ? 0.4 : 0.8} />
            <directionalLight position={[10, 20, 10]} intensity={1.3} color={lightColor} castShadow />

            {/* Floating Puffy Clouds */}
            <group ref={cloudsRef}>
                {[
                    [-12, 2, -15],
                    [12, -1, -25],
                    [-15, -2, -35],
                    [10, 3, -10],
                    [-8, 4, -30],
                    [14, -3, -40],
                ].map((cPos, idx) => (
                    <group key={idx} position={cPos as [number, number, number]} scale={1.8}>
                        <mesh position={[0, 0, 0]}>
                            <sphereGeometry args={[1.2, 16, 16]} />
                            <meshStandardMaterial
                                color={isStarrySky ? "#2e2157" : isSunset ? "#fbcfe8" : "#ffffff"}
                                roughness={0.2}
                                transparent
                                opacity={0.85}
                            />
                        </mesh>
                        <mesh position={[0.8, 0.2, 0.3]}>
                            <sphereGeometry args={[0.9, 16, 16]} />
                            <meshStandardMaterial
                                color={isStarrySky ? "#2e2157" : isSunset ? "#fbcfe8" : "#ffffff"}
                                roughness={0.2}
                                transparent
                                opacity={0.85}
                            />
                        </mesh>
                        <mesh position={[-0.8, -0.1, -0.3]}>
                            <sphereGeometry args={[0.8, 16, 16]} />
                            <meshStandardMaterial
                                color={isStarrySky ? "#2e2157" : isSunset ? "#fbcfe8" : "#ffffff"}
                                roughness={0.2}
                                transparent
                                opacity={0.85}
                            />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* Floating Sparkles & Star Particles */}
            <group ref={sparklesRef}>
                {Array.from({ length: 30 }).map((_, idx) => (
                    <mesh
                        key={idx}
                        position={[
                            (Math.random() - 0.5) * 30,
                            (Math.random() - 0.5) * 15,
                            (Math.random() - 0.5) * 40,
                        ]}
                        scale={0.15}
                    >
                        <sphereGeometry args={[0.15, 8, 8]} />
                        <meshBasicMaterial
                            color={idx % 2 === 0 ? "#ffe066" : "#ff85a1"}
                            transparent
                            opacity={0.7}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
};
