import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Stylized 3D Flower Mesh
const SingleFlower3D: React.FC<{ position: [number, number, number]; color: string; scale?: number; delay?: number }> = ({
    position,
    color,
    scale = 1,
    delay = 0,
}) => {
    const flowerRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (flowerRef.current) {
            // Wind swaying motion
            flowerRef.current.rotation.z = Math.sin(t * 1.5 + delay) * 0.08;
            flowerRef.current.rotation.x = Math.cos(t * 1.2 + delay) * 0.06;
        }
    });

    return (
        <group ref={flowerRef} position={position} scale={scale}>
            {/* Stem */}
            <mesh position={[0, 0.4, 0]} castShadow>
                <cylinderGeometry args={[0.025, 0.03, 0.8, 12]} />
                <meshStandardMaterial color="#4ade80" roughness={0.5} />
            </mesh>

            {/* Leaves */}
            <mesh position={[0.08, 0.3, 0]} rotation={[0, 0, -0.6]}>
                <coneGeometry args={[0.06, 0.25, 8]} />
                <meshStandardMaterial color="#22c55e" roughness={0.4} />
            </mesh>
            <mesh position={[-0.08, 0.45, 0]} rotation={[0, 0, 0.6]}>
                <coneGeometry args={[0.06, 0.25, 8]} />
                <meshStandardMaterial color="#22c55e" roughness={0.4} />
            </mesh>

            {/* Flower Head */}
            <group position={[0, 0.8, 0]}>
                {/* Center Disc */}
                <mesh position={[0, 0, 0.05]} castShadow>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.2} />
                </mesh>

                {/* Petals (6 petals in a ring) */}
                {Array.from({ length: 6 }).map((_, i) => {
                    const angle = (i / 6) * Math.PI * 2;
                    const x = Math.cos(angle) * 0.16;
                    const y = Math.sin(angle) * 0.16;
                    return (
                        <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle]} castShadow>
                            <coneGeometry args={[0.09, 0.32, 12]} />
                            <meshStandardMaterial color={color} roughness={0.3} />
                        </mesh>
                    );
                })}
            </group>
        </group>
    );
};

// 3D Animated Butterfly Mesh
const Butterfly3D: React.FC<{ initialPos: [number, number, number]; color: string; speed?: number }> = ({
    initialPos,
    color,
    speed = 1,
}) => {
    const butterflyRef = useRef<THREE.Group>(null);
    const leftWingRef = useRef<THREE.Mesh>(null);
    const rightWingRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (butterflyRef.current) {
            // Smooth flutter flight path
            butterflyRef.current.position.x = initialPos[0] + Math.sin(t * 0.8 * speed) * 1.4;
            butterflyRef.current.position.y = initialPos[1] + Math.cos(t * 1.2 * speed) * 0.5 + Math.sin(t * 2) * 0.2;
            butterflyRef.current.position.z = initialPos[2] + Math.cos(t * 0.6 * speed) * 1.0;
            butterflyRef.current.rotation.y = Math.sin(t * 0.8 * speed) * 0.5;
        }

        // Wing flapping
        const flap = Math.sin(t * 16 * speed) * 0.8;
        if (leftWingRef.current) leftWingRef.current.rotation.y = flap;
        if (rightWingRef.current) rightWingRef.current.rotation.y = -flap;
    });

    return (
        <group ref={butterflyRef} position={initialPos} scale={0.6}>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>

            {/* Left Wing */}
            <mesh ref={leftWingRef} position={[-0.12, 0, 0]}>
                <coneGeometry args={[0.15, 0.3, 12]} />
                <meshStandardMaterial color={color} roughness={0.2} transparent opacity={0.9} />
            </mesh>

            {/* Right Wing */}
            <mesh ref={rightWingRef} position={[0.12, 0, 0]}>
                <coneGeometry args={[0.15, 0.3, 12]} />
                <meshStandardMaterial color={color} roughness={0.2} transparent opacity={0.9} />
            </mesh>
        </group>
    );
};

export const FlowerGarden3DCanvas: React.FC = () => {
    const flowerData = [
        { pos: [-2.2, -1.2, 0] as [number, number, number], color: "#ff85a1", scale: 1.1, delay: 0 },
        { pos: [-1.2, -1.3, 0.8] as [number, number, number], color: "#d8b4fe", scale: 0.95, delay: 1 },
        { pos: [-0.2, -1.2, -0.4] as [number, number, number], color: "#f8c8dc", scale: 1.2, delay: 2 },
        { pos: [0.8, -1.3, 0.5] as [number, number, number], color: "#ff5c8a", scale: 1.0, delay: 0.5 },
        { pos: [1.9, -1.2, -0.2] as [number, number, number], color: "#e0a96d", scale: 1.15, delay: 1.5 },
    ];

    return (
        <div className="w-full h-[400px] md:h-[500px] relative rounded-3xl overflow-hidden glass-card my-12">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.8} />
                <directionalLight position={[4, 6, 4]} intensity={1.5} color="#fff0f5" castShadow />
                <pointLight position={[-3, 2, 2]} intensity={1.2} color="#ff85a1" />
                <pointLight position={[3, 2, 2]} intensity={1.2} color="#d8b4fe" />

                {/* Floating 3D Garden Elements */}
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
                    <group position={[0, 0, 0]}>
                        {flowerData.map((f, i) => (
                            <SingleFlower3D
                                key={i}
                                position={f.pos}
                                color={f.color}
                                scale={f.scale}
                                delay={f.delay}
                            />
                        ))}

                        {/* Fluttering Butterflies */}
                        <Butterfly3D initialPos={[-1.5, 0.5, 0.2]} color="#ff85a1" speed={1.2} />
                        <Butterfly3D initialPos={[1.2, 0.8, -0.3]} color="#d8b4fe" speed={0.9} />
                        <Butterfly3D initialPos={[0, 1.2, 0.5]} color="#ffe066" speed={1.1} />
                    </group>
                </Float>

                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
            </Canvas>

            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none px-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/20 text-xs font-medium text-rose-200 backdrop-blur-md">
                    🌸 Interactive 3D Garden — Drag to rotate view
                </span>
            </div>
        </div>
    );
};
