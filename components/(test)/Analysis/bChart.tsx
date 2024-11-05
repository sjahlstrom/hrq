// // // 'use client'
// // //
// // // import React, { useEffect, useState } from 'react'
// // // import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
// // // import {
// // //     ChartConfig,
// // //     ChartContainer,
// // //     ChartTooltip,
// // //     ChartTooltipContent,
// // // } from '@/components/ui/chart'
// // // import findPositionsForScale from '@/components/(test)/Analysis/Charts/positions'
// // // import { sumTestResponsesAtPositions } from '@/app/api/users'
// // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// // // import { TrendingUp } from 'lucide-react'
// // //
// // // const chartConfig: ChartConfig = {
// // //     score: {
// // //         label: 'Score',
// // //         color: 'hsl(var(--chart-2))',
// // //     },
// // // }
// // //
// // // interface Scale {
// // //     number: number;
// // //     name: string;
// // // }
// // //
// // // interface BChartProps {
// // //     scales: Scale[];
// // // }
// // //
// // // interface ChartDataItem {
// // //     scale: string;
// // //     score: number | null;
// // // }
// // //
// // // export function BChart({ scales }: BChartProps) {
// // //     const [chartData, setChartData] = useState<ChartDataItem[]>([])
// // //     const [loading, setLoading] = useState(true)
// // //     const [error, setError] = useState<string | null>(null)
// // //
// // //     useEffect(() => {
// // //         async function fetchData() {
// // //             try {
// // //                 const data = await Promise.all(
// // //                     scales.map(async (scale) => {
// // //                         const positions = findPositionsForScale(scale.number)
// // //                         if (positions.length !== 2) {
// // //                             throw new Error(
// // //                                 `Expected 2 positions for scale ${scale.name}, but got ${positions.length}`
// // //                             )
// // //                         }
// // //                         const score = (await sumTestResponsesAtPositions(positions)) / 2
// // //                         return { scale: scale.name, score }
// // //                     })
// // //                 )
// // //                 setChartData(data)
// // //             } catch (err) {
// // //                 console.error('Error fetching data:', err)
// // //                 setError('Failed to load chart data')
// // //             } finally {
// // //                 setLoading(false)
// // //             }
// // //         }
// // //
// // //         fetchData()
// // //     }, [scales])
// // //
// // //     if (loading) return <div>Loading...</div>
// // //     if (error) return <div>Error: {error}</div>
// // //
// // //     return (
// // //         <Card>
// // //             <CardHeader>
// // //                 <CardTitle>Steve - I need some text here, like, what is this?</CardTitle>
// // //                 <CardDescription>Some descriptive text here</CardDescription>
// // //             </CardHeader>
// // //             <CardContent>
// // //                 <ChartContainer config={chartConfig}>
// // //                     <BarChart
// // //                         accessibilityLayer
// // //                         data={chartData}
// // //                         margin={{
// // //                             top: 20,
// // //                             right: 30,
// // //                             left: 30,
// // //                             bottom: 5,
// // //                         }}
// // //                     >
// // //                         <CartesianGrid stroke="#f88" strokeDasharray="9 9"/>
// // //                         <XAxis
// // //                             dataKey="scale"
// // //                             tickLine={false}
// // //                             tickMargin={10}
// // //                             axisLine={false}
// // //                             tickFormatter={(value) => value.slice(0, 3)}
// // //                         />
// // //                         <YAxis
// // //                             domain={[0, 30]}
// // //                             ticks={[0, 5, 10, 15, 20, 25, 30]}
// // //                             tickLine={false}
// // //                             axisLine={false}
// // //                             tickMargin={10}
// // //                         />
// // //                         <ChartTooltip
// // //                             cursor={false}
// // //                             content={<ChartTooltipContent hideLabel />}
// // //                         />
// // //                         <Bar dataKey="score" fill="var(--color-score)" radius={8} >
// // //                             <LabelList
// // //                                 position="top"
// // //                                 offset={12}
// // //                                 className="fill-foreground"
// // //                                 fontSize={12}
// // //                             />
// // //                         </Bar>
// // //                     </BarChart>
// // //                 </ChartContainer>
// // //             </CardContent>
// // //             <CardFooter className="flex-col items-start gap-2 text-sm">
// // //                 <div className="flex gap-2 font-medium leading-none">
// // //                     More descriptive text here<TrendingUp className="h-4 w-4" />
// // //                 </div>
// // //                 <div className="leading-none text-muted-foreground">
// // //                     And here too
// // //                 </div>
// // //             </CardFooter>
// // //         </Card>
// // //     )
// // // }
// //
// // 'use client'
// //
// // import React, { useEffect, useState } from 'react'
// // import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
// // import {
// //     ChartConfig,
// //     ChartContainer,
// //     ChartTooltip,
// //     ChartTooltipContent,
// // } from '@/components/ui/chart'
// // import findPositionsForScale from '@/components/(test)/Analysis/Charts/positions'
// // import { sumTestResponsesAtPositions } from '@/app/api/users'
// // import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
// // import { TrendingUp } from 'lucide-react'
// //
// // const chartConfig: ChartConfig = {
// //     score: {
// //         label: 'Score',
// //         color: 'hsl(var(--chart-2))',
// //     },
// // }
// //
// // interface Scale {
// //     number: number;
// //     name: string;
// // }
// //
// // interface BChartProps {
// //     scales: Scale[];
// // }
// //
// // interface ChartDataItem {
// //     scale: string;
// //     score: number | null;
// //     tooltipContent: string;
// // }
// //
// // const CustomTooltip = ({ active, payload, label }: any) => {
// //     if (active && payload && payload.length) {
// //         const data = payload[0].payload;
// //         return (
// //             <div className="rounded-lg bg-background p-2 shadow-md">
// //                 <ChartTooltipContent payload={payload} label={label} />
// //                 <p className="mt-2">{data.tooltipContent}</p>
// //             </div>
// //         );
// //     }
// //     return null;
// // };
// //
// // export function BChart({ scales }: BChartProps) {
// //     const [chartData, setChartData] = useState<ChartDataItem[]>([])
// //     const [loading, setLoading] = useState(true)
// //     const [error, setError] = useState<string | null>(null)
// //
// //     useEffect(() => {
// //         async function fetchData() {
// //             try {
// //                 const data = await Promise.all(
// //                     scales.map(async (scale) => {
// //                         const positions = findPositionsForScale(scale.number)
// //                         if (positions.length !== 2) {
// //                             throw new Error(
// //                                 `Expected 2 positions for scale ${scale.name}, but got ${positions.length}`
// //                             )
// //                         }
// //                         const score = (await sumTestResponsesAtPositions(positions)) / 2
// //                         return {
// //                             scale: scale.name,
// //                             score,
// //                             tooltipContent: `Custom tooltip for ${scale.name}`
// //                         }
// //                     })
// //                 )
// //                 setChartData(data)
// //             } catch (err) {
// //                 console.error('Error fetching data:', err)
// //                 setError('Failed to load chart data')
// //             } finally {
// //                 setLoading(false)
// //             }
// //         }
// //
// //         fetchData()
// //     }, [scales])
// //
// //     if (loading) return <div>Loading...</div>
// //     if (error) return <div>Error: {error}</div>
// //
// //     return (
// //         <Card>
// //             <CardHeader>
// //                 <CardTitle>Chart with Custom Tooltips</CardTitle>
// //                 <CardDescription>Each bar has its own unique tooltip content</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //                 <ChartContainer config={chartConfig}>
// //                     <BarChart
// //                         accessibilityLayer
// //                         data={chartData}
// //                         margin={{
// //                             top: 20,
// //                             right: 30,
// //                             left: 30,
// //                             bottom: 5,
// //                         }}
// //                     >
// //                         <CartesianGrid stroke="#f88" strokeDasharray="9 9"/>
// //                         <XAxis
// //                             dataKey="scale"
// //                             tickLine={false}
// //                             tickMargin={10}
// //                             axisLine={false}
// //                             tickFormatter={(value) => value.slice(0, 3)}
// //                         />
// //                         <YAxis
// //                             domain={[0, 30]}
// //                             ticks={[0, 5, 10, 15, 20, 25, 30]}
// //                             tickLine={false}
// //                             axisLine={false}
// //                             tickMargin={10}
// //                         />
// //                         <ChartTooltip
// //                             cursor={false}
// //                             content={<CustomTooltip />}
// //                         />
// //                         <Bar dataKey="score" fill="var(--color-score)" radius={8} >
// //                             <LabelList
// //                                 position="top"
// //                                 offset={12}
// //                                 className="fill-foreground"
// //                                 fontSize={12}
// //                             />
// //                         </Bar>
// //                     </BarChart>
// //                 </ChartContainer>
// //             </CardContent>
// //             <CardFooter className="flex-col items-start gap-2 text-sm">
// //                 <div className="flex gap-2 font-medium leading-none">
// //                     Hover over each bar to see its unique tooltip<TrendingUp className="h-4 w-4" />
// //                 </div>
// //                 <div className="leading-none text-muted-foreground">
// //                     Each tooltip contains custom content for that specific bar
// //                 </div>
// //             </CardFooter>
// //         </Card>
// //     )
// // }
//
// 'use client'
//
// import React, { useEffect, useState } from 'react'
// import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, Cell } from 'recharts'
// import {
//     ChartConfig,
//     ChartContainer,
//     ChartTooltip,
//     ChartTooltipContent,
// } from '@/components/ui/chart'
// import findPositionsForScale from '@/components/(test)/Analysis/Charts/positions'
// import { sumTestResponsesAtPositions } from '@/app/api/users'
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
// import { TrendingUp } from 'lucide-react'
//
// const chartConfig: ChartConfig = {
//     score: {
//         label: 'Score',
//         color: 'hsl(var(--chart-2))',
//     },
// }
//
// interface Scale {
//     number: number;
//     name: string;
// }
//
// interface BChartProps {
//     scales: Scale[];
// }
//
// interface ChartDataItem {
//     scale: string;
//     score: number | null;
//     tooltipContent: string;
//     color: string;
// }
//
// const CustomTooltip = ({ active, payload, label }: any) => {
//     if (active && payload && payload.length) {
//         const data = payload[0].payload;
//         return (
//             <div className="rounded-lg bg-background p-2 shadow-md">
//                 <ChartTooltipContent payload={payload} label={label} />
//                 <p className="mt-2">{data.tooltipContent}</p>
//             </div>
//         );
//     }
//     return null;
// };
//
// const getColor = (score: number): string => {
//     if (score >= 20) return 'var(--color-high)';
//     if (score >= 10) return 'var(--color-medium)';
//     return 'var(--color-low)';
// };
//
// export function BChart({ scales }: BChartProps) {
//     const [chartData, setChartData] = useState<ChartDataItem[]>([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState<string | null>(null)
//
//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const data = await Promise.all(
//                     scales.map(async (scale) => {
//                         const positions = findPositionsForScale(scale.number)
//                         if (positions.length !== 2) {
//                             throw new Error(
//                                 `Expected 2 positions for scale ${scale.name}, but got ${positions.length}`
//                             )
//                         }
//                         const score = (await sumTestResponsesAtPositions(positions)) / 2
//                         return {
//                             scale: scale.name,
//                             score,
//                             tooltipContent: `Custom tooltip for ${scale.name}`,
//                             color: getColor(score)
//                         }
//                     })
//                 )
//                 setChartData(data)
//             } catch (err) {
//                 console.error('Error fetching data:', err)
//                 setError('Failed to load chart data')
//             } finally {
//                 setLoading(false)
//             }
//         }
//
//         fetchData()
//     }, [scales])
//
//     if (loading) return <div>Loading...</div>
//     if (error) return <div>Error: {error}</div>
//
//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Color-coded Chart</CardTitle>
//                 <CardDescription>Bars are colored based on score: green (high), grey (medium), red (low)</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <ChartContainer config={chartConfig}>
//                     <BarChart
//                         accessibilityLayer
//                         data={chartData}
//                         margin={{
//                             top: 20,
//                             right: 30,
//                             left: 30,
//                             bottom: 5,
//                         }}
//                     >
//                         <CartesianGrid stroke="#f88" strokeDasharray="9 9"/>
//                         <XAxis
//                             dataKey="scale"
//                             tickLine={false}
//                             tickMargin={10}
//                             axisLine={false}
//                             tickFormatter={(value) => value.slice(0, 3)}
//                         />
//                         <YAxis
//                             domain={[0, 30]}
//                             ticks={[0, 5, 10, 15, 20, 25, 30]}
//                             tickLine={false}
//                             axisLine={false}
//                             tickMargin={10}
//                         />
//                         <ChartTooltip
//                             cursor={false}
//                             content={<CustomTooltip />}
//                         />
//                         <Bar dataKey="score" radius={8}>
//                             {chartData.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={entry.color} />
//                             ))}
//                             <LabelList
//                                 position="top"
//                                 offset={12}
//                                 className="fill-foreground"
//                                 fontSize={12}
//                             />
//                         </Bar>
//                     </BarChart>
//                 </ChartContainer>
//             </CardContent>
//             <CardFooter className="flex-col items-start gap-2 text-sm">
//                 <div className="flex gap-2 font-medium leading-none">
//                     Color indicates score level<TrendingUp className="h-4 w-4" />
//                 </div>
//                 <div className="leading-none text-muted-foreground">
//                     Green: High, Grey: Medium, Red: Low
//                 </div>
//             </CardFooter>
//         </Card>
//     )
// }

