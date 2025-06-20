import { NextResponse } from 'next/server'
import connectDB from "@/lib/db";
import Reminder from '@/lib/model/reminder'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { clerkId, email, title,notes, time } = body
		console.log(body)
    if (!clerkId || !email || !title || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await connectDB()

    const reminder = await Reminder.create({
	  clerkId,
      to:email,
      subject:title,
      remindAt:time,
	  body:notes,
      sent: false,
    })

    return NextResponse.json({ success: true, reminder }, { status: 201 })
  } catch (error) {
    console.error("Error creating reminder:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
