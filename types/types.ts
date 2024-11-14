export interface TestQuestion {
    question: string;
    scale: number;
    position: number;
    reverse: boolean;
    options: {
        left: string;
        middle: string;
        right: string;
    };
}