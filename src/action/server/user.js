'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/authOption'
import { dbConnect, collections } from '@/app/lib/dbConnect'

export async function getUserProfile() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Unauthorized')

  const collection = await dbConnect(collections.USERS)
  const user = await collection.findOne(
    { email: session.user.email },
    { projection: { password: 0 } }
  )
  if (!user) throw new Error('User not found')

  return { ...user, _id: user._id.toString() }
}

export async function updateUserProfile(data) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Unauthorized')

  const { nid, phone } = data
  const updateFields = {}
  if (nid !== undefined) updateFields.nid = nid
  if (phone !== undefined) updateFields.phone = phone

  if (Object.keys(updateFields).length === 0) {
    return { success: false, message: 'No fields to update' }
  }

  const collection = await dbConnect(collections.USERS)
  await collection.updateOne(
    { email: session.user.email },
    { $set: updateFields }
  )

  return { success: true, message: 'Profile updated successfully' }
}
