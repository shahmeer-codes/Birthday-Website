import React from 'react';
import { Sparkles, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface AirplaneControlsProps {
    onMove: (dir: 'up' | 'down' | 'left' | 'right' | 'none') => void;
    onFire: () => void;
}

export const AirplaneControls: React.FC<AirplaneControlsProps> = ({ onMove, onFire }) => {
    return (
        <div className="absolute inset-x-4 bottom-6 z-30 flex items-end justify-between pointer-events-none">
            {/* Mobile Virtual D-Pad (Left Side) */}
            <div className="pointer-events-auto p-2 glass-card rounded-3xl border border-white/20 shadow-2xl flex flex-col items-center gap-1 bg-[#09060e]/60 backdrop-blur-md">
                <button
                    onTouchStart={() => onMove('up')}
                    onTouchEnd={() => onMove('none')}
                    onMouseDown={() => onMove('up')}
                    onMouseUp={() => onMove('none')}
                    className="p-3 rounded-xl bg-white/10 hover:bg-rose-500/30 text-white active:scale-95 transition-all"
                >
                    <ArrowUp className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                    <button
                        onTouchStart={() => onMove('left')}
                        onTouchEnd={() => onMove('none')}
                        onMouseDown={() => onMove('left')}
                        onMouseUp={() => onMove('none')}
                        className="p-3 rounded-xl bg-white/10 hover:bg-rose-500/30 text-white active:scale-95 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                        onTouchStart={() => onMove('right')}
                        onTouchEnd={() => onMove('none')}
                        onMouseDown={() => onMove('right')}
                        onMouseUp={() => onMove('none')}
                        className="p-3 rounded-xl bg-white/10 hover:bg-rose-500/30 text-white active:scale-95 transition-all"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
                <button
                    onTouchStart={() => onMove('down')}
                    onTouchEnd={() => onMove('none')}
                    onMouseDown={() => onMove('down')}
                    onMouseUp={() => onMove('none')}
                    className="p-3 rounded-xl bg-white/10 hover:bg-rose-500/30 text-white active:scale-95 transition-all"
                >
                    <ArrowDown className="w-5 h-5" />
                </button>
            </div>

            {/* Mobile / Desktop Large Magical Fire Button (Right Side) */}
            <div className="pointer-events-auto">
                <button
                    onClick={onFire}
                    className="group relative flex items-center justify-center p-5 sm:p-6 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-bold shadow-[0_0_35px_rgba(255,92,138,0.8)] hover:scale-105 active:scale-95 transition-all"
                >
                    <Sparkles className="w-7 h-7 sm:w-8 h-8 text-yellow-100 group-hover:rotate-12 transition-transform" />
                    <span className="sr-only">Fire Magical Sparkles</span>
                </button>
            </div>
        </div>
    );
};
