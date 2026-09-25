import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { BirthdaySceneCanvas } from '../three/BirthdaySceneCanvas';
import { GiftSurprise } from '../types';

interface HeroSectionProps {
    name: string;
    tagline: string;
    subtitle: string;
    makeAWishText: string;
    isBlownOut: boolean;
    isWishMode: boolean;
    gifts: GiftSurprise[];
    onCakeClick: () => void;
    onMakeWishClick: () => void;
    onOpenGift: (gift: GiftSurprise) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
    name,
    tagline,
    subtitle,
    makeAWishText,
    isBlownOut,
    isWishMode,
    gifts,
    onCakeClick,
    onMakeWishClick,
    onOpenGift,
}) => {
    const handleStartAdventureClick = () => {
        const skyGameEl = document.getElementById('sky-adventure');
        if (skyGameEl) {
            skyGameEl.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-between pt-24 pb-12 px-4 overflow-hidden">
            {/* Background Soft Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-rose-500/15 via-pink-400/15 to-amber-300/15 rounded-full blur-[140px] pointer-events-none" />

            {/* Hero Typography & CTA */}
            <div className="text-center max-w-3xl mx-auto z-10 space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/20 text-xs font-semibold uppercase tracking-widest text-rose-300 shadow-sm"
                >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
                    <span>A Special Day for Zobia</span>
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-rose-100 via-pink-200 to-amber-100 bg-clip-text text-transparent drop-shadow-sm"
                >
                    {tagline}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-slate-300 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed"
                >
                    {subtitle}
                </motion.p>

                {/* Primary CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3"
                >
                    <button
                        onClick={handleStartAdventureClick}
                        className="group px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white font-bold text-base shadow-[0_0_35px_rgba(255,92,138,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <span>Start the Birthday Adventure ✈️</span>
                    </button>

                    <button
                        onClick={onMakeWishClick}
                        disabled={isWishMode || isBlownOut}
                        className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 text-slate-100 font-semibold text-base border border-white/20 transition-all flex items-center gap-2"
                    >
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>{isBlownOut ? "Wish Granted ✨" : makeAWishText}</span>
                    </button>
                </motion.div>
            </div>

            {/* 3D Cake & Balloon Interactive Scene */}
            <div className="w-full h-[400px] sm:h-[480px] my-6 z-10">
                <BirthdaySceneCanvas
                    isBlownOut={isBlownOut}
                    isWishMode={isWishMode}
                    gifts={gifts}
                    onCakeClick={onCakeClick}
                    onOpenGift={onOpenGift}
                />
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="z-10 text-slate-400 flex flex-col items-center gap-1 text-xs tracking-widest uppercase font-mono"
            >
                <span>Scroll to Explore</span>
                <ChevronDown className="w-4 h-4 text-rose-300" />
            </motion.div>
        </section>
    );
};
