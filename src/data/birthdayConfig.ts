import { GiftSurprise, WishCardItem, TimelineMilestone } from '../types';

export interface BirthdayConfig {
    name: string;
    heroTagline: string;
    heroSubtitle: string;
    makeAWishText: string;
    letterTitle: string;
    letterSubtitle: string;
    letterParagraphs: string[];
    wishes: WishCardItem[];
    timeline: TimelineMilestone[];
    finalHeading: string;
    finalMessage: string;
    wishGrantedMessage: string;
    winningHeading: string;
    winningMessage: string;
    audioUrl: string;
    giftSurprises: GiftSurprise[];
}

export const birthdayConfig: BirthdayConfig = {
    name: "Zobia",
    heroTagline: "Happy Birthday, Zobia!",
    heroSubtitle: "Today is all about celebrating you, your beautiful smile, and the magic you bring into the world.",
    makeAWishText: "Make a Wish ✨",

    letterTitle: "To Someone Truly Special...",
    letterSubtitle: "A Heartfelt Note for Zobia",
    letterParagraphs: [
        "On this wonderful day, I want to take a moment to celebrate how wonderful, inspiring, and special you are.",
        "May your year ahead be filled with laughter that warms your heart, unexpected moments of joy, and dreams coming true one by one.",
        "Keep shining your beautiful light everywhere you go, because you bring so much happiness into the lives of everyone around you.",
        "Wishing you the happiest, sweetest, and most magical birthday ever!"
    ],

    wishes: [
        {
            id: "wish-1",
            title: "Keep Smiling",
            subtitle: "Pure Joy",
            message: "May your days be filled with warm smiles and genuine laughter that brightens every room.",
            icon: "Smile",
            badge: "Happiness",
            accentColor: "from-rose-400 to-pink-500",
        },
        {
            id: "wish-2",
            title: "Keep Dreaming",
            subtitle: "Limitless Potential",
            message: "Never stop chasing the things that make your heart sparkle and your eyes shine.",
            icon: "Sparkles",
            badge: "Dreams",
            accentColor: "from-amber-300 to-rose-400",
        },
        {
            id: "wish-3",
            title: "Keep Growing",
            subtitle: "Strength & Grace",
            message: "May every experience make you wiser, stronger, and even more wonderfully yourself.",
            icon: "TrendingUp",
            badge: "Journey",
            accentColor: "from-pink-400 to-purple-400",
        },
        {
            id: "wish-4",
            title: "Keep Being You",
            subtitle: "One of a Kind",
            message: "You are unique, thoughtful, and deeply appreciated just as you are.",
            icon: "Heart",
            badge: "Forever",
            accentColor: "from-rose-300 to-amber-300",
        },
    ],

    timeline: [
        {
            year: "Chapter 1",
            title: "Fresh Beginnings",
            subtitle: "New Opportunities Ahead",
            description: "Stepping into a brand new age filled with exciting choices, new friendships, and infinite possibilities.",
            icon: "Sunrise",
            tag: "Growth",
        },
        {
            year: "Chapter 2",
            title: "Unforgettable Moments",
            subtitle: "Memories to Cherish",
            description: "Collecting golden memories, late-night laughs, travels, and quiet moments of contentment.",
            icon: "Camera",
            tag: "Happiness",
        },
        {
            year: "Chapter 3",
            title: "Shining Success",
            subtitle: "Achieving Every Goal",
            description: "Watching your hard work bloom into success and seeing your biggest wishes come true.",
            icon: "Award",
            tag: "Achievement",
        },
        {
            year: "Chapter 4",
            title: "A Future Full of Light",
            subtitle: "Endless Celebrations",
            description: "Surrounded by love, peace, and abundance today and every single day that follows.",
            icon: "Star",
            tag: "Future",
        },
    ],

    finalHeading: "Happy Birthday, Zobia! 🎂",
    finalMessage: "May your days be filled with beautiful moments, your heart with happiness, and this new year of your life with memories you'll always treasure.",
    wishGrantedMessage: "May every wish you make today find its way to you in the sweetest possible way.",

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
