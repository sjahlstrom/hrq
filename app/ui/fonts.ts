import { Inter, Arimo, Laila, Telex, Nunito, Palanquin } from 'next/font/google'

export const nunito = Nunito({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-nunito',
})

export const palanquin = Palanquin({
    subsets: ['latin'],
    display: 'swap',
    weight: ['100', '200','300', '400', '500', '600', '700'],
    variable: '--font-palanquin',
})


//

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
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
