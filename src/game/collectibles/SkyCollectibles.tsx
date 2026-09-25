import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface SkyItem {
    id: string;
    type: 'star' | 'heart' | 'ring' | 'gift' | 'target' | 'final_target';
    position: [number, number, number];
    collected: boolean;
    value: number;
}

interface SkyCollectiblesProps {
    items: SkyItem[];
}

// 3D Magic Ring Mesh
const MagicRingMesh: React.FC<{ item: SkyItem }> = ({ item }) => {
    const ringRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ringRef.current && !item.collected) {
            ringRef.current.rotation.z = t * 1.5;
        }
    });

    if (item.collected) return null;

    return (
        <group ref={ringRef} position={item.position}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.7, 0.08, 16, 32]} />
                <meshStandardMaterial color="#ffe066" emissive="#ffe066" emissiveIntensity={0.6} metalness={0.8} />
            </mesh>
            <pointLight color="#ffe066" intensity={2.0} distance={2.0} />
        </group>
    );
};

// 3D Magical Target Mesh (Balloon Target)
const TargetMesh: React.FC<{ item: SkyItem }> = ({ item }) => {
    const targetRef = useRef<THREE.Group>(null);
    const isFinal = item.type === 'final_target';

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (targetRef.current && !item.collected) {
            targetRef.current.position.y = item.position[1] + Math.sin(t * 3 + item.position[0]) * 0.15;
            targetRef.current.rotation.y = t * 2.0;
        }
    });

    if (item.collected) return null;

    return (
        <group ref={targetRef} position={item.position} scale={isFinal ? 1.5 : 1.0}>
            <mesh castShadow>
                <sphereGeometry args={[0.45, 24, 24]} />
                <meshStandardMaterial
                    color={isFinal ? "#ff85a1" : "#d8b4fe"}
                    roughness={0.2}
                    emissive={isFinal ? "#ff85a1" : "#d8b4fe"}
                    emissiveIntensity={isFinal ? 0.8 : 0.4}
                />
            </mesh>
            {/* Target Bullseye Ring */}
            <mesh rotation={[0, 0, 0]}>
                <torusGeometry args={[0.5, 0.03, 16, 32]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            <pointLight color={isFinal ? "#ff85a1" : "#d8b4fe"} intensity={isFinal ? 4.0 : 2.0} distance={isFinal ? 4.0 : 2.0} />
        </group>
    );
};

// 3D Star Mesh
const StarMesh: React.FC<{ item: SkyItem }> = ({ item }) => {
    const starRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (starRef.current && !item.collected) {
            starRef.current.rotation.y = t * 2.0;
            starRef.current.position.y = item.position[1] + Math.sin(t * 2) * 0.1;
        }
    });

    if (item.collected) return null;

    return (
        <group ref={starRef} position={item.position} scale={0.7}>
            <mesh castShadow>
                <octahedronGeometry args={[0.35, 0]} />
                <meshStandardMaterial color="#ffe066" emissive="#ffe066" emissiveIntensity={0.5} metalness={0.8} />
            </mesh>
            <pointLight color="#ffe066" intensity={1.5} distance={1.5} />
        </group>
    );
};

// 3D Heart Mesh
const HeartMesh: React.FC<{ item: SkyItem }> = ({ item }) => {
    const heartRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (heartRef.current && !item.collected) {
            const beat = 1 + Math.sin(t * 5) * 0.1;
            heartRef.current.scale.set(0.6 * beat, 0.6 * beat, 0.6 * beat);
            heartRef.current.rotation.y = t * 1.8;
            heartRef.current.position.y = item.position[1] + Math.sin(t * 2.5) * 0.1;
        }
    });

    if (item.collected) return null;

    return (
        <group ref={heartRef} position={item.position}>
            <mesh castShadow>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color="#ff5c8a" emissive="#ff5c8a" emissiveIntensity={0.4} />
            </mesh>
            <pointLight color="#ff85a1" intensity={1.5} distance={1.5} />
        </group>
    );
};

export const SkyCollectibles: React.FC<SkyCollectiblesProps> = ({ items }) => {
    return (
        <group>
            {items.map((item) => {
                if (item.type === 'ring') return <MagicRingMesh key={item.id} item={item} />;
                if (item.type === 'target' || item.type === 'final_target') return <TargetMesh key={item.id} item={item} />;
                if (item.type === 'star') return <StarMesh key={item.id} item={item} />;
                if (item.type === 'heart') return <HeartMesh key={item.id} item={item} />;
                return null;
            })}
        </group>
    );
};
