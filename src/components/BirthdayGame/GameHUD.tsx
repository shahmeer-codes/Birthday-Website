import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Pause, Play, RotateCcw, Gift, X } from 'lucide-react';

interface GameHUDProps {
    starsCollected: number;
    requiredStars: number;
    score: number;
    secretsFound: number;
    totalSecrets: number;
    gameStatus: 'intro' | 'playing' | 'paused' | 'completed';
    toastMessage: string | null;
    onStartGame: () => void;
    onPauseGame: () => void;
    onResumeGame: () => void;
    onRestartGame: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
    starsCollected,
    requiredStars,
    score,
    secretsFound,
    totalSecrets,
    gameStatus,
    toastMessage,
    onStartGame,
    onPauseGame,
    onResumeGame,
    onRestartGame,
}) => {
    const isFinalStarNext = starsCollected === requiredStars - 1;

    return (
        <>
            {/* Toast Notification Popup */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        className="absolute top-20 left-1/2 -translate-x-1/2 z-30 px-6 py-2.5 rounded-full glass-card border border-rose-300/40 text-rose-100 text-xs sm:text-sm font-medium shadow-2xl flex items-center gap-2"
                    >
                        <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                        <span>{toastMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Playing Girlish HUD */}
            {gameStatus === 'playing' && (
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                    {/* Left HUD: Stars & Score */}
                    <div className="flex items-center gap-3">
                        {/* Stars Counter */}
                        <div className="px-4 py-2 rounded-2xl glass-card border border-rose-300/30 flex items-center gap-2 shadow-xl pointer-events-auto">
                            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-rose-300 font-mono">
                                    {isFinalStarNext ? "One last little star... ✨" : "Birthday Magic"}
                                </span>
                                <span className="text-sm font-bold text-rose-100 font-mono">
                                    {starsCollected} / {requiredStars}
                                </span>
                            </div>
                        </div>

                        {/* Points / Hearts Counter */}
                        <div className="px-4 py-2 rounded-2xl glass-card border border-rose-300/30 flex items-center gap-2 shadow-xl pointer-events-auto">
                            <Heart className="w-4 h-4 text-rose-400 fill-rose-400/40" />
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">Joy</span>
                                <span className="text-sm font-bold text-rose-100 font-mono">{score}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right HUD: Secrets & Pause */}
                    <div className="flex items-center gap-3 pointer-events-auto">
                        <div className="hidden sm:flex px-3 py-2 rounded-2xl glass-card border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                            <Gift className="w-3.5 h-3.5 text-rose-300" />
                            <span>Gifts: {secretsFound}/{totalSecrets}</span>
                        </div>

                        <button
                            onClick={onPauseGame}
                            className="p-2.5 rounded-2xl glass-card border border-white/15 text-slate-200 hover:text-white hover:border-rose-300/40 transition-colors shadow-lg"
                            title="Pause Game"
                        >
                            <Pause className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Girlish Game Intro Screen Overlay */}
            {gameStatus === 'intro' && (
                <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-[#09060e]/75 backdrop-blur-md rounded-3xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md w-full p-8 glass-card rounded-3xl border border-rose-300/30 text-center shadow-2xl relative overflow-hidden"
                    >
                        <div className="inline-flex p-4 rounded-2xl bg-rose-500/10 border border-rose-400/20 text-rose-300 mb-4 shadow-inner">
                            <Sparkles className="w-8 h-8 animate-pulse" />
                        </div>

                        <span className="block text-xs uppercase tracking-widest text-rose-300 font-semibold mb-1">
                            Interactive 3D Game
                        </span>

                        <h3 className="font-serif text-3xl font-bold text-slate-100 mb-3">
                            Ready for a Little Birthday Adventure? ✨
                        </h3>

                        <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
                            Collect the birthday magic and discover a few sweet surprises along the way.
                        </p>

                        <div className="text-xs text-slate-400 mb-8 p-3 rounded-2xl bg-white/5 border border-white/10 font-mono">
                            Controls: WASD / Arrow Keys on Desktop • Touch D-Pad on Mobile
                        </div>

                        <button
                            onClick={onStartGame}
                            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white font-bold text-base shadow-[0_0_30px_rgba(255,92,138,0.6)] hover:scale-105 active:scale-95 transition-all"
                        >
                            Let's Go! 🎀
                        </button>
                    </motion.div>
                </div>
            )}

            {/* Pause Screen Overlay */}
            {gameStatus === 'paused' && (
                <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-[#09060e]/80 backdrop-blur-md rounded-3xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-xs w-full p-6 glass-card rounded-3xl border border-white/20 text-center shadow-2xl flex flex-col gap-4"
                    >
                        <h3 className="font-serif text-2xl font-bold text-slate-100">
                            Adventure Paused
                        </h3>

                        <button
                            onClick={onResumeGame}
                            className="w-full py-3 rounded-2xl bg-rose-500/20 border border-rose-400/30 text-rose-200 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-rose-500/30 transition-all"
                        >
                            <Play className="w-4 h-4" />
                            <span>Resume</span>
                        </button>

                        <button
                            onClick={onRestartGame}
                            className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                        >
                            <RotateCcw className="w-4 h-4" />
                            <span>Restart</span>
                        </button>
                    </motion.div>
                </div>
            )}
        </>
    );
};
