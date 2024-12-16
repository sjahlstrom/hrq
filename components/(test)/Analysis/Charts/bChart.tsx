'use client'

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    YAxis,
    Cell,
} from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import findPositionsForScale from '@/components/(test)/Analysis/Charts/positions'
import { sumTestResponsesAtPositions } from '@/app/api/users'
import rawCannedScaleStatements from '@/components/(test)/Analysis/Data/Constants/scaleCannedStatements'

// Types
type Scale = {
    number: number
    name: string
}

type ScaleStatement = {
    name: string
    scale: string
    low: number
    high: number
    statement: string
}

type ChartDataItem = {
    scale: string
    score: number
    tooltipContent: string
    color: string
    statement: string
}

type BChartProps = {
    scales: Scale[] | { [key: string]: Scale }
}

// Constants
const CONSTANTS = {
    CHART_CONFIG: {
        score: { label: 'Score', color: 'hsl(var(--chart-2))' },
    } as const,
    THRESHOLDS: {
        LOW: 10,
        MEDIUM: 20,
    } as const,
    COLORS: {
        LOW: '#FF6B6B',
        MEDIUM: '#F7F751',
        HIGH: '#4CAF50',
    } as const,
    FETCH: {
        RETRY_DELAY: 1000,
        MAX_RETRIES: 3,
    },
} as const

// Create statements Map during module initialization
const STATEMENTS_MAP = rawCannedScaleStatements.reduce((acc, statement) => {
    const statements = acc.get(statement.name) || []
    acc.set(statement.name, [...statements, statement])
    return acc
}, new Map<string, ScaleStatement[]>())

// Utility functions
const getColor = (score: number): string => {
    const { THRESHOLDS, COLORS } = CONSTANTS
    if (score <= THRESHOLDS.LOW) return COLORS.LOW
    if (score <= THRESHOLDS.MEDIUM) return COLORS.MEDIUM
    return COLORS.HIGH
}

const getStatement = (scaleName: string, score: number): string => {
    const statements = STATEMENTS_MAP.get(scaleName)
    if (!statements?.length) return 'No statement available for this score.'

    const matchingStatement = statements.find(
        (s) => score > s.low && score <= s.high
    )
    return (
        matchingStatement?.statement ?? 'No statement available for this score.'
    )
}

// Request queue for deduplication
const requestQueue = new Map<string, Promise<number>>()

// Custom hook for data fetching
const useScaleData = (scalesArray: Scale[]) => {
    const [state, setState] = useState<{
        chartData: ChartDataItem[]
        loading: boolean
        error: string | null
    }>({
        chartData: [],
        loading: true,
        error: null,
    })

    const abortControllerRef = useRef<AbortController | null>(null)

    // Helper function to fetch or get queued result
    const fetchOrQueueRequest = async (
        positions: [number, number],
        signal: AbortSignal
    ): Promise<number> => {
        const key = `${positions[0]},${positions[1]}`

        if (requestQueue.has(key)) {
            return await requestQueue.get(key)!
        }

        const promise = (async () => {
            try {
                return await sumTestResponsesAtPositions(positions)
            } finally {
                requestQueue.delete(key)
            }
        })()

        requestQueue.set(key, promise)
        return await promise
    }

    const fetchData = useCallback(
        async (signal: AbortSignal): Promise<ChartDataItem[]> => {
            const results = new Map<
                number,
                { positions: [number, number]; response: number }
            >()

            // Create fetch promises for all scales
            const fetchPromises = scalesArray.map(async (scale) => {
                const positions = findPositionsForScale(scale.number)
                if (positions.length !== 2) {
                    throw new Error(`Invalid positions for scale ${scale.name}`)
                }

                try {
                    const response = await fetchOrQueueRequest(
                        [positions[0], positions[1]],
                        signal
                    )
                    results.set(scale.number, {
                        positions: [positions[0], positions[1]],
                        response,
                    })
                } catch (error) {
                    if (signal.aborted) throw new Error('Aborted')
                    throw error
                }
            })

            // Wait for all requests to complete
            await Promise.all(fetchPromises)

            // Transform results into chart data
            return scalesArray.map((scale) => {
                const result = results.get(scale.number)
                if (!result) {
                    throw new Error(`No response found for scale ${scale.name}`)
                }

                const score = result.response / 2

                return {
                    scale: scale.name,
                    score,
                    tooltipContent: getStatement(scale.name, score),
                    color: getColor(score),
                    statement: getStatement(scale.name, score),
                }
            })
        },
        [scalesArray]
    )

    useEffect(() => {
        const controller = new AbortController()
        abortControllerRef.current = controller

        fetchData(controller.signal)
            .then((data) =>
                setState({ chartData: data, loading: false, error: null })
            )
            .catch((err) => {
                if (!controller.signal.aborted) {
                    setState((prev) => ({
                        ...prev,
                        loading: false,
                        error:
                            err instanceof Error
                                ? err.message
                                : 'Failed to load chart data',
                    }))
                }
            })

        return () => {
            controller.abort()
            requestQueue.clear()
        }
    }, [fetchData])

    return state
}

const ScaleCard = React.memo<{ item: ChartDataItem }>(({ item }) => (
    <Card className="bg-hrqColors-skyBlue-700 border-hrqColors-sunsetOrange-500 rounded-2xl shadow-xl">

        <CardContent>
            <p className="text-primary mt-4">{item.statement}</p>
        </CardContent>
    </Card>
))

ScaleCard.displayName = 'ScaleCard'

// Main component
export function BChart({ scales }: BChartProps) {
    const scalesArray = useMemo(
        () => (Array.isArray(scales) ? scales : Object.values(scales)),
        [scales]
    )

    const { chartData, loading, error } = useScaleData(scalesArray)

    if (loading) return <div>Loading...</div>

    if (error) {
        return (
            <div className="text-center">
                <p className="text-red-500 mb-4">Error: {error}</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
        )
    }

    return (
        <div>
            <Card className="bg-hrqColors-coolGray-600 border-hrqColors-sunsetOrange-300 rounded-2xl shadow-xl">
                <CardHeader>
                    <CardTitle>Scale Scores</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={CONSTANTS.CHART_CONFIG}>
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
                            {/*<Tooltip content={<CustomTooltip />} />*/}
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
                                    formatter={(value: number) =>
                                        value.toFixed(2)
                                    }
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>

                <CardFooter className="text-dark flex-col items-start gap-2 text-sm">
                    <div className="text-hrqColors-coolGray-100 flex gap-2 font-medium leading-none">
                        Color indicates score level
                    </div>
                    <div className="leading-none text-muted-foreground">
                        <div className="leading-none text-muted-foreground">
                            <span style={{ color: '#ff6b6b' }}>Red</span>{' '}
                            <span style={{ color: '#ff6b6b' }}> = Low,</span>{' '}
                            <span style={{ color: '#FFD700' }}>Yellow</span>
                            <span style={{ color: '#FFD700' }}>
                                {' '}
                                = Medium,
                            </span>{' '}
                            <span style={{ color: '#00A000' }}>Green</span>
                            <span style={{ color: '#00A000' }}>
                                {' '}
                                = High
                            </span>{' '}
                        </div>
                    </div>
                </CardFooter>
            </Card>
            <div className="mt-8 space-y-4">
                {chartData.map((item, index) => (
                    <ScaleCard key={`scale-${index}`} item={item} />
                ))}
            </div>
        </div>
    )
}
