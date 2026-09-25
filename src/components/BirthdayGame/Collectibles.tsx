import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CollectibleItem } from '../../game/gameConfig';

interface CollectiblesProps {
    items: CollectibleItem[];
}

// 3D 5-Point Star Geometry
const StarMesh: React.FC<{ item: CollectibleItem }> = ({ item }) => {
    const starGroup = useRef<THREE.Group>(null);
    const isFinal = item.type === 'final_star';

    const starShape = React.useMemo(() => {
        const shape = new THREE.Shape();
        const points = 5;
        const outerRadius = isFinal ? 0.42 : 0.28;
        const innerRadius = isFinal ? 0.18 : 0.12;

        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) shape.moveTo(x, y);
            else shape.lineTo(x, y);
        }
        return shape;
    }, [isFinal]);

    const extrudeSettings = {
        depth: isFinal ? 0.12 : 0.08,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.03,
        bevelThickness: 0.03,
    };

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (starGroup.current && !item.collected) {
            starGroup.current.rotation.y = t * (isFinal ? 2.5 : 1.5);
            starGroup.current.position.y = item.position[1] + Math.sin(t * 2.5 + item.position[0]) * 0.12;
        }
    });

    if (item.collected) return null;

    return (
        <group ref={starGroup} position={item.position}>
            <mesh castShadow>
                <extrudeGeometry args={[starShape, extrudeSettings]} />
                <meshStandardMaterial
                    color={isFinal ? "#ffe066" : "#ffd166"}
                    roughness={0.2}
                    metalness={0.8}
                    emissive="#ffe066"
                    emissiveIntensity={isFinal ? 0.7 : 0.3}
                />
            </mesh>

            {/* Halo Glow for Final Star */}
            {isFinal && (
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[0.45, 0.55, 32]} />
                    <meshBasicMaterial color="#ffe066" transparent opacity={0.6} side={THREE.DoubleSide} />
                </mesh>
            )}
            <pointLight color="#ffe066" intensity={isFinal ? 3.0 : 1.2} distance={isFinal ? 3.0 : 1.5} />
        </group>
    );
};

// 3D Beating Heart Mesh
const HeartMesh: React.FC<{ item: CollectibleItem }> = ({ item }) => {
    const groupRef = useRef<THREE.Group>(null);

    const heartShape = React.useMemo(() => {
        const shape = new THREE.Shape();
        const x = 0, y = 0;
        shape.moveTo(x + 0.2, y + 0.2);
        shape.bezierCurveTo(x + 0.2, y + 0.2, x + 0.15, y, x, y);
        shape.bezierCurveTo(x - 0.2, y, x - 0.2, y + 0.25, x - 0.2, y + 0.25);
        shape.bezierCurveTo(x - 0.2, y + 0.4, x - 0.05, y + 0.55, x + 0.2, y + 0.7);
        shape.bezierCurveTo(x + 0.45, y + 0.55, x + 0.6, y + 0.4, x + 0.6, y + 0.25);
        shape.bezierCurveTo(x + 0.6, y + 0.25, x + 0.6, y, x + 0.4, y);
        shape.bezierCurveTo(x + 0.28, y, x + 0.2, y + 0.2, x + 0.2, y + 0.2);
        return shape;
    }, []);

    const extrudeSettings = {
        depth: 0.08,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.03,
        bevelThickness: 0.03,
    };

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current && !item.collected) {
            const beat = 1 + Math.sin(t * 5) * 0.08;
            groupRef.current.scale.set(0.7 * beat, 0.7 * beat, 0.7 * beat);
            groupRef.current.rotation.y = t * 1.8;
            groupRef.current.position.y = item.position[1] + Math.sin(t * 2 + item.position[0]) * 0.1;
        }
    });

    if (item.collected) return null;

    return (
        <group ref={groupRef} position={item.position}>
            <mesh castShadow>
                <extrudeGeometry args={[heartShape, extrudeSettings]} />
                <meshStandardMaterial color="#ff5c8a" roughness={0.2} emissive="#ff5c8a" emissiveIntensity={0.3} />
            </mesh>
            <pointLight color="#ff85a1" intensity={1.2} distance={1.2} />
        </group>
    );
};

