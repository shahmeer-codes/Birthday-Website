import { GiftSurprise } from '../types';

export interface BirthdayConfig {
    name: string;
    heroTagline: string;
    heroSubtitle: string;
    gameTitle: string;
    gameSubtitle: string;
    makeAWishText: string;
    letterTitle: string;
    letterSubtitle: string;
    letterParagraphs: string[];
    finalHeading: string;
    finalMessage: string;
    winningHeading: string;
    winningMessage: string;
    audioUrl: string;
    giftSurprises: GiftSurprise[];
}

export const birthdayConfig: BirthdayConfig = {
    name: "Zobia",
    heroTagline: "Happy Birthday, Zobia! ✨",
    heroSubtitle: "Today is a little more special than usual. A magical sky adventure is waiting for you...",
    gameTitle: "Birthday Sky Adventure ✈️",
    gameSubtitle: "Fly through the magical clouds, collect golden stars, and burst enchanted targets to unlock the birthday surprise!",
    makeAWishText: "Make a Wish ✨",

    letterTitle: "To Someone Truly Special...",
    letterSubtitle: "A Heartfelt Note for Zobia",
    letterParagraphs: [
        "On this wonderful day, I want to take a moment to celebrate how wonderful, inspiring, and special you are.",
        "May your year ahead be filled with laughter that warms your heart, unexpected moments of joy, and dreams coming true one by one.",
        "Keep shining your beautiful light everywhere you go, because you bring so much happiness into the lives of everyone around you.",
        "Wishing you the happiest, sweetest, and most magical birthday ever!"
    ],

    finalHeading: "Happy Birthday, Zobia! 🎂💗",
    finalMessage: "May your days be filled with beautiful moments, your heart with happiness, and this new year of your life with memories you'll always treasure.",
    winningHeading: "Happy Birthday, Zobia! 🎂💗",
    winningMessage: "May your days be filled with beautiful moments, your heart with happiness, and this new year of your life with memories you'll always treasure.",

    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",

    giftSurprises: [
        {
            id: 1,
            title: "A Little Sparkle",
            message: "You deserve all the sweetness and joy the world has to offer today 💕",
            tag: "Sweet Surprise",
            color: "#ff85a1",
            ribbonColor: "#ffe066",
        },
        {
            id: 2,
            title: "Warm Wishes",
            message: "May your year ahead be as bright and beautiful as your spirit ✨",
            tag: "Golden Blessing",
            color: "#d8b4fe",
            ribbonColor: "#ff85a1",
        },
        {
            id: 3,
            title: "Happiness Always",
            message: "Never forget how appreciated and special you are to everyone around you 🌸",
            tag: "Heartfelt Gift",
            color: "#f8c8dc",
            ribbonColor: "#d8b4fe",
        },
    ],
};
