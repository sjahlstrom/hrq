// import React from 'react';
//
// interface User {
//     username: string;
//     email: string;
//     testCompleted?: boolean;
//     summedTotal?: number;
//     testResponse?: any[]; // Assuming testResponse is an array; adjust the type if necessary
// }
//
// interface UserCardProps {
//     selectedUser: User | null;
//     closeUserCard: () => void;
// }
//
// const UserCard: React.FC<UserCardProps> = ({ selectedUser, closeUserCard }) => {
//     if (!selectedUser) return null;
//
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg border-2 border-gray-700">
//                 {/* Adjusted width */}
//                 <div className="flex flex-col gap-4 border-2 border-gray-400 p-4 rounded-lg">
//                     <h2 className="text-sm text-gray-700 font-semibold truncate p-2 rounded">
//                         {selectedUser.username}&nbsp;&nbsp;{selectedUser.email}
//                     </h2>
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//                         <p className="text-gray-700 p-2 rounded">
//                             Test Completed: {selectedUser.testCompleted ? 'Yes' : 'No'}
//                         </p>
//                         {/* Display summed total if test is completed */}
//                         {selectedUser.testCompleted && selectedUser.summedTotal !== undefined && (
//                             <p className="text-gray-700 p-2 rounded">
//                                 Composite Score: {selectedUser.summedTotal}
//                             </p>
//                         )}
//                         {/* Display questions answered if test is not completed but responses exist */}
//                         {!selectedUser.testCompleted && selectedUser.testResponse && selectedUser.testResponse.length > 0 && (
//                             <p className="text-gray-700 p-2 rounded">
//                                 Questions Answered: {selectedUser.testResponse.length}
//                             </p>
//                         )}
//                     </div>
//                     <button
//                         className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-pantone621 px-6 font-medium text-gray-900 border-2 p-2 hover:bg-pantone624"
//                         onClick={closeUserCard}
//                     >
//                         <span>Close</span>
//                         <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
//                             <div className="relative h-full w-8 bg-pantone622"></div>
//                         </div>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default UserCard;

import React, { useRef, useEffect } from 'react';

interface User {
    username: string;
    email: string;
    testCompleted?: boolean;
    summedTotal?: number;
    testResponse?: any[]; // Assuming testResponse is an array; adjust the type if necessary
}

interface UserCardProps {
    selectedUser: User | null;
    closeUserCard: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ selectedUser, closeUserCard }) => {
    if (!selectedUser) return null;

    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Handler to close the card when clicking outside of it
        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                closeUserCard();
            }
        };

        // Add event listener to detect clicks outside
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeUserCard]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                ref={cardRef}
                className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg border-2 border-gray-700"
            >
                {/* Adjusted width */}
                <div className="flex flex-col gap-4 border-2 border-gray-400 p-4 rounded-lg">
                    <h2 className="text-sm text-gray-700 font-semibold truncate p-2 rounded">
                        {selectedUser.username}&nbsp;&nbsp;{selectedUser.email}
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <p className="text-gray-700 p-2 rounded">
                            Test Completed: {selectedUser.testCompleted ? 'Yes' : 'No'}
                        </p>
                        {/* Display summed total if test is completed */}
                        {selectedUser.testCompleted && selectedUser.summedTotal !== undefined && (
                            <p className="text-gray-700 p-2 rounded">
                                Composite Score: {selectedUser.summedTotal}
                            </p>
                        )}
                        {/* Display questions answered if test is not completed but responses exist */}
                        {!selectedUser.testCompleted &&
                            selectedUser.testResponse &&
                            selectedUser.testResponse.length > 0 && (
                                <p className="text-gray-700 p-2 rounded">
                                    Questions Answered: {selectedUser.testResponse.length}
                                </p>
                            )}
                    </div>
                    <button
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-pantone621 px-6 font-medium text-gray-900 border-2 p-2 hover:bg-pantone624"
                        onClick={closeUserCard}
                    >
                        <span>Close</span>
                        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                            <div className="relative h-full w-8 bg-pantone622"></div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
