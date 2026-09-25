import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GiftSurprise } from '../types';

interface GiftBoxesProps {
    gifts: GiftSurprise[];
    onOpenGift: (gift: GiftSurprise) => void;
}

interface SingleGiftBoxProps {
    gift: GiftSurprise;
    position: [number, number, number];
    rotationY?: number;
    onOpenGift: (gift: GiftSurprise) => void;
}

const SingleGiftBox: React.FC<SingleGiftBoxProps> = ({
    gift,
    position,
    rotationY = 0,
    onOpenGift,
}) => {
    const boxGroup = useRef<THREE.Group>(null);
    const lidGroup = useRef<THREE.Group>(null);
    const [opened, setOpened] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [lidOffset, setLidOffset] = useState(0);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (boxGroup.current) {
            boxGroup.current.rotation.y = rotationY + Math.sin(t * 0.8 + position[0]) * 0.05;
        }
        if (lidGroup.current && opened) {
            if (lidOffset < 0.35) {
                setLidOffset((prev) => Math.min(0.35, prev + 0.03));
            }
            lidGroup.current.position.y = 0.32 + lidOffset;
            lidGroup.current.rotation.x = -lidOffset * 1.2;
        }
    });

    const handleClick = (e: any) => {
        e.stopPropagation();
        setOpened(true);
        onOpenGift(gift);
    };

    return (
        <group
            ref={boxGroup}
            position={position}
            scale={hovered ? 1.08 : 1.0}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={handleClick}
        >
            {/* Box Base */}
            <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.55, 0.32, 0.55]} />
                <meshStandardMaterial
                    color={gift.color}
                    roughness={0.3}
                    metalness={0.1}
                />
            </mesh>

            {/* Ribbon Cross Horizontal */}
            <mesh position={[0, 0.16, 0]}>
                <boxGeometry args={[0.57, 0.33, 0.1]} />
                <meshStandardMaterial color={gift.ribbonColor} roughness={0.2} metalness={0.2} />
            </mesh>
            {/* Ribbon Cross Vertical */}
            <mesh position={[0, 0.16, 0]}>
                <boxGeometry args={[0.1, 0.33, 0.57]} />
                <meshStandardMaterial color={gift.ribbonColor} roughness={0.2} metalness={0.2} />
            </mesh>

            {/* Box Lid */}
            <group ref={lidGroup} position={[0, 0.32, 0]}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[0.58, 0.08, 0.58]} />
                    <meshStandardMaterial
                        color={gift.color}
                        roughness={0.25}
                        metalness={0.1}
                    />
                </mesh>
                {/* Ribbon Bow Knot */}
                <mesh position={[0, 0.07, 0]}>
                    <sphereGeometry args={[0.07, 16, 16]} />
                    <meshStandardMaterial color={gift.ribbonColor} roughness={0.2} />
                </mesh>
            </group>

            {/* Soft Glow when hovered */}
            {hovered && (
                <pointLight position={[0, 0.4, 0]} color="#ffa8c5" intensity={1.5} distance={1.2} />
            )}
        </group>
    );
};

export const GiftBoxes: React.FC<GiftBoxesProps> = ({ gifts, onOpenGift }) => {
    const boxPositions: [number, number, number][] = [
        [-1.6, -0.65, 0.8],
        [1.7, -0.65, 0.7],
        [0.9, -0.65, 1.4],
    ];

    return (
        <group>
            {gifts.map((gift, idx) => (
                <SingleGiftBox
                    key={gift.id}
                    gift={gift}
                    position={boxPositions[idx] || [0, -0.65, 1]}
                    rotationY={idx * 0.8}
                    onOpenGift={onOpenGift}
                />
            ))}
        </group>
    );
};
