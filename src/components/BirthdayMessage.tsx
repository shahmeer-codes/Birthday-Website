import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Quote } from 'lucide-react';

interface BirthdayMessageProps {
    title: string;
    subtitle: string;
    paragraphs: string[];
}

export const BirthdayMessage: React.FC<BirthdayMessageProps> = ({
    title,
    subtitle,
    paragraphs,
}) => {
    return (
        <section id="message" className="relative py-24 px-4 max-w-4xl mx-auto">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Main Glassmorphism Birthday Letter Card */}
            <motion.div
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-8 sm:p-12 md:p-16 glass-card rounded-[2.5rem] border border-rose-300/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
            >
                {/* Decorative Watermark Quote Icon */}
                <Quote className="absolute -bottom-6 -right-6 w-48 h-48 text-rose-500/5 rotate-12 pointer-events-none" />
                <Quote className="absolute -top-6 -left-6 w-36 h-36 text-lavender-glow/5 -rotate-12 pointer-events-none" />

                {/* Header Tag */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping" />
                        <span className="text-xs uppercase tracking-widest text-rose-300 font-semibold">
                            {subtitle}
                        </span>
                    </div>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                </div>

                {/* Letter Heading */}
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-100 via-pink-200 to-amber-100 bg-clip-text text-transparent mb-8">
                    {title}
                </h2>

                {/* Letter Paragraphs */}
                <div className="space-y-6 text-slate-200 text-base sm:text-lg leading-relaxed font-light">
                    {paragraphs.map((para, idx) => (
                        <p key={idx} className="relative pl-4 border-l-2 border-rose-400/30 hover:border-rose-400 transition-colors">
                            {para}
                        </p>
                    ))}
                </div>

                {/* Footer Signature */}
                <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-rose-300 font-script text-2xl">
                        <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                        <span>Always celebrating your happiness</span>
                    </div>

                    <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                        Chapter 2026 • Dedicated to Zobia
                    </span>
                </div>
            </motion.div>
        </section>
    );
};
