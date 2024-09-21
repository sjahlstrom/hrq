import { Inter, Roboto_Mono, Montserrat } from 'next/font/google'

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

export const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '700'], // Specify the weights you need
    display: 'swap',
    variable: '--font-montserrat',
});


// export default function Component() {
//     return (
//         <div>
//             <h1 className={inter.className}>This heading uses Inter font</h1>
//                <p className={roboto_mono.className}>This paragraph uses Roboto Mono font</p>
//             <div className={inter.className}>
//                 <p>This text also uses Inter font</p>
//                 <p style={roboto_mono.style}>But this one uses Roboto Mono</p>
//              </div>
//         </div>
//    )
// }