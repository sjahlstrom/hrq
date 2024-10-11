import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json()

        const { data, error } = await resend.emails.send({
            from: 'hrq@humanrq.com',
            to: email,
            subject: `New message from ${name}`,
            text: message,
        })

        if (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 400 })
        }

        return NextResponse.json({ success: true, data })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
    }
}