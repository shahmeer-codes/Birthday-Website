import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioPlayerProps {
    audioUrl?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const getAudio = () => {
        if (!audioRef.current && audioUrl) {
            const audio = new Audio(audioUrl);
            audio.loop = true;
            audio.volume = 0.4;
            audioRef.current = audio;
        }
        return audioRef.current;
    };

    useEffect(() => {
        if (!audioUrl) return;

        const audio = getAudio();
        if (!audio) return;

        let cleanupListeners: (() => void) | null = null;

        const handleFirstInteraction = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current
                    .play()
                    .then(() => {
                        setIsPlaying(true);
                        removeListeners();
                    })
                    .catch((err) => {
                        console.log("Audio playback on user interaction failed:", err);
                    });
            } else {
                removeListeners();
            }
        };

        const removeListeners = () => {
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
            window.removeEventListener('pointerdown', handleFirstInteraction);
        };

        const setupInteractionListeners = () => {
            window.addEventListener('click', handleFirstInteraction, { once: true });
            window.addEventListener('touchstart', handleFirstInteraction, { once: true });
            window.addEventListener('keydown', handleFirstInteraction, { once: true });
            window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
            cleanupListeners = removeListeners;
        };

        if (audio.paused) {
            audio
                .play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch((err) => {
                    console.log("Audio autoplay blocked by browser policy, waiting for first user interaction:", err);
                    setupInteractionListeners();
                });
        }

        return () => {
            if (cleanupListeners) {
                cleanupListeners();
            }
        };
    }, [audioUrl]);

    const toggleAudio = () => {
        const audio = getAudio();
        if (audio) {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio
                    .play()
                    .then(() => setIsPlaying(true))
                    .catch((err) => console.log("Audio playback error:", err));
            }
        }
    };

    return (
        <button
            onClick={toggleAudio}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel glass-panel-hover text-xs font-medium text-rose-200 border border-rose-300/20 shadow-lg group transition-all duration-300"
            title={isPlaying ? "Mute Background Music" : "Play Background Music"}
        >
            <Music className="w-3.5 h-3.5 text-rose-300 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">♫ Music</span>
            {isPlaying ? (
                <>
                    <Volume2 className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                    <div className="flex items-end gap-0.5 h-3 ml-1">
                        <span className="w-0.5 h-full bg-rose-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-0.5 h-2/3 bg-rose-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-0.5 h-full bg-rose-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </>
            ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            )}
        </button>
    );
};
