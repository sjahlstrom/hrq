export type Scale = {
    number: number;
    name: string;
};

export type ScaleStatement = {
    name: string;
    scale: string;
    low: number;
    high: number;
    statement: string;
};

export type ChartDataItem = {
    scale: string;
    score: number;
    tooltipContent: string;
    color: string;
    statement: string;
};

export interface ScalePosition {
    scaleNumber: number;
    positions: [number, number];
}
