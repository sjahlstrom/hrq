// 'use client';
// import React, { useEffect, useState } from 'react';
// import sampleQuestions from '@/components/Analysis/Data/SampleAnalysis';
// import testQuestions from '@/components/Analysis/Data/Analysis';
// import { useSearchParams } from 'next/navigation';
// import { getTestResponses } from '@/app/api/answers';
//
// const lies = [38, 45, 52, 57, 69, 79, 91, 102, 109, 125];
//
// const fetchSampleAnswers = async (setAnswers, setMatchedQuestions) => {
//     try {
//         const fetchedAnswers = localStorage.getItem('array');
//         if (fetchedAnswers) {
//             const answers = JSON.parse(fetchedAnswers);
//             setAnswers(answers);
//             const questions = answers
//                 .map(
//                     (answer, index) =>
//                         sampleQuestions.find(
//                             (q) =>
//                                 q.answer === index &&
//                                 q.low <= answer &&
//                                 q.high >= answer &&
//                                 q.scale
//                         ) || null
//                 )
//                 .filter((q) => q !== null);
//             setMatchedQuestions(questions);
//         } else {
//             setMatchedQuestions([]);
//         }
//     } catch (error) {
//         console.error('Error fetching sample answers:', error);
//         setMatchedQuestions([]);
//     }
// };
//
// const fetchTestAnswers = async (setAnswers, setMatchedQuestions) => {
//     try {
//         const testResponses = await getTestResponses();
//         if (testResponses) {
//             setAnswers(testResponses);
//             const questions = testResponses
//                 .map(
//                     (answer, index) =>
//                         testQuestions.find(
//                             (q) =>
//                                 q.answer === index &&
//                                 q.low <= answer &&
//                                 q.high >= answer &&
//                                 q.scale
//                         ) || null
//                 )
//                 .filter((q) => q !== null);
//             setMatchedQuestions(questions);
//         } else {
//             setMatchedQuestions([]);
//         }
//     } catch (error) {
//         console.error('Error fetching test responses:', error);
//         setMatchedQuestions([]);
//     }
// };
//
// const Analysis = () => {
//     const [answers, setAnswers] = useState<number[]>([]);
//     const [matchedQuestions, setMatchedQuestions] = useState<
//         { question: string; answer: number; scale: string; analysis: string }[]
//     >([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [itemsPerPage] = useState<number>(5); // Adjust the number of items per page
//
//     const searchParams = useSearchParams();
//     const mode = searchParams.get('mode');
//
//     useEffect(() => {
//         const fetchAnswers = async () => {
//             setLoading(true);
//             if (mode === 'sample') {
//                 await fetchSampleAnswers(setAnswers, setMatchedQuestions);
//             } else if (mode === 'test') {
//                 await fetchTestAnswers(setAnswers, setMatchedQuestions);
//             } else {
//                 setMatchedQuestions([]);
//             }
//             setLoading(false);
//         };
//
//         fetchAnswers();
//     }, [mode]);
//
//     // Pagination Logic
//     const indexOfLastQuestion = currentPage * itemsPerPage;
//     const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
//     const currentQuestions = matchedQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
//     const totalPages = Math.ceil(matchedQuestions.length / itemsPerPage);
//
//     const handlePageChange = (pageNumber: number) => {
//         setCurrentPage(pageNumber);
//         window.scrollTo({ top: 440, behavior: 'smooth' });
//     };
//
//     // Determine if we are on the last page of non-lie questions
//     const isLastNonLiePage = currentPage === totalPages;
//
//     return (
//         <section className="p-6 bg-gray-100 min-h-screen">
//             <h1 className="text-3xl font-bold text-gray-800 mb-6">Analysis...</h1>
//             {loading ? (
//                 <p className="text-gray-600">Loading...</p>
//             ) : currentQuestions.length > 0 ? (
//                 <div className="space-y-4">
//                     {currentQuestions
//                         .filter((question) => !lies.includes(question.answer))
//                         .map((question, index) => (
//                             <div
//                                 key={index}
//                                 className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
//                             >
//                                 <h2 className="text-2xl font-semibold text-gray-900 mb-2">
//                                     {question.question}
//                                 </h2>
//                                 <p className="text-gray-500">Scale: {question.scale}</p>
//                                 <p className="text-gray-700">{question.analysis}</p>
//                                 {/* For testing only*/}
//                                 <br />
//                                 <p className="text-gray-500">
//                                     Question: {question.answer} - For testing only
//                                 </p>
//                             </div>
//                         ))}
//
//                     {/* Pagination Controls */}
//                     {!isLastNonLiePage && (
//                         <div className="mt-6 flex justify-between">
//                             <button
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                                 className="px-4 py-2 bg-logo-green text-gray-200 rounded"
//                             >
//                                 Previous
//                             </button>
//                             <span className="text-gray-700">
//                                 Page {currentPage} of {totalPages}
//                             </span>
//                             <button
//                                 onClick={() => handlePageChange(currentPage + 1)}
//                                 disabled={currentPage === totalPages}
//                                 className="px-4 py-2 bg-logo-green text-gray-200 rounded"
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             ) : (
//                 <p className="text-gray-600">No matching questions found.</p>
//             )}
//
//             {/* For lie scale questions */}
//             {isLastNonLiePage && (
//                 <div className="mt-8">
//                     <h2 className="text-2xl font-semibold text-gray-900 mb-4">
//                         Lie Scale Questions
//                     </h2>
//                     {matchedQuestions
//                         .filter((question) => lies.includes(question.answer))
//                         .map((question, index) => (
//                             <div
//                                 key={index}
//                                 className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
//                             >
//                                 <p className="text-xl font-medium text-gray-900 mb-2">
//                                     {question.question}
//                                 </p>
//                             </div>
//                         ))}
//                 </div>
//             )}
//         </section>
//     );
// };
//
// export default Analysis;

'use client';
import React, { useEffect, useState } from 'react';
import sampleQuestions from '@/components/Analysis/Data/SampleAnalysis';
import testQuestions from '@/components/Analysis/Data/Analysis';
import { useSearchParams } from 'next/navigation';
import { getTestResponses } from '@/app/api/answers';

const lies = [38, 45, 52, 57, 69, 79, 91, 102, 109, 125];

const Analysis = () => {
    const [answers, setAnswers] = useState<number[]>([]);
    const [matchedQuestions, setMatchedQuestions] = useState<
        { question: string; answer: number; scale: string; analysis: string }[]
    >([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(5); // Adjust the number of items per page

    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');

    // Fetch answers based on mode
    const fetchAnswers = async () => {
        setLoading(true);
        try {
            if (mode === 'sample') {
                const fetchedAnswers = localStorage.getItem('array');
                if (fetchedAnswers) {
                    const parsedAnswers = JSON.parse(fetchedAnswers);
                    setAnswers(parsedAnswers);
                    const questions = parsedAnswers
                        .map(
                            (answer, index) =>
                                sampleQuestions.find(
                                    (q) =>
                                        q.answer === index &&
                                        q.low <= answer &&
                                        q.high >= answer &&
                                        q.scale
                                ) || null
                        )
                        .filter((q) => q !== null);
                    setMatchedQuestions(questions);
                } else {
                    setMatchedQuestions([]);
                }
            } else if (mode === 'test') {
                const testResponses = await getTestResponses();
                if (testResponses) {
                    setAnswers(testResponses);
                    const questions = testResponses
                        .map(
                            (answer, index) =>
                                testQuestions.find(
                                    (q) =>
                                        q.answer === index &&
                                        q.low <= answer &&
                                        q.high >= answer &&
                                        q.scale
                                ) || null
                        )
                        .filter((q) => q !== null);
                    setMatchedQuestions(questions);
                } else {
                    setMatchedQuestions([]);
                }
            } else {
                setMatchedQuestions([]);
            }
        } catch (error) {
            console.error('Error fetching answers:', error);
            setMatchedQuestions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnswers();
    }, [mode]);

    // Pagination Logic
    const indexOfLastQuestion = currentPage * itemsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
    const currentQuestions = matchedQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const totalPages = Math.ceil(matchedQuestions.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        window.scrollTo({ top: 440, behavior: 'smooth' });
    }, [currentPage]);

    // Determine if we are on the last page of non-lie questions
    const isLastNonLiePage = currentPage === totalPages;

    return (
        <section className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Analysis...</h1>
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : currentQuestions.length > 0 ? (
                <div className="space-y-4">
                    {currentQuestions
                        .filter((question) => !lies.includes(question.answer))
                        .map((question, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
                            >
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                    {question.question}
                                </h2>
                                <p className="text-gray-500">Scale: {question.scale}</p>
                                <p className="text-gray-700">{question.analysis}</p>
                                {/* For testing only */}
                                <br />
                                <p className="text-gray-500">
                                    Question: {question.answer} - For testing only
                                </p>
                            </div>
                        ))}

                    {/* Pagination Controls */}
                    {!isLastNonLiePage && (
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-logo-green text-gray-200 rounded"
                            >
                                Previous
                            </button>
                            <span className="text-gray-700">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-logo-green text-gray-200 rounded"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-gray-600">No matching questions found.</p>
            )}

            {/* For lie scale questions */}
            {isLastNonLiePage && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Lie Scale Questions
                    </h2>
                    {matchedQuestions
                        .filter((question) => lies.includes(question.answer))
                        .map((question, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
                            >
                                <p className="text-xl font-medium text-gray-900 mb-2">
                                    {question.question}
                                </p>
                            </div>
                        ))}
                </div>
            )}
        </section>
    );
};

export default Analysis;
