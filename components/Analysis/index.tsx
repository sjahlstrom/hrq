'use client';

import React, { useEffect, useState } from 'react';
import sampleQuestions from '@/components/Analysis/Data/SampleAnalysis';
import { getSampleResponseAnswers } from '@/app/api/answers';

const Analysis = () => {
    const [answers, setAnswers] = useState<number[]>([]);
    const [matchedQuestions, setMatchedQuestions] = useState<{ question: string; analysis: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const fetchedAnswers = await getSampleResponseAnswers();
                setAnswers(fetchedAnswers);

                if (fetchedAnswers.length > 0) {
                    const questions = fetchedAnswers.map((answer, x) => {
                        const indexOfAnswer = fetchedAnswers.indexOf(answer);

                        // Find the element in sampleQuestions where the conditions match
                        return sampleQuestions.find(q =>
                            q.answer === indexOfAnswer && // Matches the answer element with indexOf(answers[x])
                            q.low <= answer && // Low is less than or equal to answers[x]
                            q.high >= answer // High is greater than or equal to answers[x]
                        ) || null;
                    }).filter(question => question !== null); // Remove any null results

                    setMatchedQuestions(questions);
                } else {
                    setMatchedQuestions([]);
                }
            } catch (error) {
                console.error('Error fetching answers:', error);
                setMatchedQuestions([]);
            } finally {
                setLoading(false); // Set loading to false once the data is fetched
            }
        };

        fetchAnswers();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Analysis...</h1>
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : matchedQuestions.length > 0 ? (
                <div className="space-y-4">
                    {matchedQuestions.map((question, index) => (
                        <div key={index} className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{question.question}</h2>
                            <p className="text-gray-700">{question.analysis}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No matching questions found.</p>
            )}
        </div>
    );
};

export default Analysis;
