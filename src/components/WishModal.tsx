import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X } from 'lucide-react';

interface WishModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

export const WishModal: React.FC<WishModalProps> = ({ isOpen, onClose, message }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#09060e]/80 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative max-w-lg w-full p-8 md:p-10 glass-card rounded-3xl border border-amber-300/40 shadow-[0_0_60px_rgba(255,215,0,0.25)] text-center overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-400/20 blur-3xl pointer-events-none" />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full glass-panel text-slate-300 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Icon */}
                        <div className="inline-flex p-4 rounded-2xl bg-amber-400/10 border border-amber-300/30 text-amber-300 mb-6 shadow-inner">
                            <Sparkles className="w-10 h-10 animate-pulse" />
                        </div>

                        <span className="block text-xs uppercase tracking-widest text-amber-300 font-semibold mb-2">
                            Wish Granted ✨
                        </span>

                        <h3 className="font-serif text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-100 via-rose-100 to-amber-200 bg-clip-text text-transparent leading-snug mb-6">
                            "{message}"
                        </h3>

                        <div className="flex items-center justify-center gap-2 text-sm text-rose-200/80 font-script">
                            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                            <span>Made with love for Zobia</span>
                            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-semibold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all"
                        >
                            Keep Celebrating ✨
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
