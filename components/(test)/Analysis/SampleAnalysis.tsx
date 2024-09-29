'use client'

import React, { useEffect, useState, useCallback } from 'react';
import sampleAnalysisData from '@/components/(test)/Analysis/Data/SampleAnalysisData';
import { useSearchParams } from 'next/navigation';
import sampleQuestions from '@/components/(test)/Test/Data/sampleQuestions';

const SampleAnalysis = () => {
    const [answers, setAnswers] = useState<number[]>([]);
    const [matchedQuestions, setMatchedQuestions] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fadeIn, setFadeIn] = useState(false); // State to trigger fade-in effect

    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');

    const fetchAnswers = useCallback(async () => {
        setLoading(true);
        try {
            let fetchedAnswers = [];
            let questions = [];

            if (mode === 'sample') {
                const storedAnswers = localStorage.getItem('array');
                if (storedAnswers) {
                    fetchedAnswers = JSON.parse(storedAnswers);
                }
            }
            console.log(fetchedAnswers);

            if (fetchedAnswers.length > 0) {
                questions = fetchedAnswers.map((answer, index) => {
                    return (
                        sampleAnalysisData.find(
                            (q) => q.answer === index && q.low <= answer && q.high >= answer && q.scale
                        ) || null
                    );
                }).filter(Boolean);
            }

            setAnswers(fetchedAnswers);
            setMatchedQuestions(questions);
        } catch (error) {
            console.error('Error fetching answers:', error);
            setMatchedQuestions([]);
        } finally {
            setLoading(false);
        }
    }, [mode]);

    useEffect(() => {
        fetchAnswers();
    }, [fetchAnswers]);

    const foundScales = new Set();
    const matchingQuestions = [];

    sampleQuestions.forEach((q, i) => {
        if (!foundScales.has(q.scale)) {
            const matches = sampleQuestions.filter((item, index) => item.scale === q.scale && index !== i);

            if (matches.length > 0) {
                foundScales.add(q.scale);
                matchingQuestions.push(...[q.position, ...matches.map(m => m.position)]);
            }
        }
    });
    useEffect(() => {
        // Trigger the fade-in after component mounts or data is loaded
        const timer = setTimeout(() => {
            setFadeIn(true);
        }, 100); // Delay before starting the fade-in
        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, []);

    return (
        <section className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Analysis...</h1>
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : matchedQuestions.length > 0 ? (
                <div className="space-y-4">
                    {/*{matchedQuestions.map((question, index) => (*/}
                    {/*    <div*/}
                    {/*        key={index}*/}
                    {/*        className={`p-4 shadow-md rounded-lg border border-gray-200 ${index % 2 === 0 ? 'bg-pantone621' : 'bg-pantone622'}`}*/}
                    {/*    >*/}
                    {/*        <h2 className="text-2xl font-semibold text-gray-900 mb-2">*/}
                    {/*            {question.question}*/}
                    {/*        </h2>*/}
                    {/*        /!*<p className="text-gray-500">Scale: {question.scale}</p>*!/*/}
                    {/*        <p className="text-gray-700">{question.analysis}</p>*/}
                    {/*    </div>*/}
                    {/*))}*/}

                    {matchedQuestions.map((question, index) => (
                        <div
                            key={index}
                            className={`p-4 shadow-md rounded-lg border border-gray-200 ${index % 2 === 0 ? 'bg-pantone621' : 'bg-pantone622'} 
                        ${fadeIn ? 'opacity-100' : 'opacity-0'} 
                        transition-opacity duration-700 ease-in-out delay-${index * 400}ms`}
                        >
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                {question.question}
                            </h2>
                            <p className="text-gray-700">{question.analysis}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No matching questions found.</p>
            )}

            <div className="mt-8 bg-pantone624 shadow-md rounded-lg border border-gray-200 p-6">
                <p className="text-gray-700">
                    Mini-report, based on whether you score high, medium or low, on the questions. The above questions represent only one question for each trait or quality. The actual test has more than one question for each and measures other characters than the ones here. This is a sample report, only one page of probably ten or fifteen for the actual test report. It is offered to give you a feel for what will follow, should you take the HighRQ test, which is much more comprehensive. According to your scores, based upon a comparison to norms, the following is likely true.
                </p>
            </div>
        </section>
    );
};

export default SampleAnalysis;
