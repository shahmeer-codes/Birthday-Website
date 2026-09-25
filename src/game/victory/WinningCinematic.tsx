import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';

interface WinningCinematicProps {
    onContinueCelebration: () => void;
    onReplayGame: () => void;
}

export const WinningCinematic: React.FC<WinningCinematicProps> = ({
    onContinueCelebration,
    onReplayGame,
}) => {
    const [litCandles, setLitCandles] = useState(0);
    const [showTextPhase, setShowTextPhase] = useState(false);

    useEffect(() => {
        // Phase 1-2: Confetti fireworks explosion
        const fireworkDefaults = {
            origin: { y: 0.6 },
            colors: ['#ff85a1', '#ffe066', '#d8b4fe', '#ffffff', '#ffb3c6']
        };

        confetti({ ...fireworkDefaults, particleCount: 80, spread: 45 });
        setTimeout(() => confetti({ ...fireworkDefaults, particleCount: 120, spread: 90 }), 500);
        setTimeout(() => confetti({ ...fireworkDefaults, particleCount: 160, spread: 120 }), 1000);

        // Phase 7: Sequential candle lighting 1 -> 5
        const candleTimer = setInterval(() => {
            setLitCandles((prev) => {
                if (prev < 5) return prev + 1;
                clearInterval(candleTimer);
                return 5;
            });
        }, 500);

        // Phase 8: Text reveal
        const textTimer = setTimeout(() => {
            setShowTextPhase(true);
        }, 2800);

        return () => {
            clearInterval(candleTimer);
            clearTimeout(textTimer);
        };
    }, []);

    return (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-[#09060e]/88 backdrop-blur-lg rounded-3xl overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-rose-500/20 via-pink-400/20 to-amber-300/20 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-xl w-full text-center relative z-10 p-6 sm:p-10 glass-card rounded-3xl border border-rose-300/40 shadow-[0_0_80px_rgba(255,133,161,0.35)]">
                {/* Animated Candles Display (1 -> 5) */}
                <div className="flex items-center justify-center gap-4 mb-6">
                    {[1, 2, 3, 4, 5].map((candleNum) => {
                        const isLit = candleNum <= litCandles;
                        return (
                            <div key={candleNum} className="relative flex flex-col items-center">
                                <AnimatePresence>
                                    {isLit && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: [1, 1.25, 1], opacity: 1 }}
                                            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                                            className="w-4 h-6 rounded-full bg-gradient-to-t from-amber-400 via-yellow-200 to-white shadow-[0_0_18px_#ffe066] mb-1"
                                        />
                                    )}
                                </AnimatePresence>
                                <div className={`w-3.5 h-10 rounded-t-sm border border-white/20 transition-all duration-500 ${isLit ? 'bg-gradient-to-b from-rose-300 to-pink-400 shadow-md' : 'bg-slate-700/60'
                                    }`} />
                            </div>
                        );
                    })}
                </div>

                <span className="inline-block px-4 py-1 rounded-full bg-amber-400/10 border border-amber-300/30 text-xs font-semibold uppercase tracking-widest text-amber-300 mb-3">
                    Sky Adventure Complete ✈️
                </span>

                <motion.h3
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs uppercase tracking-widest text-rose-300 font-semibold mb-2"
                >
                    You did it! ✨
                </motion.h3>

                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-serif text-4xl sm:text-5xl font-bold bg-gradient-to-r from-rose-100 via-pink-200 to-amber-100 bg-clip-text text-transparent mb-4"
                >
                    {birthdayConfig.winningHeading}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showTextPhase ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-slate-200 text-base sm:text-lg leading-relaxed mb-8 font-light max-w-lg mx-auto"
                >
                    "{birthdayConfig.winningMessage}"
                </motion.p>

                {showTextPhase && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3"
                    >
                        <button
                            onClick={onContinueCelebration}
                            className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white font-bold text-base shadow-[0_0_40px_rgba(255,92,138,0.7)] hover:scale-105 active:scale-95 transition-all"
                        >
                            <span>See Your Birthday Surprise ✨</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={onReplayGame}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-slate-200 font-medium text-sm border border-white/20 transition-all"
                        >
                            <RotateCcw className="w-4 h-4" />
                            <span>Replay Adventure</span>
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
