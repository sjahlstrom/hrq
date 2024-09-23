import { Inter, Roboto_Mono, Poppins, Open_Sans} from 'next/font/google'

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

export const roboto_mono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mono',
})

export const poppins= Poppins({
    subsets: ['latin'],
    weight: ['300', '500', '700'], // Specify the weights you need
    display: 'swap',
    variable: '--font-open-sans',
})


export const open_sans = Open_Sans({
    subsets: ['latin'],
    weight: ['300', '500', '700'], // Specify the weights you need
    display: 'swap',
    variable: '--font-open-sans',
})