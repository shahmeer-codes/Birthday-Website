import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';

interface FinalCelebrationProps {
    name: string;
    finalHeading: string;
    finalMessage: string;
    onCelebrateTrigger: () => void;
}

export const FinalCelebration: React.FC<FinalCelebrationProps> = ({
    name,
    finalHeading,
    finalMessage,
    onCelebrateTrigger,
}) => {
    const [celebrated, setCelebrated] = useState(false);

    const triggerCelebration = () => {
        setCelebrated(true);
        onCelebrateTrigger();

        // Fire multi-stage grand confetti burst
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            colors: ['#ff85a1', '#d8b4fe', '#ffe066', '#ffffff', '#ff5c8a', '#e0a96d']
        };

        function fire(particleRatio: number, opts: confetti.Options) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    };

    return (
        <section id="celebrate" className="relative py-28 px-4 text-center overflow-hidden bg-gradient-to-t from-[#0e0a14] via-[#140b22] to-transparent">
            {/* Background Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-rose-500/15 to-amber-400/15 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-300/30 text-xs font-semibold uppercase tracking-widest text-rose-300 mb-6 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>The Grand Finale</span>
                </div>

                <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-rose-100 via-pink-200 to-amber-100 bg-clip-text text-transparent leading-tight mb-6">
                    {finalHeading}
                </h2>

                <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                    {finalMessage}
                </p>

                {/* Celebrate Button */}
                <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={triggerCelebration}
                    className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white font-bold text-lg sm:text-xl shadow-[0_0_50px_rgba(255,92,138,0.7)] hover:shadow-[0_0_80px_rgba(255,92,138,0.95)] transition-all duration-300"
                >
                    <PartyPopper className="w-7 h-7 text-amber-200 group-hover:rotate-12 transition-transform" />
                    <span>Celebrate 🎉</span>
                    <Heart className="w-6 h-6 text-rose-200 fill-rose-200 group-hover:scale-125 transition-transform" />
                </motion.button>

                {celebrated && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 text-sm text-rose-300 font-script text-xl"
                    >
                        ✨ Wishing Zobia the happiest birthday ever! ✨
                    </motion.div>
                )}
            </div>
        </section>
    );
};
