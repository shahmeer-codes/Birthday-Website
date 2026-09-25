import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlayerProps {
    position: [number, number, number];
    rotationY: number;
    isMoving: boolean;
    isWinning?: boolean;
}

export const Player: React.FC<PlayerProps> = ({
    position,
    rotationY,
    isMoving,
    isWinning,
}) => {
    const groupRef = useRef<THREE.Group>(null);
    const leftEarRef = useRef<THREE.Mesh>(null);
    const rightEarRef = useRef<THREE.Mesh>(null);
    const bodyRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.position.set(position[0], position[1], position[2]);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotationY, 0.15);
        }

        if (bodyRef.current) {
            if (isWinning) {
                // Winning celebration jump & spin animation
                bodyRef.current.position.y = Math.abs(Math.sin(t * 10)) * 0.4 + 0.1;
                bodyRef.current.rotation.y = t * 6;
            } else if (isMoving) {
                // Cute walking hop animation
                bodyRef.current.position.y = Math.abs(Math.sin(t * 12)) * 0.18;
                bodyRef.current.rotation.z = Math.sin(t * 12) * 0.08;
            } else {
                // Gentle breathing / idle bobbing
                bodyRef.current.position.y = Math.sin(t * 3) * 0.06;
                bodyRef.current.rotation.z = 0;
                bodyRef.current.rotation.y = 0;
            }
        }

        // Dynamic twitching bunny ears
        if (leftEarRef.current && rightEarRef.current) {
            const earTwitch = Math.sin(t * 4) * 0.12;
            leftEarRef.current.rotation.z = 0.22 + earTwitch;
            rightEarRef.current.rotation.z = -0.22 - earTwitch;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            <group ref={bodyRef}>
                {/* Main Body (Soft Cream-White Pastel Bunny) */}
                <mesh position={[0, 0.4, 0]} castShadow>
                    <sphereGeometry args={[0.38, 32, 32]} />
                    <meshStandardMaterial color="#fffdfa" roughness={0.3} />
                </mesh>

                {/* Head */}
                <mesh position={[0, 0.85, 0.08]} castShadow>
                    <sphereGeometry args={[0.32, 32, 32]} />
                    <meshStandardMaterial color="#fffdfa" roughness={0.3} />
                </mesh>

                {/* Left Bunny Ear */}
                <group position={[-0.14, 1.15, 0.08]}>
                    <mesh ref={leftEarRef} position={[0, 0.25, 0]} rotation={[0, 0, 0.2]} castShadow>
                        <capsuleGeometry args={[0.07, 0.45, 16, 16]} />
                        <meshStandardMaterial color="#fffdfa" roughness={0.3} />
                    </mesh>
                    {/* Inner Soft Pink Ear Lining */}
                    <mesh position={[-0.03, 0.25, 0.02]} rotation={[0, 0, 0.2]}>
                        <capsuleGeometry args={[0.04, 0.35, 12, 12]} />
                        <meshStandardMaterial color="#ffb3c6" roughness={0.4} />
                    </mesh>
                </group>

                {/* Right Bunny Ear */}
                <group position={[0.14, 1.15, 0.08]}>
                    <mesh ref={rightEarRef} position={[0, 0.25, 0]} rotation={[0, 0, -0.2]} castShadow>
                        <capsuleGeometry args={[0.07, 0.45, 16, 16]} />
                        <meshStandardMaterial color="#fffdfa" roughness={0.3} />
                    </mesh>
                    {/* Inner Soft Pink Ear Lining */}
                    <mesh position={[0.03, 0.25, 0.02]} rotation={[0, 0, -0.2]}>
                        <capsuleGeometry args={[0.04, 0.35, 12, 12]} />
                        <meshStandardMaterial color="#ffb3c6" roughness={0.4} />
                    </mesh>
                </group>

                {/* Cute Expressive Dark Eyes */}
                <mesh position={[-0.11, 0.9, 0.35]}>
                    <sphereGeometry args={[0.045, 16, 16]} />
                    <meshStandardMaterial color="#1e1b2e" roughness={0.1} />
                </mesh>
                <mesh position={[0.11, 0.9, 0.35]}>
                    <sphereGeometry args={[0.045, 16, 16]} />
                    <meshStandardMaterial color="#1e1b2e" roughness={0.1} />
                </mesh>
                {/* Eye Catchlight (White Highlights) */}
                <mesh position={[-0.1, 0.92, 0.39]}>
                    <sphereGeometry args={[0.016, 8, 8]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
                <mesh position={[0.12, 0.92, 0.39]}>
                    <sphereGeometry args={[0.016, 8, 8]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>

                {/* Cute Pink Nose */}
                <mesh position={[0, 0.83, 0.38]}>
                    <sphereGeometry args={[0.035, 12, 12]} />
                    <meshStandardMaterial color="#ff5c8a" roughness={0.2} />
                </mesh>

                {/* Soft Rosy Cheeks */}
                <mesh position={[-0.18, 0.82, 0.33]}>
                    <sphereGeometry args={[0.05, 12, 12]} />
                    <meshBasicMaterial color="#ff85a1" transparent opacity={0.6} />
                </mesh>
                <mesh position={[0.18, 0.82, 0.33]}>
                    <sphereGeometry args={[0.05, 12, 12]} />
                    <meshBasicMaterial color="#ff85a1" transparent opacity={0.6} />
                </mesh>

                {/* Girlish Pastel Rose Ribbon Bow */}
                <group position={[0, 0.62, 0.32]}>
                    <mesh rotation={[0, 0, 0.4]}>
                        <coneGeometry args={[0.08, 0.16, 12]} />
                        <meshStandardMaterial color="#ff5c8a" roughness={0.3} />
                    </mesh>
                    <mesh rotation={[0, 0, -0.4]}>
                        <coneGeometry args={[0.08, 0.16, 12]} />
                        <meshStandardMaterial color="#ff5c8a" roughness={0.3} />
                    </mesh>
                    <mesh position={[0, 0, 0.02]}>
                        <sphereGeometry args={[0.04, 12, 12]} />
                        <meshStandardMaterial color="#ffe066" roughness={0.2} />
                    </mesh>
                </group>

                {/* Tiny Paws */}
                <mesh position={[-0.15, 0.22, 0.22]}>
                    <sphereGeometry args={[0.08, 12, 12]} />
                    <meshStandardMaterial color="#fffdfa" roughness={0.4} />
                </mesh>
                <mesh position={[0.15, 0.22, 0.22]}>
                    <sphereGeometry args={[0.08, 12, 12]} />
                    <meshStandardMaterial color="#fffdfa" roughness={0.4} />
                </mesh>

                {/* Fluffy Tail */}
                <mesh position={[0, 0.35, -0.36]} castShadow>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.5} />
                </mesh>
            </group>
        </group>
    );
};
