import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
   return (
      <>
         <Link href="/">
            <div className="flex items-center gap-x-4 mb-10 hover:opacity-75 transition">
               <Image
                  src='/images/logo/logo.png'
                  alt="HighRQ"
                  height={340}
                  width={340}
               />
            </div>
         </Link>
      </>
   );
};