'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, Cell, Tooltip, TooltipProps } from 'recharts'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import findPositionsForScale from '@/components/(test)/Analysis/Charts/positions'
import { sumTestResponsesAtPositions } from '@/app/api/users'
import rawCannedScaleStatements from '@/components/(test)/Analysis/Data/Constants/scaleCannedStatements'

interface Scale {
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
    scales: Scale[];
}

const cannedScaleStatements: ScaleStatement[] = rawCannedScaleStatements as ScaleStatement[];

const chartConfig: ChartConfig = {
    score: {
        label: 'Score',
        color: 'hsl(var(--chart-2))',
    },
}

const getColor = (score: number): string => {
    if (score <= 10) return '#FF6B6B'
    if (score <= 20) return '#F7F751'
    return '#4CAF50'
}

const getStatement = (scaleName: string, score: number): string => {
    const scaleStatements = cannedScaleStatements.filter(scale => scale.name === scaleName);
    if (scaleStatements.length === 0) return 'No statement available for this scale.';

    const statement = scaleStatements.find(s => score > s.low && score <= s.high);
    return statement ? statement.statement : 'No statement available for this score.';
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
        const firstPayload = payload[0];
        if (firstPayload && firstPayload.payload) {
            const data = firstPayload.payload as ChartDataItem;
            return (
                <div className="rounded-lg bg-background p-2 shadow-md">
                    <p>{label}</p>
                    <p className="mt-2">{data.tooltipContent}</p>
                    <p className="mt-1">Score: {data.score.toFixed(2)}</p>
                </div>
            );
        }
    }
    return null;
}

