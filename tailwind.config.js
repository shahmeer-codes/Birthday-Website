/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                blush: {
                    50: '#fff5f7',
                    100: '#ffeef2',
                    200: '#ffd6e0',
                    300: '#ffb3c6',
                    400: '#ff85a1',
                    500: '#ff5c8a',
                    600: '#e03a6b',
                    700: '#b8234d',
                },
                rose: {
                    gold: '#e0a96d',
                    soft: '#f8c8dc',
                    deep: '#8a2b53',
                },
                lavender: {
                    light: '#f3e8ff',
                    soft: '#e9d5ff',
                    glow: '#d8b4fe',
                }
            },
            fontFamily: {
                serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
                sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
                handwriting: ['Dancing Script', 'Great Vibes', 'cursive'],
            },
            animation: {
                'float-slow': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
                'sparkle': 'sparkle 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-12px) rotate(2deg)' },
                },
                pulseGlow: {
                    '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 8px rgba(255, 182, 193, 0.6))' },
                    '50%': { opacity: '1', filter: 'drop-shadow(0 0 20px rgba(255, 182, 193, 0.9))' },
                },
                sparkle: {
                    '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
                    '50%': { opacity: '1', transform: 'scale(1.2)' },
                }
            }
        },
    },
    plugins: [],
}
