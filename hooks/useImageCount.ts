// hooks/useImageCount.ts
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useImageCount(initialCount: number) {
    const [imageCount, setImageCount] = useState(initialCount);
    const pathname = usePathname();

    const fetchImageCount = async () => {
        try {
            const response = await fetch('/api/profile/images', {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
            if (response.ok) {
                const images = await response.json();
                setImageCount(images.length);
            }
        } catch (error) {
            console.error('Error fetching image count:', error);
        }
    };

    useEffect(() => {
        // If we're on the profile page, fetch the count
        if (pathname === '/profile') {
            fetchImageCount();
        }
    }, [pathname]);

    // Set up a focus event listener to update count when tab becomes active
    useEffect(() => {
        const handleFocus = () => {
            if (pathname === '/profile') {
                fetchImageCount();
            }
        };

        window.addEventListener('focus', handleFocus);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                handleFocus();
            }
        });

        return () => {
            window.removeEventListener('focus', handleFocus);
            document.removeEventListener('visibilitychange', handleFocus);
        };
    }, [pathname]);

    return imageCount;
}