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
            backgroundImage: {
                'custom-radial': 'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
            },
            clrs: {
                sky: {
                    400: '#38bdf8', // Tailwind's default sky-400 color
                },
                blue: {
                    80: '#e0f2fe', // Custom blue color at 80% lightness
                },
            },


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

                hrqColors: {
                    skyBlue: {
                        100: '#e1eff6', // Lightest
                        200: '#c3dcea',
                        300: '#aacedb',
                        400: '#91b0cc',
                        500: '#7892be', // Base
                        600: '#6179a0',
                        700: '#4d6283',
                        800: '#3a4b67',
                        900: '#27354b'  // Darkest
                    },
                    slateBlue: {
                        100: '#cfd7dd',
                        200: '#b0c0c8',
                        300: '#90aab2',
                        400: '#71939d',
                        500: '#517c67', // Base
                        600: '#40655a',
                        700: '#334f4b',
                        800: '#26393c',
                        900: '#1a242d'
                    },
                    coolGray: {
                        100: '#dfe6ec',
                        200: '#c2cdd4',
                        300: '#a5b3bc',
                        400: '#899ba9',
                        500: '#708593', // Base
                        600: '#596c7a',
                        700: '#445560',
                        800: '#303e47',
                        900: '#1c2830'
                    },
                    sunsetOrange: {
                        100: '#f8d2cb',
                        200: '#f2a399',
                        300: '#ec7667',
                        400: '#e44f26',
                        500: '#bd4321', // Base
                        600: '#97361b',
                        700: '#7a2b17',
                        800: '#5d2212',
                        900: '#3f170d'
                    },
                    peach: {
                        100: '#fde5d4',
                        200: '#facbb0',
                        300: '#f5b08d',
                        400: '#f0966a',
                        500: '#eb7d47', // Base
                        600: '#c4633a',
                        700: '#9d4e2f',
                        800: '#763924',
                        900: '#4e2518'
                    },
                    coral: {
                        100: '#f8d5cb',
                        200: '#f0ac9d',
                        300: '#e88271',
                        400: '#e05944',
                        500: '#b8483a', // Base
                        600: '#91372e',
                        700: '#6c2a23',
                        800: '#47201a',
                        900: '#23100d'
                    }
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
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },

                fadeIn: {
                    '0%': { opacity: '0.3' },
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
                'fade-in': 'fadeIn 1.0s ease-in-out',
                'slideUp': 'slideUp 0.5s ease-out forwards',

            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}

export default config
