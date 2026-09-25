import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface MobileControlsProps {
    onDirectionPress: (dir: 'up' | 'down' | 'left' | 'right' | 'none') => void;
}

export const MobileControls: React.FC<MobileControlsProps> = ({ onDirectionPress }) => {
    return (
        <div className="md:hidden fixed bottom-6 left-6 z-30 flex flex-col items-center gap-2 touch-none pointer-events-auto">
            <div className="flex justify-center">
                <button
                    onTouchStart={() => onDirectionPress('up')}
                    onTouchEnd={() => onDirectionPress('none')}
                    onMouseDown={() => onDirectionPress('up')}
                    onMouseUp={() => onDirectionPress('none')}
                    className="w-12 h-12 rounded-2xl glass-card border border-white/20 flex items-center justify-center text-rose-200 active:bg-rose-500/40 shadow-lg"
                >
                    <ArrowUp className="w-6 h-6" />
                </button>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onTouchStart={() => onDirectionPress('left')}
                    onTouchEnd={() => onDirectionPress('none')}
                    onMouseDown={() => onDirectionPress('left')}
                    onMouseUp={() => onDirectionPress('none')}
                    className="w-12 h-12 rounded-2xl glass-card border border-white/20 flex items-center justify-center text-rose-200 active:bg-rose-500/40 shadow-lg"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                <button
                    onTouchStart={() => onDirectionPress('down')}
                    onTouchEnd={() => onDirectionPress('none')}
                    onMouseDown={() => onDirectionPress('down')}
                    onMouseUp={() => onDirectionPress('none')}
                    className="w-12 h-12 rounded-2xl glass-card border border-white/20 flex items-center justify-center text-rose-200 active:bg-rose-500/40 shadow-lg"
                >
                    <ArrowDown className="w-6 h-6" />
                </button>

                <button
                    onTouchStart={() => onDirectionPress('right')}
                    onTouchEnd={() => onDirectionPress('none')}
                    onMouseDown={() => onDirectionPress('right')}
                    onMouseUp={() => onDirectionPress('none')}
                    className="w-12 h-12 rounded-2xl glass-card border border-white/20 flex items-center justify-center text-rose-200 active:bg-rose-500/40 shadow-lg"
                >
                    <ArrowRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};
