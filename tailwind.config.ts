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
                'xl-custom': '1177px', // Custom breakpoint
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

                air_force_blue: {
                    DEFAULT: '#6B8C9F',
                    100: '#151c20',
                    200: '#2a3840',
                    300: '#3f5460',
                    400: '#547080',
                    500: '#6b8c9f',
                    600: '#89a3b2',
                    700: '#a6bac5',
                    800: '#c4d1d8',
                    900: '#e1e8ec',
                },
                cinnabar: {
                    DEFAULT: '#E5421F',
                    100: '#2f0d05',
                    200: '#5d1a0b',
                    300: '#8c2710',
                    400: '#ba3416',
                    500: '#e5421f',
                    600: '#ea694c',
                    700: '#ef8f79',
                    800: '#f5b4a6',
                    900: '#fadad2',
                },
                mountbatten_pink: {
                    DEFAULT: '#9A787C',
                    100: '#1f1819',
                    200: '#3f2f31',
                    300: '#5e474a',
                    400: '#7e5f62',
                    500: '#9a787c',
                    600: '#ae9497',
                    700: '#c2afb1',
                    800: '#d7cacb',
                    900: '#ebe4e5',
                },
                atomic_tangerine: {
                    DEFAULT: '#EB9166',
                    100: '#3c1808',
                    200: '#77300f',
                    300: '#b34817',
                    400: '#e3652a',
                    500: '#eb9166',
                    600: '#efa684',
                    700: '#f3bca3',
                    800: '#f7d3c2',
                    900: '#fbe9e0',
                },
                peach: {
                    DEFAULT: '#F7BB89',
                    100: '#482305',
                    200: '#8f460a',
                    300: '#d7690f',
                    400: '#f29040',
                    500: '#f7bb89',
                    600: '#f8c8a0',
                    700: '#fad5b7',
                    800: '#fce3cf',
                    900: '#fdf1e7',
                },
                light_blue: {
                    DEFAULT: '#AACFDC',
                    100: '#162e37',
                    200: '#2d5d6e',
                    300: '#438ba5',
                    400: '#71afc5',
                    500: '#aacfdc',
                    600: '#b9d8e3',
                    700: '#cbe1ea',
                    800: '#dcebf1',
                    900: '#eef5f8',
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
