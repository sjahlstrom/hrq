import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                xs: '450px',
                sm: '575px',
                md: '768px',
                lg: '992px',
                xl: '1200px',
                '2xl': '1400px',
            },
        },
        extend: {
            fontFamily: {
                inter: ['var(--font-inter)', ...fontFamily.sans],
                arimo: ['var(--font-arimo)', ...fontFamily.sans],
                laila: ['var(--font-laila)', ...fontFamily.serif],
                telex: ['var(--font-telex)', ...fontFamily.sans],
            },
            colors: {
                current: 'currentColor',
                transparent: 'transparent',
                white: '#FFFFFF',
                black: '#090E34',
                dark: '#1D2144',

                pantone621: '#3068CC',
                pantone622: '#f29979',

                sunsetRockies: {
                    'deep-blue': '#1a1d38',    // Dark part of the sky
                    'indigo': '#3b4b8a',       // Rich dark blue hue
                    'muted-pink': '#f29979',   // Soft pink/orange glow near horizon
                    'muted-orange': '#f2c57c', // Warm muted orange glow
                    'purple': '#664e7d',       // Transition from orange/pink to blue
                },

                destinOcean: {
                    'turquoise': '#40E0D0',    // Shallow turquoise waters
                    'aqua': '#7FFFD4',         // Vibrant aqua in very shallow areas
                    'deep-blue': '#006994',    // Deep water offshore
                    'seafoam-green': '#9FE2BF', // Lighter seafoam green near the shore
                },

                'off-white': '#e5dfd2',  // Light off-white (complementary to dark grayish-black)
                'cyan': '#42a6e5',  // Vibrant cyan (complementary to golden yellow)
                'coral-pink': '#db837b',  // Soft coral pink (complementary to muted greenish hue)
                'blue-gray': '#3d4a68',  // Deep bluish-grey (complementary to earthy brown)
                'blue-strong': '#315aa8',  // Strong blue (complementary to warm gold-brown)

                teal: {
                    100: '#ccfbfb',  // Lightest teal
                    200: '#99f7f7',
                    300: '#66f2f2',
                    400: '#33eeee',
                    500: '#00eaea',  // Base teal (can be rgb(0, 128, 128))
                    600: '#00bdbd',
                    700: '#009090',
                    800: '#006363',
                    900: '#003636',  // Darkest teal
                },
                night: {
                    DEFAULT: '#0C0D0F',
                    50: '#0C0E10',
                    100: '#020203',
                    200: '#050506',
                    300: '#070708',
                    400: '#090a0b',
                    500: '#0c0d0f',
                    600: '#363b44',
                    700: '#626a7a',
                    800: '#939ba9',
                    900: '#c9cdd4',
                },
                blue: {
                    DEFAULT: '#4A90E2',
                    100: '#0C1A33',
                    200: '#183466',
                    300: '#244E99',
                    400: '#3068CC',
                    500: '#4A90E2',
                    600: '#6BA3E7',
                    700: '#8BB7EC',
                    800: '#ABCBEF',
                    900: '#D2E4F7',
                },

                green: {
                    DEFAULT: '#2ECC71',
                    100: '#0A2917',
                    200: '#14532E',
                    300: '#1F7D44',
                    400: '#29A65A',
                    500: '#2ECC71',
                    600: '#53D58C',
                    700: '#7DDEAA',
                    800: '#A7E8C7',
                    900: '#D2F3E4',
                },
                purple: {
                    DEFAULT: '#9B59B6',
                    100: '#1E0E25',
                    200: '#3D1C4A',
                    300: '#5B296F',
                    400: '#7A378F',
                    500: '#9B59B6',
                    600: '#AF7CC1',
                    700: '#C399CF',
                    800: '#D8B7DC',
                    900: '#EED5E9',
                },
                red: {
                    DEFAULT: '#D0021B',
                    100: '#330204',
                    200: '#660308',
                    300: '#99050C',
                    400: '#CC0710',
                    500: '#D0021B',
                    600: '#E24458',
                    700: '#E97B82',
                    800: '#F1A9AC',
                    900: '#F8D7D8',
                },

                brown: {
                    DEFAULT: '#8C5521',
                    100: '#1c1107',
                    200: '#38220d',
                    300: '#543314',
                    400: '#70441a',
                    500: '#8c5521',
                    600: '#c3762e',
                    700: '#d9985b',
                    800: '#e5ba92',
                    900: '#f2ddc8',
                },
                amber: {
                    DEFAULT: '#F5A623',
                    100: '#331F07',
                    200: '#66410E',
                    300: '#996216',
                    400: '#CC841D',
                    500: '#F5A623',
                    600: '#F7B84F',
                    700: '#FAC17A',
                    800: '#FCD9A5',
                    900: '#FDEAD0',
                },

                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fadeIn 0.5s ease-in-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}

export default config
