import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface Projectile {
    id: string;
    position: [number, number, number];
    velocity: [number, number, number];
    life: number;
}

export interface ImpactExplosion {
    id: string;
    position: [number, number, number];
    particles: { pos: [number, number, number]; vel: [number, number, number]; color: string }[];
    life: number;
}

interface ProjectilesProps {
    projectiles: Projectile[];
    explosions: ImpactExplosion[];
}

export const Projectiles: React.FC<ProjectilesProps> = ({ projectiles, explosions }) => {
    const projGroupRef = useRef<THREE.Group>(null);
    const expGroupRef = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (projGroupRef.current) {
            projGroupRef.current.children.forEach((child, i) => {
                const proj = projectiles[i];
                if (proj) {
                    child.position.x += proj.velocity[0] * delta;
                    child.position.y += proj.velocity[1] * delta;
                    child.position.z += proj.velocity[2] * delta;
                }
            });
        }
    });

    return (
        <group>
            {/* Flying Glowing Sparkle Projectiles */}
            <group ref={projGroupRef}>
                {projectiles.map((p) => (
                    <group key={p.id} position={p.position}>
                        <mesh>
                            <sphereGeometry args={[0.12, 12, 12]} />
                            <meshBasicMaterial color="#ffe066" />
                        </mesh>
                        {/* Sparkle Tail */}
                        <mesh position={[0, 0, -0.2]}>
                            <coneGeometry args={[0.08, 0.4, 8]} />
                            <meshBasicMaterial color="#ff85a1" transparent opacity={0.7} />
                        </mesh>
                        <pointLight color="#ffe066" intensity={2.5} distance={1.8} />
                    </group>
                ))}
            </group>

            {/* Target Impact Explosions (Sparkles & Stars Burst) */}
            <group ref={expGroupRef}>
                {explosions.map((exp) => (
                    <group key={exp.id} position={exp.position}>
                        {exp.particles.map((pt, pIdx) => (
                            <mesh key={pIdx} position={pt.pos} scale={0.6}>
                                <sphereGeometry args={[0.08, 8, 8]} />
                                <meshBasicMaterial color={pt.color} transparent opacity={exp.life} />
                            </mesh>
                        ))}
                        <pointLight color="#ff85a1" intensity={4 * exp.life} distance={2.5} />
                    </group>
                ))}
            </group>
        </group>
    );
};
