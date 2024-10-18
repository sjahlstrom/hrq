import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const runtime = "edge"

const RATE_LIMIT = 5
const WINDOW_SIZE = 10 * 60 * 1000 // 10 minutes in milliseconds

async function rateLimit(ip: string): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    const now = Date.now()
    const key = `ratelimit:${ip}`

    const result = await kv.zrange(key, 0, 0, { withScores: true })
    const oldestTimestamp = result.length ? Number(result[0][1]) : null

    if (oldestTimestamp && now - oldestTimestamp > WINDOW_SIZE) {
        await kv.zremrangebyscore(key, 0, oldestTimestamp)
    }

    const currentCount = await kv.zcard(key)

    if (currentCount >= RATE_LIMIT) {
        const oldestAllowedResult = await kv.zrange(key, 0, 0, { withScores: true })
        const oldestAllowed = oldestAllowedResult.length ? Number(oldestAllowedResult[0][1]) : now
        const reset = oldestAllowed + WINDOW_SIZE

        return {
            success: false,
            limit: RATE_LIMIT,
            remaining: 0,
            reset,
        }
    }

    await kv.zadd(key, { score: now, member: now.toString() })
    await kv.expire(key, Math.ceil(WINDOW_SIZE / 1000))

    return {
        success: true,
        limit: RATE_LIMIT,
        remaining: RATE_LIMIT - currentCount - 1,
        reset: now + WINDOW_SIZE,
    }
}

export async function GET(request: NextRequest) {
    try {
        const ip = request.ip ?? '127.0.0.1'
        const { success, limit, remaining, reset } = await rateLimit(ip)

        if (!success) {
            return NextResponse.json(
                {
                    error: "Rate limit exceeded",
                    retryAfter: Math.floor((reset - Date.now()) / 1000)
                },
                {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': limit.toString(),
                        'X-RateLimit-Remaining': remaining.toString(),
                        'X-RateLimit-Reset': reset.toString(),
                        'Retry-After': Math.floor((reset - Date.now()) / 1000).toString()
                    },
                }
            )
        }

        return NextResponse.json({
            message: 'Action performed successfully',
            remaining,
            reset: Math.floor((reset - Date.now()) / 1000)
        })
    } catch (error) {
        console.error('Rate limiting error:', error)
        // Fail open approach - allow the request if rate limiting fails
        return NextResponse.json({
            message: 'Action performed successfully',
            warning: 'Rate limiting temporarily disabled'
        }, { status: 500 })
    }
}