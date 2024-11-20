import { Arimo, Laila, Nunito, Telex, Noto_Sans } from 'next/font/google'

export const nunito = Nunito({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-nunito',
})

export const arimo = Arimo({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-arimo',
    weight: ['400', '700'],
})

export const laila = Laila({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-laila',
    weight: ['300', '400', '500', '600', '700'],
})

export const telex = Telex({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-telex',
    weight: ['400'],
})
export const notoSans = Noto_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-noto-sans',
    weight: ['400'],
})
