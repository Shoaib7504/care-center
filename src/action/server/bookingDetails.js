'use server'
import { dbConnect, collections } from "@/app/lib/dbConnect"
import { ObjectId } from "mongodb"

export const createBooking = async (payload) => {
  const collection = await dbConnect(collections.BOOKINGS)
  const doc = {
    ...payload,
    status: "Pending",
    createdAt: new Date(),
  }
  const result = await collection.insertOne(doc)
  return { ...doc, _id: result.insertedId.toString() }
}

export const getUserBookings = async (userId) => {
  const collection = await dbConnect(collections.BOOKINGS)
  const cursor = collection.find({ userId }).sort({ createdAt: -1 })
  const bookings = await cursor.toArray()
  return bookings.map((b) => ({ ...b, _id: b._id.toString() }))
}

export const cancelBooking = async (bookingId, userId) => {
  const collection = await dbConnect(collections.BOOKINGS)
  const result = await collection.updateOne(
    { _id: new ObjectId(bookingId), userId },
    { $set: { status: "Cancelled" } }
  )
  return result.modifiedCount > 0
}
