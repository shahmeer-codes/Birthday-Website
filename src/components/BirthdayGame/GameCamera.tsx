import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GameCameraProps {
    targetPosition: [number, number, number];
    isCompleted?: boolean;
}

export const GameCamera: React.FC<GameCameraProps> = ({ targetPosition, isCompleted }) => {
    useFrame((state) => {
        const { camera } = state;

        if (isCompleted) {
            // Pull back cinematic camera view
            const targetCamX = 0;
            const targetCamY = 7;
            const targetCamZ = 12;

            camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.03);
            camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.03);
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.03);
            camera.lookAt(0, 1, 0);
        } else {
            // Smooth follow camera lerp behind player
            const offsetZ = 6.0;
            const offsetY = 4.2;

            const desiredCamX = targetPosition[0];
            const desiredCamY = targetPosition[1] + offsetY;
            const desiredCamZ = targetPosition[2] + offsetZ;

            camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredCamX, 0.08);
            camera.position.y = THREE.MathUtils.lerp(camera.position.y, desiredCamY, 0.08);
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredCamZ, 0.08);

            camera.lookAt(
                targetPosition[0],
                targetPosition[1] + 0.8,
                targetPosition[2]
            );
        }
    });

    return null;
};
