export const gameConfig = {
    requiredStars: 10,
    totalHearts: 5,
    totalSecrets: 3,
    playerSpeed: 6.8,
    worldRadius: 9.0,
};

export interface CollectibleItem {
    id: string;
    type: 'star' | 'heart' | 'ribbon' | 'flower' | 'gift' | 'final_star';
    area: 'pink_garden' | 'starry_sky' | 'birthday_garden' | 'gift_corner';
    position: [number, number, number];
    collected: boolean;
    value: number;
    message?: string;
}

export const initialCollectibles: CollectibleItem[] = [
    // AREA 1 — Pink Garden 🌸
    { id: 'star_1', type: 'star', area: 'pink_garden', position: [-5.5, 0.5, -2], collected: false, value: 1 },
    { id: 'star_2', type: 'star', area: 'pink_garden', position: [-4.0, 0.5, -5.5], collected: false, value: 1 },
    { id: 'heart_1', type: 'heart', area: 'pink_garden', position: [-3.2, 0.5, -3.0], collected: false, value: 2 },
    { id: 'flower_1', type: 'flower', area: 'pink_garden', position: [-6.0, 0.5, -4.0], collected: false, value: 1 },
    { id: 'gift_1', type: 'gift', area: 'pink_garden', position: [-4.5, 0.5, -1.2], collected: false, value: 3, message: "A little happiness for you 💗" },

    // AREA 2 — Starry Sky ✨
    { id: 'star_3', type: 'star', area: 'starry_sky', position: [5.0, 0.5, -3.0], collected: false, value: 1 },
    { id: 'star_4', type: 'star', area: 'starry_sky', position: [3.5, 0.5, -6.0], collected: false, value: 1 },
    { id: 'star_5', type: 'star', area: 'starry_sky', position: [6.5, 0.5, -1.5], collected: false, value: 1 },
    { id: 'heart_2', type: 'heart', area: 'starry_sky', position: [4.0, 0.5, -4.5], collected: false, value: 2 },
    { id: 'ribbon_1', type: 'ribbon', area: 'starry_sky', position: [2.5, 0.5, -2.5], collected: false, value: 1 },

    // AREA 3 — Birthday Garden 🎀
    { id: 'star_6', type: 'star', area: 'birthday_garden', position: [-4.5, 0.5, 3.5], collected: false, value: 1 },
    { id: 'star_7', type: 'star', area: 'birthday_garden', position: [-6.0, 0.5, 5.0], collected: false, value: 1 },
    { id: 'heart_3', type: 'heart', area: 'birthday_garden', position: [-3.0, 0.5, 5.5], collected: false, value: 2 },
    { id: 'heart_4', type: 'heart', area: 'birthday_garden', position: [-2.0, 0.5, 3.0], collected: false, value: 2 },
    { id: 'gift_2', type: 'gift', area: 'birthday_garden', position: [-5.0, 0.5, 2.0], collected: false, value: 3, message: "You deserve beautiful moments." },

    // AREA 4 — Gift Corner 🎁
    { id: 'star_8', type: 'star', area: 'gift_corner', position: [4.5, 0.5, 3.5], collected: false, value: 1 },
    { id: 'star_9', type: 'star', area: 'gift_corner', position: [6.0, 0.5, 5.0], collected: false, value: 1 },
    { id: 'heart_5', type: 'heart', area: 'gift_corner', position: [3.0, 0.5, 5.5], collected: false, value: 2 },
    { id: 'gift_3', type: 'gift', area: 'gift_corner', position: [5.0, 0.5, 2.0], collected: false, value: 3, message: "May this year bring you countess reasons to smile." },

    // SPECIAL FINAL STAR — Placed in the Center Island ✨
    { id: 'star_10', type: 'final_star', area: 'starry_sky', position: [0, 0.8, 0], collected: false, value: 5 },
];