// 3D Floating Ribbon Mesh
const RibbonMesh: React.FC<{ item: CollectibleItem }> = ({ item }) => {
    const ribbonRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ribbonRef.current && !item.collected) {
            ribbonRef.current.rotation.y = t * 2.0;
            ribbonRef.current.position.y = item.position[1] + Math.sin(t * 2.2) * 0.1;
        }
    });

    if (item.collected) return null;

    return (
        <group ref={ribbonRef} position={item.position} scale={0.7}>
            <mesh rotation={[0, 0, 0.4]}>
                <coneGeometry args={[0.15, 0.35, 12]} />
                <meshStandardMaterial color="#d8b4fe" roughness={0.3} />
            </mesh>
            <mesh rotation={[0, 0, -0.4]}>
                <coneGeometry args={[0.15, 0.35, 12]} />
                <meshStandardMaterial color="#d8b4fe" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0, 0.02]}>
                <sphereGeometry args={[0.08, 12, 12]} />
                <meshStandardMaterial color="#ffe066" />
            </mesh>
            <pointLight color="#d8b4fe" intensity={1.2} distance={1.2} />
        </group>
    );
};

// 3D Blooming Flower Mesh
const FlowerMesh: React.FC<{ item: CollectibleItem }> = ({ item }) => {
    const flowerRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (flowerRef.current && !item.collected) {
            flowerRef.current.rotation.y = t * 1.2;
            flowerRef.current.position.y = item.position[1] + Math.sin(t * 2) * 0.08;
        }
    });

    if (item.collected) return null;

    return (
        <group ref={flowerRef} position={item.position} scale={0.8}>
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial color="#ffe066" />
            </mesh>
            {[0, 1, 2, 3, 4].map((p) => (
                <mesh
                    key={p}
                    position={[
                        Math.cos((p / 5) * Math.PI * 2) * 0.18,
                        0,
                        Math.sin((p / 5) * Math.PI * 2) * 0.18,
                    ]}
                    rotation={[0.3, (p / 5) * Math.PI * 2, 0]}
                >
                    <sphereGeometry args={[0.1, 12, 12]} />
                    <meshStandardMaterial color="#ff85a1" roughness={0.3} />
                </mesh>
            ))}
            <pointLight color="#ff85a1" intensity={1.0} distance={1.2} />
        </group>
    );
};

// 3D Secret Gift Box Mesh
const SecretGiftMesh: React.FC<{ item: CollectibleItem }> = ({ item }) => {
    const giftRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (giftRef.current && !item.collected) {
            giftRef.current.rotation.y = t * 1.5;
            giftRef.current.position.y = item.position[1] + Math.sin(t * 2) * 0.1;
        }
    });

    if (item.collected) return null;

    return (
        <group ref={giftRef} position={item.position} scale={0.85}>
            <mesh castShadow>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshStandardMaterial color="#ff85a1" roughness={0.3} />
            </mesh>
            {/* Gold Ribbon */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.42, 0.41, 0.1]} />
                <meshStandardMaterial color="#ffe066" metalness={0.6} />
            </mesh>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.1, 0.41, 0.42]} />
                <meshStandardMaterial color="#ffe066" metalness={0.6} />
            </mesh>
            <pointLight color="#ff85a1" intensity={1.5} distance={1.5} />
        </group>
    );
};

export const Collectibles: React.FC<CollectiblesProps> = ({ items }) => {
    return (
        <group>
            {items.map((item) => {
                if (item.type === 'star' || item.type === 'final_star') return <StarMesh key={item.id} item={item} />;
                if (item.type === 'heart') return <HeartMesh key={item.id} item={item} />;
                if (item.type === 'ribbon') return <RibbonMesh key={item.id} item={item} />;
                if (item.type === 'flower') return <FlowerMesh key={item.id} item={item} />;
                if (item.type === 'gift') return <SecretGiftMesh key={item.id} item={item} />;
                return null;
            })}
        </group>
    );
};
