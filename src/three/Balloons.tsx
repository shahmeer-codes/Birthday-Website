import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BalloonData {
    id: number;
    position: [number, number, number];
    color: string;
    scale: number;
    speed: number;
    floatOffset: number;
}

export const Balloons: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);

    const balloons: BalloonData[] = React.useMemo(() => [
        { id: 1, position: [-2.8, 1.2, -1.2], color: "#ff85a1", scale: 0.9, speed: 0.8, floatOffset: 0 },
        { id: 2, position: [2.9, 1.6, -1.5], color: "#d8b4fe", scale: 1.0, speed: 0.9, floatOffset: 1.5 },
        { id: 3, position: [-3.4, 2.8, -2.5], color: "#f8c8dc", scale: 1.2, speed: 0.6, floatOffset: 3.0 },
        { id: 4, position: [3.5, 3.1, -2.2], color: "#e0a96d", scale: 0.85, speed: 1.1, floatOffset: 4.2 },
        { id: 5, position: [-1.8, 3.4, -3.0], color: "#ffb3c6", scale: 1.1, speed: 0.7, floatOffset: 2.1 },
        { id: 6, position: [1.9, 3.8, -2.8], color: "#e9d5ff", scale: 0.95, speed: 1.0, floatOffset: 0.8 },
    ], []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.children.forEach((balloon, idx) => {
                const data = balloons[idx];
                if (data) {
                    // Soft vertical bobbing & lateral wind sway
                    balloon.position.y = data.position[1] + Math.sin(t * data.speed + data.floatOffset) * 0.25;
                    balloon.position.x = data.position[0] + Math.cos(t * 0.5 * data.speed + data.floatOffset) * 0.15;
                    balloon.rotation.z = Math.sin(t * 0.8 + data.floatOffset) * 0.08;
                    balloon.rotation.y = Math.cos(t * 0.5 + data.floatOffset) * 0.12;
                }
            });
        }
    });

    return (
        <group ref={groupRef}>
            {balloons.map((b) => (
                <group key={b.id} position={b.position} scale={b.scale}>
                    {/* Balloon Body (Stylized Tear-drop Sphere) */}
                    <mesh castShadow>
                        <sphereGeometry args={[0.42, 32, 32]} />
                        <meshStandardMaterial
                            color={b.color}
                            roughness={0.25}
                            metalness={0.1}
                        />
                    </mesh>

                    {/* Balloon Glossy Highlight */}
                    <mesh position={[-0.12, 0.15, 0.28]}>
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
                    </mesh>

                    {/* Balloon Knot */}
                    <mesh position={[0, -0.44, 0]}>
                        <coneGeometry args={[0.06, 0.08, 12]} />
                        <meshStandardMaterial color={b.color} roughness={0.3} />
                    </mesh>

                    {/* Balloon String */}
                    <mesh position={[0, -1.2, 0]}>
                        <cylinderGeometry args={[0.005, 0.005, 1.5, 8]} />
                        <meshStandardMaterial color="#ffffff" transparent opacity={0.35} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};
