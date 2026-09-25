import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from './config/birthdayConfig';
import { GiftSurprise } from './types';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { WishModal } from './components/WishModal';
import { GiftModal } from './components/GiftModal';
import { BirthdayMessage } from './components/BirthdayMessage';
import { WishCards } from './components/WishCards';
import { FlowerGarden3DCanvas } from './three/FlowerGarden3D';
import { AirplaneGameSection } from './components/AirplaneGameSection';
import { TimelineSection } from './components/TimelineSection';
import { FinalCelebration } from './components/FinalCelebration';

export function App() {
    const [loadingDone, setLoadingDone] = useState(false);
    const [isBlownOut, setIsBlownOut] = useState(false);
    const [isWishMode, setIsWishMode] = useState(false);
    const [wishModalOpen, setWishModalOpen] = useState(false);
    const [activeGift, setActiveGift] = useState<GiftSurprise | null>(null);

    const handleCakeClick = () => {
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#ff85a1', '#d8b4fe', '#ffe066']
        });
    };

    const handleMakeWishClick = () => {
        setIsWishMode(true);
        setTimeout(() => {
            setIsBlownOut(true);
            setTimeout(() => {
                setWishModalOpen(true);
            }, 1600);
        }, 1200);
    };

    const handleCloseWishModal = () => {
        setWishModalOpen(false);
        setIsWishMode(false);
    };

    const handleOpenGift = (gift: GiftSurprise) => {
        setActiveGift(gift);
        confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.7 },
            colors: [gift.color, gift.ribbonColor, '#ffffff']
        });
    };

    const handleCelebrateTrigger = () => {
        setIsBlownOut(false);
        setIsWishMode(false);
    };

    const handleContinueCelebration = () => {
        const celebrationEl = document.getElementById('celebrate');
        if (celebrationEl) {
            celebrationEl.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-[#0e0a14] text-slate-100 overflow-x-hidden relative selection:bg-rose-500/30 selection:text-rose-200 cursor-default">
            {/* Custom Desktop Glowing Pointer Cursor */}
            <CustomCursor />

            {/* Loading Screen Overlay */}
            <LoadingScreen onLoaded={() => setLoadingDone(true)} />

            {/* Navigation Bar */}
            <Navigation name={birthdayConfig.name} audioUrl={birthdayConfig.audioUrl} />

            <main>
                {/* Hero Section */}
                <HeroSection
                    name={birthdayConfig.name}
                    tagline={birthdayConfig.heroTagline}
                    subtitle={birthdayConfig.heroSubtitle}
                    makeAWishText={birthdayConfig.makeAWishText}
                    isBlownOut={isBlownOut}
                    isWishMode={isWishMode}
                    gifts={birthdayConfig.giftSurprises || []}
                    onCakeClick={handleCakeClick}
                    onMakeWishClick={handleMakeWishClick}
                    onOpenGift={handleOpenGift}
                />

                {/* Heartfelt Birthday Message Section */}
                <BirthdayMessage
                    title={birthdayConfig.letterTitle}
                    subtitle={birthdayConfig.letterSubtitle}
                    paragraphs={birthdayConfig.letterParagraphs}
                />

                {/* 3D Wish Cards Grid */}
                <WishCards wishes={[]} />

                {/* Interactive 3D Flower Garden Section */}
                <section id="garden" className="py-12 px-4 max-w-6xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-6">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/20 text-xs font-semibold uppercase tracking-widest text-rose-300 mb-3">
                            Nature & Harmony
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-rose-100">
                            Bloom Where You Are Planted 🌸
                        </h2>
                    </div>
                    <FlowerGarden3DCanvas />
                </section>

                {/* MAIN FEATURE: Playable 3D Airplane Game ("Birthday Sky Adventure ✈️") */}
                <AirplaneGameSection onContinueCelebration={handleContinueCelebration} />

                {/* Birthday Milestone Timeline */}
                <TimelineSection milestones={[]} />

                {/* Final Grand Celebration Section */}
                <FinalCelebration
                    name={birthdayConfig.name}
                    finalHeading={birthdayConfig.finalHeading}
                    finalMessage={birthdayConfig.finalMessage}
                    onCelebrateTrigger={handleCelebrateTrigger}
                />
            </main>

            {/* Footer */}
            <footer className="py-8 text-center text-xs text-slate-400 border-t border-white/5 bg-[#08050c]">
                <p className="font-script text-base text-rose-300/80 mb-1">
                    Crafted with love & magic for Zobia's Birthday ✨
                </p>
                <p className="font-mono text-[10px] text-slate-400">
                    Powered by React • Three.js • GSAP • Tailwind CSS
                </p>
            </footer>

            {/* Modals */}
            <WishModal
                isOpen={wishModalOpen}
                onClose={handleCloseWishModal}
                message="May every wish you make today find its way to you in the sweetest possible way."
            />

            <GiftModal
                gift={activeGift}
                onClose={() => setActiveGift(null)}
            />
        </div>
    );
}

export default App;
