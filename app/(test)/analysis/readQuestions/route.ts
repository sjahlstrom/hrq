// app/analysis/readQuestions/route.ts

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        // Logging to confirm file path
        const filePath = path.join(process.cwd(), 'components', '(test)', 'Test/Data/testQuestions.json');
        console.log('Attempting to read file from:', filePath);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error('File does not exist at:', filePath);
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        // Log data to confirm structure
        // console.log('Data successfully read from file:', data);

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return NextResponse.json({ error: 'Error reading file' }, { status: 500 });
    }
}


const testQuestions = [
    {
        question: "If a clerk gave me too much change back, I wouldn't tell",
        scale: 13,
        position: 0,
        reverse: true,
        options: { left: 'Incorrect', middle: 'Depends', right: 'Correct' },
    },
    // ... (rest of the questions array)
];

// Convert the array to a JSON string with proper formatting
const jsonString = JSON.stringify(testQuestions, null, 2);

// Output the JSON string
console.log(jsonString);

// In a real scenario, you would typically write this to a file
// For example:
// const fs = require('fs');
// fs.writeFileSync('testQuestions.json', jsonString);