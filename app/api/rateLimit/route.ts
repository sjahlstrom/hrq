import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Time window in seconds (10 minutes = 600 seconds)
const WINDOW_TIME = 6000
// Maximum number of requests per window
const MAX_REQUESTS = 5

export const runtime = "edge"

export async function GET(request: NextRequest) {
    try {
        const ip = request.ip ?? '127.0.0.1'
        const key = `ratelimit:${ip}`

        // Get current count and timestamp
        const [count, timestamp] = await redis.mget(key, `${key}:timestamp`) as [number | null, string | null]
        const currentTime = Math.floor(Date.now() / 1000)

        // If this is a new IP or the window has expired
        if (!count || !timestamp || (currentTime - parseInt(timestamp)) >= WINDOW_TIME) {
            // Set new values
            await redis.mset({
                [key]: 1,
                [`${key}:timestamp`]: currentTime.toString()
            })

            // Set expiry for both keys
            await redis.expire(key, WINDOW_TIME)
            await redis.expire(`${key}:timestamp`, WINDOW_TIME)

            return NextResponse.json({
                message: 'Action performed successfully',
                remaining: MAX_REQUESTS - 1
            })
        }

        // If within window and under limit
        if (count < MAX_REQUESTS) {
            await redis.incr(key)

            return NextResponse.json({
                message: 'Action performed successfully',
                remaining: MAX_REQUESTS - (count + 1)
            })
        }

        // Rate limit exceeded
        return NextResponse.json(
            {
                error: "Rate limit exceeded",
                resetIn: WINDOW_TIME - (currentTime - parseInt(timestamp))
            },
            {
                status: 429,
                headers: {
                    'X-RateLimit-Limit': MAX_REQUESTS.toString(),
                    'X-RateLimit-Remaining': '0',
                    'X-RateLimit-Reset': (parseInt(timestamp) + WINDOW_TIME).toString(),
                },
            }
        )
    } catch (error) {
        console.error('Rate limiting error:', error)
        // Fail open - allow the request in case of errors
        return NextResponse.json({
            message: 'Action performed successfully',
            warning: 'Rate limiting temporarily disabled'
        })
    }
}