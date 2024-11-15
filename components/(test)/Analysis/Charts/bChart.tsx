// 'use client'
//
// import React, { useEffect, useState, useMemo, useCallback } from 'react'
// import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, Cell, Tooltip, TooltipProps } from 'recharts'
// import { ChartConfig, ChartContainer } from '@/components/ui/chart'
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
// import findPositionsForScale from '@/components/(test)/Analysis/Charts/positions'
// import { sumTestResponsesAtPositions } from '@/app/api/users'
// import rawCannedScaleStatements from '@/components/(test)/Analysis/Data/Constants/scaleCannedStatements'
//
// export interface Scale {
//     number: number;
//     name: string;
// }
//
// interface ScaleStatement {
//     name: string;
//     scale: string;
//     low: number;
//     high: number;
//     statement: string;
// }
//
// interface ChartDataItem {
//     scale: string;
//     score: number;
//     tooltipContent: string;
//     color: string;
//     statement: string;
// }
//
// interface BChartProps {
//     scales: Scale[] | { [key: string]: Scale };
// }
//
// const cannedScaleStatements: ScaleStatement[] = rawCannedScaleStatements as ScaleStatement[];
//
// const chartConfig: ChartConfig = {
//     score: {
//         label: 'Score',
//         color: 'hsl(var(--chart-2))',
//     },
// }
//
// const getColor = (score: number): string => {
//     if (score <= 10) return '#FF6B6B'
//     if (score <= 20) return '#F7F751'
//     return '#4CAF50'
// }
//
// export function BChart({ scales }: BChartProps) {
//     const [chartData, setChartData] = useState<ChartDataItem[]>([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState<string | null>(null)
//
//     const getStatement = useMemo(() => (scaleName: string, score: number): string => {
//         const scaleStatements = cannedScaleStatements.filter(scale => scale.name === scaleName);
//         if (scaleStatements.length === 0) return 'No statement available for this scale.';
//
//         const statement = scaleStatements.find(s => score > s.low && score <= s.high);
//         return statement ? statement.statement : 'No statement available for this score.';
//     }, [])
//
//     const CustomTooltip = useCallback(({ active, payload, label }: TooltipProps<number, string>) => {
//         if (active && payload && payload.length > 0) {
//             const firstPayload = payload[0];
//             if (firstPayload && firstPayload.payload) {
//                 const data = firstPayload.payload as ChartDataItem;
//                 return (
//                     <div className="rounded-lg bg-gray-500 p-2 shadow-md">
//                         <p>{label}</p>
//                         <p className="mt-2">{data.tooltipContent}</p>
//                         <p className="mt-1">Score: {data.score.toFixed(2)}</p>
//                     </div>
//                 );
//             }
//         }
//         return null;
//     }, [])
//
//     const fetchData = useCallback(async (scalesArray: Scale[]) => {
//         try {
//             const scoresPromises = scalesArray.map(async (scale) => {
//                 const positions = findPositionsForScale(scale.number)
//                 if (positions.length !== 2) {
//                     throw new Error(`Expected 2 positions for scale ${scale.name}, but got ${positions.length}`)
//                 }
//                 const [pos1, pos2] = positions
//                 return await sumTestResponsesAtPositions([pos1, pos2])
//             })
//
//             const scores = await Promise.all(scoresPromises)
//
//             return scalesArray.map((scale, index) => {
//                 const rawScore = scores[index]
//                 if (rawScore === undefined) {
//                     throw new Error(`No score found for scale ${scale.name}`)
//                 }
//                 const score = rawScore / 2
//                 const statement = getStatement(scale.name, score)
//                 return {
//                     scale: scale.name,
//                     score,
//                     tooltipContent: statement,
//                     color: getColor(score),
//                     statement
//                 }
//             })
//         } catch (err) {
//             console.error('Error fetching data:', err)
//             throw err
//         }
//     }, [getStatement])
//
//     useEffect(() => {
//         const loadData = async () => {
//             try {
//                 const scalesArray = Array.isArray(scales) ? scales : Object.values(scales);
//                 const data = await fetchData(scalesArray)
//                 setChartData(data)
//             } catch (err) {
//                 console.error('Error loading data:', err)
//                 setError(err instanceof Error ? err.message : 'Failed to load chart data')
//             } finally {
//                 setLoading(false)
//             }
//         }
//
//         loadData()
//     }, [scales, fetchData])
//
//     const memoizedChart = useMemo(() => (
//         <ChartContainer config={chartConfig}>
//             <BarChart
//                 data={chartData}
//                 margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
//             >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="scale" tickLine={false} tickMargin={10} axisLine={false} />
//                 <YAxis domain={[0, 30]} ticks={[0, 5, 10, 15, 20, 25, 30]} tickLine={true} axisLine={true} tickMargin={10} />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Bar dataKey="score" radius={4}>
//                     {chartData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                     <LabelList
//                         dataKey="score"
//                         position="top"
//                         offset={5}
//                         fill="#333"
//                         fontSize={12}
//                         formatter={(value: number) => value.toFixed(2)}
//                     />
//                 </Bar>
//             </BarChart>
//         </ChartContainer>
//     ), [chartData, CustomTooltip])
//
//     if (loading) return <div>Loading...</div>
//     if (error) return <div>Error: {error}</div>
//
//     return (
//         <div>
//             <Card className="bg-hrqColors-coolGray-600 border-hrqColors-sunsetOrange-300 rounded-2xl shadow-xl">
//                 <CardHeader>
//                     <CardTitle>Colorized Scale Scores</CardTitle>
//                 </CardHeader>
//                 <CardContent>{memoizedChart}</CardContent>
//                 <CardFooter className="text-dark flex-col items-start gap-2 text-sm">
//                     <div className="flex gap-2 font-medium leading-none">
//                         Color indicates score level
//                     </div>
//                     <div className="leading-none text-muted-foreground">
//                         Red: ≤&nbsp;10, Grey: 11-20, Green: &gt;&nbsp;20
//                     </div>
//                 </CardFooter>
//             </Card>
//             <div className="mt-8 space-y-4">
//                 {chartData.map((item, index) => (
//                     <Card key={index} className="bg-hrqColors-skyBlue-600 border-hrqColors-sunsetOrange-500 rounded-2xl shadow-xl">
//                         <CardHeader>
//                             <CardTitle className="text-hrqColors-skyBlue-900">{item.scale} Scale</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <p className="text-primary">{item.statement}</p>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     )
// }


