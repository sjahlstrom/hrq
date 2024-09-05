import React, { useEffect, useState, useCallback } from 'react';
import sampleAnalysisData from '@/components/Analysis/Data/SampleAnalysisData';
import { useSearchParams } from 'next/navigation';
import sampleQuestions from '@/components/(menu)/Test/Data/sampleQuestions';

const SampleAnalysis = () => {
    const [answers, setAnswers] = useState<number[]>([]);
    const [matchedQuestions, setMatchedQuestions] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

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
        if (q.scale !== 64 && !foundScales.has(q.scale)) {
            const matches = sampleQuestions.filter((item, index) => item.scale === q.scale && index !== i);

            if (matches.length > 0) {
                foundScales.add(q.scale);
                matchingQuestions.push(...[q.position, ...matches.map(m => m.position)]);
            }
        }
    });

    console.log(matchingQuestions);

    return (
        <section className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Analysis...</h1>
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : matchedQuestions.length > 0 ? (
                <div className="space-y-4">
                    {matchedQuestions.map((question, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
                        >
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                {question.question}
                            </h2>
                            {/*<p className="text-gray-500">Scale: {question.scale}</p>*/}
                            <p className="text-gray-700">{question.analysis}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No matching questions found.</p>
            )}
        </section>
    );
};

export default SampleAnalysis;
