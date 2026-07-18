'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/authOption'
import { dbConnect, collections } from '@/app/lib/dbConnect'
import { ObjectId } from 'mongodb'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== 'admin') {
    throw new Error('Unauthorized: admin access required')
  }
  return session
}

export async function adminGetAllUsers() {
  await requireAdmin()
  const collection = await dbConnect(collections.USERS)
  const users = await collection
    .find({}, { projection: { password: 0 } })
    .sort({ createdAt: -1 })
    .toArray()
  return users.map((u) => ({ ...u, _id: u._id.toString() }))
}

export async function adminGetAllBookings() {
  await requireAdmin()
  const collection = await dbConnect(collections.BOOKINGS)
  const bookings = await collection
    .find({})
    .sort({ createdAt: -1 })
    .toArray()
  return bookings.map((b) => ({ ...b, _id: b._id.toString() }))
}

export async function adminUpdateUserRole(userId, newRole) {
  await requireAdmin()
  if (!['user', 'admin'].includes(newRole)) {
    throw new Error('Invalid role')
  }
  const collection = await dbConnect(collections.USERS)
  await collection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { role: newRole } }
  )
  return { success: true }
}

export async function adminDeleteUser(userId) {
  await requireAdmin()
  const collection = await dbConnect(collections.USERS)
  await collection.deleteOne({ _id: new ObjectId(userId) })
  return { success: true }
}

export async function adminUpdateBookingStatus(bookingId, status) {
  await requireAdmin()
  const valid = ['Pending', 'Confirmed', 'Completed', 'Cancelled']
  if (!valid.includes(status)) {
    throw new Error('Invalid status')
  }
  const collection = await dbConnect(collections.BOOKINGS)
  await collection.updateOne(
    { _id: new ObjectId(bookingId) },
    { $set: { status } }
  )
  return { success: true }
}

export async function adminDeleteBooking(bookingId) {
  await requireAdmin()
  const collection = await dbConnect(collections.BOOKINGS)
  await collection.deleteOne({ _id: new ObjectId(bookingId) })
  return { success: true }
}
