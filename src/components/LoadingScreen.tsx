import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface LoadingScreenProps {
    onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
    const [progress, setProgress] = useState(0);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setIsDone(true);
                        setTimeout(onLoaded, 600);
                    }, 400);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 15 + 8);
            });
        }, 150);

        return () => clearInterval(timer);
    }, [onLoaded]);

    return (
        <AnimatePresence>
            {!isDone && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09060e] text-slate-100 overflow-hidden"
                >
                    {/* Ambient Glowing Background Orbs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/15 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-lavender-glow/15 rounded-full blur-[90px] pointer-events-none" />

                    {/* Animated Central Heart / Sparkle Icon */}
                    <div className="relative mb-8">
                        <motion.div
                            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-20 h-20 rounded-3xl glass-card flex items-center justify-center border border-rose-300/30 shadow-[0_0_30px_rgba(255,92,138,0.4)]"
                        >
                            <Heart className="w-10 h-10 text-rose-400 fill-rose-400/30" />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-2 -right-2 text-amber-300"
                        >
                            <Sparkles className="w-6 h-6" />
                        </motion.div>
                    </div>

                    {/* Text & Progress */}
                    <h2 className="font-serif text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-200 via-pink-200 to-amber-100 bg-clip-text text-transparent mb-3 tracking-wide">
                        Preparing something special...
                    </h2>
                    <p className="text-slate-400 text-sm font-light mb-6 tracking-widest uppercase">
                        For Zobia's Celebration ✨
                    </p>

                    {/* Progress Bar */}
                    <div className="w-64 h-1.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/10">
                        <motion.div
                            className="h-full bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 rounded-full shadow-[0_0_12px_rgba(255,92,138,0.8)]"
                            initial={{ width: "0%" }}
                            animate={{ width: `${Math.min(100, progress)}%` }}
                            transition={{ duration: 0.2 }}
                        />
                    </div>

                    <span className="mt-3 text-xs text-rose-300/70 font-mono">
                        {Math.min(100, progress)}%
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
