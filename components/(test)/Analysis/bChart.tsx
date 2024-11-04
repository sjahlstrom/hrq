'use client'

import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, Cell } from 'recharts'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import findPositionsForScale from '@/components/(test)/Analysis/Charts/positions'
import { sumTestResponsesAtPositions } from '@/app/api/users'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

const chartConfig: ChartConfig = {
    score: {
        label: 'Score',
        color: 'hsl(var(--chart-2))',
    },
}

interface Scale {
    number: number;
    name: string;
}

interface BChartProps {
    scales: Scale[];
}

interface ChartDataItem {
    scale: string;
    score: number;
    tooltipContent: string;
    color: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="rounded-lg bg-background p-2 shadow-md">
                <ChartTooltipContent payload={payload} label={label} />
                <p className="mt-2">{data.tooltipContent}</p>
                <p className="mt-1">Score: {data.score.toFixed(2)}</p>
            </div>
        );
    }
    return null;
};

const getColor = (score: number): string => {
    if (score <= 10) return '#FF6B6B'; // Light red
    if (score <= 20) return '#AAAAAA'; // Light grey
    return '#4CAF50'; // Light green
};

export function BChart({ scales }: BChartProps) {
    const [chartData, setChartData] = useState<ChartDataItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await Promise.all(
                    scales.map(async (scale) => {
                        const positions = findPositionsForScale(scale.number)
                        if (positions.length !== 2) {
                            throw new Error(
                                `Expected 2 positions for scale ${scale.name}, but got ${positions.length}`
                            )
                        }
                        const score = (await sumTestResponsesAtPositions(positions)) / 2
                        return {
                            scale: scale.name,
                            score,
                            tooltipContent: `${scale.name} Score`,
                            color: getColor(score)
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

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <Card className=" border-2 border-dark rounded-lg shadow-md overflow-hidden">
            <CardHeader>
                <CardTitle className="text-dark">Colorized Scale Scores</CardTitle>
                <CardDescription className="text-zinc-600">Bars are colored based on score: red (≤10), grey (11-20), green (&gt;20)</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} >
                    <BarChart
                        accessibilityLayer
                        data={chartData}

                        margin={{
                            top: 20,
                            right: 30,
                            left: 30,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid  strokeDasharray="3 3" />
                        <XAxis
                            dataKey="scale"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis
                            domain={[0, 30]}
                            ticks={[0, 5, 10, 15, 20, 25, 30]}
                            tickLine={false}
                            axisLine={true}
                            tickMargin={10}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<CustomTooltip />}
                        />
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
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="text-zinc-600 flex gap-2 font-medium leading-none">
                    Color indicates score level
                </div>
                <div className="text-sm leading-none text-zinc-600">
                    Red: ≤&nbsp;10, Grey: 11-20, Green: &gt;20
                </div>
            </CardFooter>
        </Card>
    )
}