export function BChart({ scales }: BChartProps) {
    const [chartData, setChartData] = useState<ChartDataItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Promise.all(
                    scales.map(async (scale) => {
                        const positions = findPositionsForScale(scale.number)
                        if (positions.length !== 2) {
                            throw new Error(`Expected 2 positions for scale ${scale.name}, but got ${positions.length}`)
                        }
                        const score = (await sumTestResponsesAtPositions(positions)) / 2
                        const statement = getStatement(scale.name, score)
                        return {
                            scale: scale.name,
                            score,
                            tooltipContent: statement,
                            color: getColor(score),
                            statement
                        }
                    })
                )
                setChartData(data)
            } catch (err) {
                console.error('Error fetching data:', err)
                setError('Failed to load chart data')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [scales])

    const memoizedChart = useMemo(() => (
        <ChartContainer config={chartConfig}>
            <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="scale" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis domain={[0, 30]} ticks={[0, 5, 10, 15, 20, 25, 30]} tickLine={true} axisLine={true} tickMargin={10} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" radius={4}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
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
    ), [chartData])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <Card className="bg-hrqColors-coolGray-600 border-hrqColors-sunsetOrange-300 rounded-2xl shadow-xl">
                <CardHeader>
                    <CardTitle >Colorized Scale Scores</CardTitle>
                </CardHeader>
                <CardContent>{memoizedChart}</CardContent>
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
                    <Card key={index} className="bg-hrqColors-skyBlue-600 border-hrqColors-sunsetOrange-500 rounded-2xl shadow-xl">
                        <CardHeader>
                            <CardTitle className=" text-hrqColors-skyBlue-900">{item.scale} Scale</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-primary">{item.statement}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}