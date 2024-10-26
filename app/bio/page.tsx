import Breadcrumb from '@/components/common/bread-crumb'
import Bio from '@/components/Bio/bio'
import { Metadata } from 'next'
import Image from 'next/image'

// const BioPage = () => {
//     return (
//         <>
//             <div className="absolute inset-0" style={{ zIndex: -1 }}>
//                 <div>
//                     {/*<div className="bg-green-200">*/}
//                     {/*<Image*/}
//                     {/*    src="/images/bio/biobg.jpg"*/}
//                     {/*    alt="Background image"*/}
//                     {/*    fill*/}
//                     {/*    priority*/}
//                     {/*    style={{ objectFit: 'cover', opacity: "0.5" }}*/}
//                     {/*/>*/}
//                         <Breadcrumb
//                             pageName="Bio"
//                             description="The main  is to focus on helping people to find their potential and increasing their satisfaction in their relationship."
//                         />
//                         <Bio />
//                     {/*</div>*/}
//                 </div>
//             </div>
//         </>
//     )
// }

export const metadata: Metadata = {
    title: "Bio",
}

const BioPage = () => {
    return (
        <div>
            <Breadcrumb
                pageName="Bio"
                description="The main 'thrust' is to focus on helping people to find their potential and increasing their satisfaction in their relationship."
            />
            <Bio />
        </div>
    )
}

export default BioPage
