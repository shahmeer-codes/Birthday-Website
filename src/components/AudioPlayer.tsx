import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioPlayerProps {
    audioUrl?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const toggleAudio = () => {
        if (!audioRef.current && audioUrl) {
            audioRef.current = new Audio(audioUrl);
            audioRef.current.loop = true;
            audioRef.current.volume = 0.4;
        }

        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current
                    .play()
                    .then(() => setIsPlaying(true))
                    .catch((err) => console.log("Audio playback blocked by browser policy:", err));
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
