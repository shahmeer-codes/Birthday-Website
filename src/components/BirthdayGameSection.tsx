import React from 'react';
import { GameCanvas } from './BirthdayGame/GameCanvas';

interface BirthdayGameSectionProps {
    onContinueCelebration: () => void;
}

export const BirthdayGameSection: React.FC<BirthdayGameSectionProps> = ({
    onContinueCelebration,
}) => {
    return (
        <section id="game" className="py-20 px-4 max-w-6xl mx-auto relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-500/10 rounded-full blur-[130px] pointer-events-none" />

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-300/30 text-xs font-semibold uppercase tracking-widest text-amber-300 mb-3 shadow-sm">
                    A Little Birthday Adventure ✨
                </span>

                <h2 className="font-serif text-4xl sm:text-5xl font-bold bg-gradient-to-r from-rose-100 via-pink-200 to-amber-100 bg-clip-text text-transparent mb-4">
                    Catch the Birthday Stars
                </h2>

                <p className="text-slate-300 text-base font-light leading-relaxed">
                    "Before the celebration begins, there's a little surprise waiting for you..."
                </p>
            </div>

            {/* 3D Interactive Mini-Game Canvas Container */}
            <div className="relative z-10">
                <GameCanvas onContinueCelebration={onContinueCelebration} />
            </div>
        </section>
    );
};
