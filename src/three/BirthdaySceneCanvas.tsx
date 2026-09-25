import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { BirthdayCake } from './3DCake';
import { Balloons } from './Balloons';
import { FloatingHearts } from './FloatingHearts';
import { GiftBoxes } from './GiftBoxes';
import { ParticleBackground } from './ParticleBackground';
import { GiftSurprise } from '../types';

interface BirthdaySceneCanvasProps {
    isBlownOut: boolean;
    isWishMode: boolean;
    gifts: GiftSurprise[];
    onCakeClick: () => void;
    onOpenGift: (gift: GiftSurprise) => void;
}

// Camera Mouse Parallax Rig
const CameraRig: React.FC<{ isWishMode: boolean }> = ({ isWishMode }) => {
    useFrame((state) => {
        const { mouse, camera } = state;

        // Smooth camera target based on mouse position
        const targetX = mouse.x * 0.8;
        const targetY = mouse.y * 0.4 + (isWishMode ? 0.3 : 0.8);
        const targetZ = isWishMode ? 4.2 : 5.5;

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);

        camera.lookAt(0, isWishMode ? 0.5 : 0.2, 0);
    });

    return null;
};

export const BirthdaySceneCanvas: React.FC<BirthdaySceneCanvasProps> = ({
    isBlownOut,
    isWishMode,
    gifts,
    onCakeClick,
    onOpenGift,
}) => {
    return (
        <div className="w-full h-full absolute inset-0 pointer-events-auto">
            <Canvas
                camera={{ position: [0, 0.8, 5.5], fov: 45 }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
                <CameraRig isWishMode={isWishMode} />

                {/* Dynamic Scene Lighting */}
                <ambientLight intensity={isWishMode ? 0.25 : 0.65} />

                {/* Soft Warm Main Light */}
                <directionalLight
                    position={[5, 8, 5]}
                    intensity={isWishMode ? 0.4 : 1.4}
                    color="#fff0f5"
                    castShadow
                />

                {/* Fill Accent Light (Rose/Lavender) */}
                <directionalLight
                    position={[-5, 4, -2]}
                    intensity={isWishMode ? 0.2 : 0.8}
                    color="#d8b4fe"
                />

                {/* Dynamic Wish Point Light */}
                <pointLight
                    position={[0, 2, 2]}
                    intensity={isWishMode ? 2.5 : 0.8}
                    color={isWishMode ? "#ffe066" : "#ff85a1"}
                    distance={8}
                />

                {/* Ambient Particle Dust */}
                <ParticleBackground />

                {/* 3D Floating Elements with Soft Float Physics */}
                <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
                    <group position={[0, -0.2, 0]}>
                        <BirthdayCake
                            isBlownOut={isBlownOut}
                            isWishMode={isWishMode}
                            onCakeClick={onCakeClick}
                        />

                        <Balloons />
                        <FloatingHearts />
                        <GiftBoxes gifts={gifts} onOpenGift={onOpenGift} />
                    </group>
                </Float>
            </Canvas>
        </div>
    );
};
