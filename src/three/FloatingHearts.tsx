import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeartProps {
    position: [number, number, number];
    scale?: number;
    color?: string;
    speed?: number;
}

const SingleHeart: React.FC<HeartProps> = ({
    position,
    scale = 0.3,
    color = "#ff5c8a",
    speed = 1.0,
}) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    // Create a smooth 3D Extruded Heart Shape
    const heartShape = React.useMemo(() => {
        const shape = new THREE.Shape();
        const x = 0, y = 0;
        shape.moveTo(x + 0.25, y + 0.25);
        shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
        shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
        shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 1.0);
        shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
        shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
        shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
        return shape;
    }, []);

    const extrudeSettings = {
        depth: 0.12,
        bevelEnabled: true,
        bevelSegments: 5,
        steps: 2,
        bevelSize: 0.04,
        bevelThickness: 0.04,
    };

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 0.18;
            meshRef.current.rotation.y = Math.sin(t * 0.5 * speed) * 0.4 + Math.PI;
            meshRef.current.rotation.z = Math.cos(t * 0.7 * speed) * 0.1;
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            scale={hovered ? scale * 1.3 : scale}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            castShadow
        >
            <extrudeGeometry args={[heartShape, extrudeSettings]} />
            <meshStandardMaterial
                color={hovered ? "#ff3366" : color}
                roughness={0.2}
                metalness={0.1}
                emissive={hovered ? "#ff3366" : "#000000"}
                emissiveIntensity={hovered ? 0.4 : 0}
            />
        </mesh>
    );
};

export const FloatingHearts: React.FC = () => {
    const heartPositions: { pos: [number, number, number]; color: string; scale: number; speed: number }[] = [
        { pos: [-2.2, 0.4, 1.2], color: "#ff85a1", scale: 0.22, speed: 1.2 },
        { pos: [2.3, 0.6, 1.0], color: "#ff5c8a", scale: 0.25, speed: 0.9 },
        { pos: [-1.4, 2.2, -0.8], color: "#f8c8dc", scale: 0.2, speed: 1.1 },
        { pos: [1.6, 2.4, -0.6], color: "#d8b4fe", scale: 0.24, speed: 1.3 },
        { pos: [-3.2, 1.8, -0.5], color: "#ffb3c6", scale: 0.28, speed: 0.8 },
        { pos: [3.1, 1.9, -0.4], color: "#ff85a1", scale: 0.26, speed: 1.0 },
    ];

    return (
        <group>
            {heartPositions.map((h, i) => (
                <SingleHeart
                    key={i}
                    position={h.pos}
                    color={h.color}
                    scale={h.scale}
                    speed={h.speed}
                />
            ))}
        </group>
    );
};
