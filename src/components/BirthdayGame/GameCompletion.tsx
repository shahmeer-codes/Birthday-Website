import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

interface GameCompletionProps {
    onContinue: () => void;
}

export const GameCompletion: React.FC<GameCompletionProps> = ({ onContinue }) => {
    useEffect(() => {
        // Fire multi-stage celebratory confetti burst
        const count = 150;
        const defaults = {
            origin: { y: 0.6 },
            colors: ['#ff85a1', '#d8b4fe', '#ffe066', '#ffffff']
        };

        function fire(particleRatio: number, opts: confetti.Options) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    }, []);

    return (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-[#09060e]/85 backdrop-blur-md rounded-3xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="max-w-lg w-full p-8 md:p-10 glass-card rounded-3xl border border-amber-300/40 text-center shadow-[0_0_60px_rgba(255,215,0,0.3)] relative overflow-hidden"
            >
                <div className="inline-flex p-4 rounded-2xl bg-amber-400/10 border border-amber-300/30 text-amber-300 mb-6 shadow-inner">
                    <Sparkles className="w-10 h-10 animate-bounce" />
                </div>

                <span className="block text-xs uppercase tracking-widest text-amber-300 font-semibold mb-2">
                    Adventure Completed ✨
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-100 via-rose-100 to-amber-200 bg-clip-text text-transparent mb-4">
                    You Found Them All! ✨
                </h2>

                <p className="text-slate-200 text-base leading-relaxed mb-8 font-light">
                    You gathered all 10 glowing birthday stars! Now it's time for the real celebration to begin...
                </p>

                <button
                    onClick={onContinue}
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white font-bold text-base shadow-[0_0_40px_rgba(255,92,138,0.7)] hover:scale-105 active:scale-95 transition-all"
                >
                    <span>Continue the Celebration</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </motion.div>
        </div>
    );
};