'use client'

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, Cell, Tooltip, TooltipProps } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import findPositionsForScale from '@/components/(test)/Analysis/Charts/positions';
import { sumTestResponsesAtPositions } from '@/app/api/users';
import rawCannedScaleStatements from '@/components/(test)/Analysis/Data/Constants/scaleCannedStatements';

// Types and Interfaces
export interface Scale {
    number: number;
    name: string;
}

interface ScaleStatement {
    name: string;
    scale: string;
    low: number;
    high: number;
    statement: string;
}

interface ChartDataItem {
    scale: string;
    score: number;
    tooltipContent: string;
    color: string;
    statement: string;
}

interface BChartProps {
    scales: Scale[] | { [key: string]: Scale };
}

// Constants
const CHART_CONFIG: ChartConfig = { score: { label: 'Score', color: 'hsl(var(--chart-2))' } };
const BATCH_SIZE = 3;
const BATCH_DELAY = 2000;
const RETRY_DELAY = 1000;
const MAX_RETRIES = 3;
const SCORE_THRESHOLDS = {
    LOW: 10,
    MEDIUM: 20
} as const;
const COLORS = {
    LOW: '#FF6B6B',
    MEDIUM: '#F7F751',
    HIGH: '#4CAF50'
} as const;

// Cache Initialization
const positionsCache = new Map<number, [number, number]>();
const responseCache = new Map<string, number>();
const statementsLookup = new Map<string, ScaleStatement[]>();

// Initialize statements lookup
rawCannedScaleStatements.forEach((statement: ScaleStatement) => {
    if (!statementsLookup.has(statement.name)) {
        statementsLookup.set(statement.name, []);
    }
    statementsLookup.get(statement.name)!.push(statement);
});

// Utility functions
const getColor = (score: number): string => {
    if (score <= SCORE_THRESHOLDS.LOW) return COLORS.LOW;
    if (score <= SCORE_THRESHOLDS.MEDIUM) return COLORS.MEDIUM;
    return COLORS.HIGH;
};

const getStatement = (scaleName: string, score: number): string => {
    const statements = statementsLookup.get(scaleName);
    if (!statements) return 'No statement available for this score.';
    return statements.find(s => score > s.low && score <= s.high)?.statement ??
        'No statement available for this score.';
};

// Memoized Components
const CustomTooltip = React.memo<TooltipProps<number, string>>(({ active, payload, label }) => {
    if (!active || !payload?.length || !payload[0]?.payload) return null;

    return (
        <div className="rounded-lg bg-gray-500 p-2 shadow-md">
            <p>{label}</p>
            <p className="mt-2">{payload[0].payload.tooltipContent}</p>
            <p className="mt-1">Score: {payload[0].payload.score.toFixed(2)}</p>
        </div>
    );
});

CustomTooltip.displayName = 'CustomTooltip';

const ScaleCard = React.memo<{ item: ChartDataItem }>(({ item }) => (
    <Card className="bg-hrqColors-skyBlue-600 border-hrqColors-sunsetOrange-500 rounded-2xl shadow-xl">
        <CardHeader>
            <CardTitle className="text-hrqColors-skyBlue-900">{item.scale} Scale</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-primary">{item.statement}</p>
        </CardContent>
    </Card>
));

ScaleCard.displayName = 'ScaleCard';

