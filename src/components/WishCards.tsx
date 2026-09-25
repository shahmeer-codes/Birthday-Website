import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Sparkles, TrendingUp, Heart } from 'lucide-react';
import { WishCardItem } from '../types';

interface WishCardsProps {
    wishes: WishCardItem[];
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    Smile,
    Sparkles,
    TrendingUp,
    Heart,
};

const SingleWishCard: React.FC<{ wish: WishCardItem; index: number }> = ({ wish, index }) => {
    const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    const [isHovered, setIsHovered] = useState(false);

    const IconComponent = iconMap[wish.icon] || Heart;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (-y / rect.height) * 16;
        const rotateY = (x / rect.width) * 16;
        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`);
    };

    const handleMouseLeave = () => {
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
        setIsHovered(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            style={{ transform, transition: 'transform 0.15s ease-out' }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative p-8 glass-card rounded-3xl border border-white/15 shadow-xl hover:shadow-[0_0_35px_rgba(255,133,161,0.3)] hover:border-rose-300/40 transition-shadow group overflow-hidden cursor-pointer"
        >
            {/* Top Accent Gradient Ribbon */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${wish.accentColor}`} />

            {/* Floating Sparkles when Hovered */}
            {isHovered && (
                <div className="absolute top-3 right-3 text-amber-300 animate-ping">
                    <Sparkles className="w-4 h-4" />
                </div>
            )}

            {/* Badge Tag */}
            <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-rose-300 group-hover:scale-110 group-hover:bg-rose-500/10 transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                </div>

                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-slate-300 font-mono">
                    {wish.badge}
                </span>
            </div>

            <span className="block text-xs uppercase tracking-widest text-rose-300/80 font-semibold mb-1">
                {wish.subtitle}
            </span>

            <h3 className="font-serif text-2xl font-bold text-slate-100 mb-3 group-hover:text-rose-200 transition-colors">
                {wish.title}
            </h3>

            <p className="text-slate-300 text-sm font-light leading-relaxed">
                "{wish.message}"
            </p>

            {/* Corner Sparkle Decorative Detail */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="font-script text-base text-rose-300/70">For Zobia ✨</span>
                <Heart className="w-3.5 h-3.5 text-rose-400/40 group-hover:text-rose-400 group-hover:scale-125 transition-all" />
            </div>
        </motion.div>
    );
};

export const WishCards: React.FC<WishCardsProps> = ({ wishes }) => {
    return (
        <section id="wishes" className="py-20 px-4 max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/20 text-xs font-semibold uppercase tracking-widest text-rose-300 mb-3">
                    Birthday Blessings
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-bold bg-gradient-to-r from-rose-100 via-pink-200 to-amber-100 bg-clip-text text-transparent mb-4">
                    Wishes for the Year Ahead
                </h2>
                <p className="text-slate-300 text-base font-light">
                    Hover over each card to reveal subtle 3D parallax depth and birthday magic.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishes.map((wish, index) => (
                    <SingleWishCard key={wish.id} wish={wish} index={index} />
                ))}
            </div>
        </section>
    );
};
