'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserRole } from '@/app/api/users' // Make sure to import useRouter correctly from Next.js

const YourComponent = () => {
    const router = useRouter();

    // Define the checkUserRole function as a standalone method


    // Call the function inside useEffect or any other place you need it
    useEffect(() => {
        const checkUserRole = async () => {
            try {
                const role = await getUserRole(); // Fetch the user's role

                if (role !== 'ADMIN') {
                    router.push('/'); // Redirect to home page if the role is not ADMIN
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
                // Handle the error appropriately
            }
        };
        checkUserRole();
    }, [router]);

    return (
        <div>
            {/* Your component's content */}
        </div>
    );
};

export default YourComponent;
