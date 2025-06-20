import { auth } from '@clerk/nextjs/server';
import { connectToDB } from "@/lib/db"
import User from "@/lib/model/User" // Adjust path if needed

export async function POST() {
  const { userId, user } = await auth()

  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  await connectToDB()

  const existingUser = await User.findOne({ clerkId: userId })

  if (!existingUser) {
    await User.create({
      clerkId: userId,
      email: user?.emailAddresses[0]?.emailAddress,
      name: user?.firstName || 'User',
    })
  }

  return new Response('User synced', { status: 200 })
}
