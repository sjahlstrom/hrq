'use client'

import { useEffect, useState } from "react";
import { getUserRole } from '@/app/api/answers' // Adjust the import as needed
import { toast, Toaster } from 'sonner'; // Import Sonner's toast and Toaster component

const Admin = () => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const checkUserRole = async () => {
            const role = await getUserRole();
            if (role !== "ADMIN") {
                // toast.error("Access Denied", {
                //     style: {
                //         backgroundColor: 'red',
                //         color: 'white',
                //         fontWeight: 'bold',
                //     }
                // }); // Show a red toast with white text and bold font if the user is not an admin
                console.log("Access Denied");
            }
            setIsAdmin(role === "ADMIN");
        };

        checkUserRole();

    }, []);

    if (isAdmin === null) {
        return <div>Loading...</div>; // Show a loading indicator while checking the role
    }

    return (
        <div>
            <Toaster richColors /> {/* Add the Toaster component to render toasts */}
            {isAdmin ? <div>Admin Page</div> : null}
        </div>
    );
};

export default Admin;
