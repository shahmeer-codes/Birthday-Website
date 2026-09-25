import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Heart } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';

interface NavigationProps {
    audioUrl?: string;
    name: string;
}

export const Navigation: React.FC<NavigationProps> = ({ audioUrl, name }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'Message', href: '#message' },
        { name: 'Wishes', href: '#wishes' },
        { name: 'Garden', href: '#garden' },
        { name: 'Memories', href: '#timeline' },
        { name: 'Celebrate', href: '#celebrate' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'py-3 bg-[#09060e]/70 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'py-5 bg-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                {/* Brand Logo */}
                <a href="#hero" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-300 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(255,92,138,0.5)] group-hover:scale-110 transition-transform">
                        <div className="w-full h-full bg-[#09060e] rounded-full flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-amber-300" />
                        </div>
                    </div>
                    <span className="font-serif font-bold text-lg text-rose-100 tracking-wide group-hover:text-rose-300 transition-colors">
                        {name} <span className="text-amber-300 font-sans text-xs">✨</span>
                    </span>
                </a>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-rose-200 hover:bg-rose-500/10 transition-all duration-300"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Right Action Controls (Audio Player & Mobile Toggle) */}
                <div className="flex items-center gap-3">
                    <AudioPlayer audioUrl={audioUrl} />

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-full glass-panel text-slate-200 border border-white/10"
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-x-4 top-20 z-50 p-6 glass-card rounded-3xl border border-rose-300/20 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-xs uppercase tracking-widest text-rose-300 font-semibold">
                            Navigation
                        </span>
                        <Heart className="w-4 h-4 text-rose-400" />
                    </div>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base font-serif text-slate-200 hover:text-rose-300 py-1 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
};
