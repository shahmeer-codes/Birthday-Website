import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AirplaneModelProps {
    position: [number, number, number];
    rotation: [number, number, number];
    isFiring?: boolean;
}

export const AirplaneModel: React.FC<AirplaneModelProps> = ({
    position,
    rotation,
    isFiring,
}) => {
    const groupRef = useRef<THREE.Group>(null);
    const propellerRef = useRef<THREE.Mesh>(null);
    const ribbonTailRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        // Smooth movement lerp
        if (groupRef.current) {
            groupRef.current.position.set(position[0], position[1], position[2]);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotation[0], 0.15);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotation[1], 0.15);
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, rotation[2], 0.15);
        }

        // Fast propeller spin
        if (propellerRef.current) {
            propellerRef.current.rotation.z += delta * 25;
        }

        // Fluttering birthday ribbon on tail
        if (ribbonTailRef.current) {
            ribbonTailRef.current.rotation.z = Math.sin(t * 10) * 0.15;
            ribbonTailRef.current.rotation.y = Math.cos(t * 8) * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Main Rounded Fuselage (Blush Pink & Soft Cream Toy Plane) */}
            <mesh position={[0, 0, 0]} castShadow>
                <capsuleGeometry args={[0.35, 1.2, 16, 32]} />
                <meshStandardMaterial color="#fff5f7" roughness={0.25} />
            </mesh>

            {/* Nose Cone */}
            <mesh position={[0, 0, 0.75]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <coneGeometry args={[0.34, 0.45, 32]} />
                <meshStandardMaterial color="#ff85a1" roughness={0.3} />
            </mesh>

            {/* Propeller Hub */}
            <mesh position={[0, 0, 0.98]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color="#ffe066" metalness={0.8} />
            </mesh>

            {/* Spinning Propeller Blades */}
            <mesh ref={propellerRef} position={[0, 0, 1.0]}>
                <boxGeometry args={[0.9, 0.12, 0.02]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.85} />
            </mesh>

            {/* Main Wings (Cute Rounded pastel wings) */}
            <group position={[0, 0, 0.1]}>
                {/* Left Wing */}
                <mesh position={[-0.95, 0, 0]} rotation={[0, 0, 0.05]} castShadow>
                    <boxGeometry args={[1.3, 0.06, 0.45]} />
                    <meshStandardMaterial color="#ff85a1" roughness={0.3} />
                </mesh>
                {/* Right Wing */}
                <mesh position={[0.95, 0, 0]} rotation={[0, 0, -0.05]} castShadow>
                    <boxGeometry args={[1.3, 0.06, 0.45]} />
                    <meshStandardMaterial color="#ff85a1" roughness={0.3} />
                </mesh>

                {/* Wing Tip Glow Orbs */}
                <mesh position={[-1.6, 0, 0]}>
                    <sphereGeometry args={[0.07, 12, 12]} />
                    <meshBasicMaterial color="#ffe066" />
                </mesh>
                <mesh position={[1.6, 0, 0]}>
                    <sphereGeometry args={[0.07, 12, 12]} />
                    <meshBasicMaterial color="#ffe066" />
                </mesh>
            </group>

            {/* Tail Stabilizer */}
            <mesh position={[0, 0.35, -0.6]} rotation={[-0.2, 0, 0]} castShadow>
                <boxGeometry args={[0.06, 0.45, 0.35]} />
                <meshStandardMaterial color="#d8b4fe" roughness={0.3} />
            </mesh>

            {/* Cute Cockpit Canopy (Translucent Soft Pink Glass) */}
            <mesh position={[0, 0.22, 0.2]}>
                <sphereGeometry args={[0.26, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#d8b4fe" transparent opacity={0.7} roughness={0.1} />
            </mesh>

            {/* Fluttering Birthday Ribbon Tail */}
            <group ref={ribbonTailRef} position={[0, 0.1, -0.75]}>
                <mesh position={[0, 0, -0.3]}>
                    <boxGeometry args={[0.08, 0.15, 0.6]} />
                    <meshStandardMaterial color="#ff5c8a" roughness={0.4} />
                </mesh>
                <mesh position={[0, 0, -0.7]}>
                    <boxGeometry args={[0.06, 0.12, 0.5]} />
                    <meshStandardMaterial color="#ffe066" roughness={0.4} />
                </mesh>
            </group>

            {/* Glowing Engine Particle Exhaust */}
            <pointLight position={[0, 0, -0.7]} color="#ff85a1" intensity={1.5} distance={1.2} />
            {isFiring && (
                <pointLight position={[0, 0, 0.8]} color="#ffe066" intensity={3.5} distance={2.5} />
            )}
        </group>
    );
};
