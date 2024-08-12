import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <Image src="/images/logo/logo.png" alt="HighRQ" height="100" width="100" />
            <div className={cn("flex flex-col items-center", font.className)}>
            </div>
        </div>
    );
};

export default Logo;