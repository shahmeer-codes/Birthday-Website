import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, Heart } from 'lucide-react';
import { GiftSurprise } from '../types';

interface GiftModalProps {
    gift: GiftSurprise | null;
    onClose: () => void;
}

export const GiftModal: React.FC<GiftModalProps> = ({ gift, onClose }) => {
    return (
        <AnimatePresence>
            {gift && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#09060e]/80 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative max-w-md w-full p-8 glass-card rounded-3xl border border-rose-300/30 shadow-[0_0_50px_rgba(255,133,161,0.3)] text-center overflow-hidden"
                    >
                        {/* Ambient Top Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-rose-400/20 blur-2xl pointer-events-none" />

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full glass-panel text-slate-300 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div
                            className="inline-flex p-4 rounded-2xl mb-5 shadow-lg border"
                            style={{ backgroundColor: `${gift.color}20`, borderColor: `${gift.color}40`, color: gift.color }}
                        >
                            <Gift className="w-8 h-8 animate-bounce" />
                        </div>

                        <span className="block text-xs uppercase tracking-widest text-rose-300 font-semibold mb-2">
                            {gift.tag}
                        </span>

                        <h3 className="font-serif text-2xl font-bold text-slate-100 mb-4">
                            {gift.title}
                        </h3>

                        <p className="text-slate-300 text-base leading-relaxed mb-6 font-light">
                            "{gift.message}"
                        </p>

                        <div className="flex items-center justify-center gap-1.5 text-xs text-rose-300/70 font-medium">
                            <Heart className="w-3.5 h-3.5 fill-rose-300/30" />
                            <span>A little surprise just for you</span>
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-6 px-6 py-2.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-semibold hover:bg-rose-500/30 transition-all"
                        >
                            Close Gift ✨
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
