import React from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Camera, Award, Star } from 'lucide-react';
import { TimelineMilestone } from '../types';

interface TimelineSectionProps {
    milestones: TimelineMilestone[];
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    Sunrise,
    Camera,
    Award,
    Star,
};

export const TimelineSection: React.FC<TimelineSectionProps> = ({ milestones }) => {
    return (
        <section id="timeline" className="py-24 px-4 max-w-5xl mx-auto relative">
            <div className="text-center max-w-2xl mx-auto mb-20">
                <span className="inline-block px-4 py-1.5 rounded-full bg-lavender-glow/10 border border-lavender-glow/20 text-xs font-semibold uppercase tracking-widest text-lavender-glow mb-3">
                    Looking Ahead
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-bold bg-gradient-to-r from-rose-100 via-pink-200 to-amber-100 bg-clip-text text-transparent mb-4">
                    Another Beautiful Year Begins...
                </h2>
                <p className="text-slate-300 text-base font-light">
                    A glimpse into the upcoming chapters waiting to be written with joy, laughter, and success.
                </p>
            </div>

            {/* Central Animated Timeline Path */}
            <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-rose-500/0 via-rose-400/40 to-amber-300/0 hidden md:block" />

                <div className="space-y-12 md:space-y-20">
                    {milestones.map((item, index) => {
                        const isEven = index % 2 === 0;
                        const IconComponent = iconMap[item.icon] || Star;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Timeline Card */}
                                <div className="w-full md:w-1/2">
                                    <div className="p-8 glass-card rounded-3xl border border-white/12 shadow-xl hover:border-rose-300/40 transition-all group">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-xs font-mono font-semibold text-rose-300">
                                                {item.year}
                                            </span>
                                            <span className="text-xs font-medium text-amber-300 uppercase tracking-widest">
                                                {item.tag}
                                            </span>
                                        </div>

                                        <h3 className="font-serif text-2xl font-bold text-slate-100 mb-1 group-hover:text-rose-200 transition-colors">
                                            {item.title}
                                        </h3>
                                        <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-4 font-light">
                                            {item.subtitle}
                                        </h4>

                                        <p className="text-slate-300 text-sm leading-relaxed font-light">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Node Marker */}
                                <div className="relative z-10 w-12 h-12 rounded-full glass-panel border border-rose-300/40 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(255,182,193,0.4)] shrink-0 my-[-1rem] md:my-0">
                                    <IconComponent className="w-5 h-5" />
                                </div>

                                {/* Empty Spacer */}
                                <div className="hidden md:block w-1/2" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
