import { redirect } from 'next/navigation'
import { getUserRole } from '@/app/api/answers'
import { currentUser } from '@clerk/nextjs/server'
import Sidebar from '@/app/(admin)/admin/_components/Sidebar'

const IndexPage = async () => {
    const role = await getUserRole()

    if (role !== 'ADMIN') {
        redirect('/')
    }

    return (
        <>
            <div className="flex h-screen">
                <div className="mt-24 rounded bg-pantone624 hidden md:block h-[88vh] w-[260px]">
                    <Sidebar />
                </div>
            </div>
        </>
    )
}

export default IndexPage
