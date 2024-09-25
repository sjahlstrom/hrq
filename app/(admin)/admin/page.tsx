'use client'

import Sidebar from '@/app/(admin)/admin/_components/Sidebar'
import CheckUserRole from '@/components/CheckUserRole'

const IndexPage =  () => {

    return (
        <>
            <CheckUserRole />
            <div className="flex h-screen">
                <div className="mt-24 rounded bg-pantone624 hidden md:block h-[88vh] w-[260px]">
                    <Sidebar />
                </div>
            </div>
        </>
    )
}

export default IndexPage
