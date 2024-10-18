// import { NextRequest, NextResponse } from 'next/server'
// import { Ratelimit } from '@upstash/ratelimit'
// import { kv } from '@vercel/kv'
//
// const ratelimit = new Ratelimit({
//     redis: kv,
//     limiter: Ratelimit.slidingWindow(5, '10m')
// })
//
// export const runtime = "edge"
//
// export async function GET(request: NextRequest) {
//     const ip = request.ip ?? '127.0.0.1'
//     const { success, limit, reset, remaining } = await ratelimit.limit(ip)
//
//     if (!success) {
//         return NextResponse.json(
//             { error: "Rate limit exceeded" },
//             {
//                 status: 429,
//                 headers: {
//                     'X-RateLimit-Limit': limit.toString(),
//                     'X-RateLimit-Remaining': remaining.toString(),
//                     'X-RateLimit-Reset': reset.toString(),
//                 },
//             }
//         )
//     }
//
//     // do action ...
//     // maybe send email or whatever appropriate
//     return NextResponse.json({ message: 'Action performed successfully' })
// }

import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Time window in seconds (10 minutes = 600 seconds)
const WINDOW_TIME = 600
// Maximum number of requests per window
const MAX_REQUESTS = 5

export const runtime = "edge"

export async function GET(request: NextRequest) {
    try {
        const ip = request.ip ?? '127.0.0.1'
        const key = `ratelimit:${ip}`

        // Use Redis pipeline for atomic operations
        const pipeline = redis.pipeline()
        pipeline.get(key)
        pipeline.get(`${key}:timestamp`)
        pipeline.time()
        const [[count, timestamp, [currentTime]]] = await pipeline.exec()

        const parsedCount = count ? parseInt(count as string) : 0
        const parsedTimestamp = timestamp ? parseInt(timestamp as string) : 0

        // If this is a new IP or the window has expired
        if (!parsedCount || (currentTime - parsedTimestamp) >= WINDOW_TIME) {
            const pipeline = redis.pipeline()
            pipeline.set(key, 1)
            pipeline.set(`${key}:timestamp`, currentTime)
            pipeline.expire(key, WINDOW_TIME)
            pipeline.expire(`${key}:timestamp`, WINDOW_TIME)
            await pipeline.exec()

            return NextResponse.json({
                message: 'Action performed successfully',
                remaining: MAX_REQUESTS - 1
            })
        }

        // If within window and under limit
        if (parsedCount < MAX_REQUESTS) {
            await redis.incr(key)

            return NextResponse.json({
                message: 'Action performed successfully',
                remaining: MAX_REQUESTS - (parsedCount + 1)
            })
        }

        // Rate limit exceeded
        return NextResponse.json(
            {
                error: "Rate limit exceeded",
                resetIn: WINDOW_TIME - (currentTime - parsedTimestamp)
            },
            {
                status: 429,
                headers: {
                    'X-RateLimit-Limit': MAX_REQUESTS.toString(),
                    'X-RateLimit-Remaining': '0',
                    'X-RateLimit-Reset': (parsedTimestamp + WINDOW_TIME).toString(),
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