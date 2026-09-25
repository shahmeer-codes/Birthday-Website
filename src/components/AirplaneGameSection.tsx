import React from 'react';
import { AirplaneGameCanvas } from '../game/AirplaneGameCanvas';

interface AirplaneGameSectionProps {
    onContinueCelebration: () => void;
}

export const AirplaneGameSection: React.FC<AirplaneGameSectionProps> = ({
    onContinueCelebration,
}) => {
    return (
        <section id="sky-adventure" className="py-20 px-4 max-w-6xl mx-auto relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-300/30 text-xs font-semibold uppercase tracking-widest text-amber-300 mb-3 shadow-sm">
                    Interactive 3D Sky Game ✈️
                </span>

                <h2 className="font-serif text-4xl sm:text-5xl font-bold bg-gradient-to-r from-rose-100 via-pink-200 to-amber-100 bg-clip-text text-transparent mb-4">
                    Birthday Sky Adventure ✈️
                </h2>

                <p className="text-slate-300 text-base font-light leading-relaxed">
                    "Fly through magical clouds, collect golden stars, and burst enchanted targets to unlock the birthday surprise!"
                </p>
            </div>

            {/* 3D Interactive Airplane Game Canvas */}
            <div className="relative z-10">
                <AirplaneGameCanvas onContinueCelebration={onContinueCelebration} />
            </div>
        </section>
    );
};