// Main component
export function BChart({ scales }: BChartProps) {
    const [chartData, setChartData] = useState<ChartDataItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const scalesArray = useMemo(() =>
            Array.isArray(scales) ? scales : Object.values(scales),
        [scales]
    );

    const fetchWithRetry = useCallback(async (
        pair: [number, number],
        retries = MAX_RETRIES,
        signal?: AbortSignal
    ): Promise<number> => {
        try {
            return await sumTestResponsesAtPositions(pair);
        } catch (error) {
            if (signal?.aborted) throw new Error('Aborted');
            if (retries > 0) {
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                return fetchWithRetry(pair, retries - 1, signal);
            }
            throw error;
        }
    }, []);

    const processBatch = useCallback(async (
        batch: [number, number][],
        signal: AbortSignal
    ): Promise<void> => {
        const responses = await Promise.all(
            batch.map(pair => fetchWithRetry(pair, MAX_RETRIES, signal))
        );

        batch.forEach((pair, index) => {
            const response = responses[index];
            if (typeof response === 'number') {
                responseCache.set(`${pair[0]},${pair[1]}`, response);
            }
        });
    }, [fetchWithRetry]);

    const fetchData = useCallback(async (signal: AbortSignal): Promise<ChartDataItem[]> => {
        const positionsMap = new Map<number, [number, number]>();
        const positionPairsToFetch: Array<[number, number]> = [];

        // Prepare positions and identify missing data
        for (const scale of scalesArray) {
            if (!positionsCache.has(scale.number)) {
                const positions = findPositionsForScale(scale.number);
                if (positions.length !== 2) {
                    throw new Error(`Invalid positions for scale ${scale.name}`);
                }
                positionsCache.set(scale.number, [positions[0], positions[1]]);
            }
            const positions = positionsCache.get(scale.number)!;
            positionsMap.set(scale.number, positions);

            const pairKey = `${positions[0]},${positions[1]}`;
            if (!responseCache.has(pairKey)) {
                positionPairsToFetch.push(positions);
            }
        }

        // Fetch missing data in batches
        for (let i = 0; i < positionPairsToFetch.length; i += BATCH_SIZE) {
            if (signal.aborted) throw new Error('Aborted');

            const batch = positionPairsToFetch.slice(i, i + BATCH_SIZE);
            await processBatch(batch, signal);

            if (i + BATCH_SIZE < positionPairsToFetch.length) {
                await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
            }
        }

        // Process and return final data
        return scalesArray.map(scale => {
            const positions = positionsMap.get(scale.number)!;
            const response = responseCache.get(`${positions[0]},${positions[1]}`)!;
            const score = response / 2;
            return {
                scale: scale.name,
                score,
                tooltipContent: getStatement(scale.name, score),
                color: getColor(score),
                statement: getStatement(scale.name, score),
            };
        });
    }, [scalesArray, processBatch]);

    useEffect(() => {
        const controller = new AbortController();
        abortControllerRef.current = controller;

        setLoading(true);
        setError(null);

        fetchData(controller.signal)
            .then(setChartData)
            .catch(err => {
                if (!controller.signal.aborted) {
                    setError(err instanceof Error ? err.message : 'Failed to load chart data');
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            });

        return () => controller.abort();
    }, [fetchData]);

    if (loading) return <div>Loading...</div>;
    if (error) {
        return (
            <div className="text-center">
                <p className="text-red-500 mb-4">Error: {error}</p>
                <Button
                    onClick={() => {
                        setLoading(true);
                        setError(null);
                        const controller = new AbortController();
                        abortControllerRef.current = controller;

                        fetchData(controller.signal)
                            .then(setChartData)
                            .catch(err => {
                                if (!controller.signal.aborted) {
                                    setError(err instanceof Error ? err.message : 'Failed to load chart data');
                                }
                            })
                            .finally(() => {
                                if (!controller.signal.aborted) {
                                    setLoading(false);
                                }
                            });
                    }}
                >
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div>
            <Card className="bg-hrqColors-coolGray-600 border-hrqColors-sunsetOrange-300 rounded-2xl shadow-xl">
                <CardHeader>
                    <CardTitle>Colorized Scale Scores</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={CHART_CONFIG}>
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="scale"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <YAxis
                                domain={[0, 30]}
                                ticks={[0, 5, 10, 15, 20, 25, 30]}
                                tickLine
                                axisLine
                                tickMargin={10}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="score" radius={4}>
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                                <LabelList
                                    dataKey="score"
                                    position="top"
                                    offset={5}
                                    fill="#333"
                                    fontSize={12}
                                    formatter={(value: number) => value.toFixed(2)}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="text-dark flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                        Color indicates score level
                    </div>
                    <div className="leading-none text-muted-foreground">
                        Red: ≤&nbsp;10, Grey: 11-20, Green: &gt;&nbsp;20
                    </div>
                </CardFooter>
            </Card>
            <div className="mt-8 space-y-4">
                {chartData.map((item, index) => (
                    <ScaleCard key={`scale-${index}`} item={item} />
                ))}
            </div>
        </div>
    );
}