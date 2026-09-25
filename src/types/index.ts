export interface WishCardItem {
    id: string;
    title: string;
    subtitle: string;
    message: string;
    icon: string;
    badge: string;
    accentColor: string;
}

export interface GiftSurprise {
    id: number;
    title: string;
    message: string;
    color: string;
    ribbonColor: string;
    tag: string;
}

export interface TimelineMilestone {
    year: string;
    title: string;
    subtitle: string;
    description: string;
    tag: string;
    icon: string;
}

export interface BirthdayConfig {
    name: string;
    nickname: string;
    heroTagline: string;
    heroSubtitle: string;
    makeAWishText: string;
    wishGrantedMessage: string;
    letterTitle: string;
    letterSubtitle: string;
    letterParagraphs: string[];
    wishes: WishCardItem[];
    giftSurprises: GiftSurprise[];
    timeline: TimelineMilestone[];
    finalHeading: string;
    finalMessage: string;
    audioUrl?: string;
}
