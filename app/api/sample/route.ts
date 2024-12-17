import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

const emailSchema = z.object({
    email: z.string().email()
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email } = emailSchema.parse(body)

        await db.sample.create({
            data: {
                email
            }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error creating sample:", error)
        return NextResponse.json(
            { success: false, error: "Failed to save email" },
            { status: 500 }
        )
    }
}