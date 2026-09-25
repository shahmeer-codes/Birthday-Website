import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [isHovered, setIsHovered] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            setIsTouchDevice(true);
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });

            const target = e.target as HTMLElement;
            if (
                target &&
                (target.tagName === 'BUTTON' ||
                    target.tagName === 'A' ||
                    target.closest('button') ||
                    target.closest('a') ||
                    target.getAttribute('role') === 'button' ||
                    target.classList.contains('cursor-pointer'))
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    if (isTouchDevice) return null;

    return (
        <motion.div
            className="fixed pointer-events-none z-50 rounded-full border border-rose-300/60 bg-rose-400/20 backdrop-blur-[1px] shadow-[0_0_15px_rgba(255,133,161,0.5)] -translate-x-1/2 -translate-y-1/2"
            animate={{
                x: pos.x,
                y: pos.y,
                scale: isHovered ? 1.8 : 1,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 400, mass: 0.1 }}
            style={{ width: 24, height: 24 }}
        >
            <div className="w-1.5 h-1.5 rounded-full bg-rose-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-sm" />
        </motion.div>
    );
};
