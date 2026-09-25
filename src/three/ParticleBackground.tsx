import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ParticleBackground: React.FC = () => {
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, colors } = React.useMemo(() => {
        const count = 180;
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);

        const colorChoices = [
            new THREE.Color("#ffb3c6"),
            new THREE.Color("#d8b4fe"),
            new THREE.Color("#ffe066"),
            new THREE.Color("#ffffff"),
            new THREE.Color("#f8c8dc"),
        ];

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 16;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

            const chosenColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
            col[i * 3] = chosenColor.r;
            col[i * 3 + 1] = chosenColor.g;
            col[i * 3 + 2] = chosenColor.b;
        }

        return { positions: pos, colors: col };
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (pointsRef.current) {
            pointsRef.current.rotation.y = t * 0.03;
            pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.05;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.07}
                vertexColors
                transparent
                opacity={0.7}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};
