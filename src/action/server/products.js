'use server'
import { dbConnect, collections } from "@/app/lib/dbConnect"
import { ObjectId } from "mongodb"

export const getProducts = async() =>{
    const client = await dbConnect(collections.PRODUCTS)
    const cursor = client.find({})
    const products = await cursor.toArray()
    return products
}

export const getSingleProduct = async (slug) => {
  const collection = await dbConnect(collections.PRODUCTS);

  const product = await collection.findOne({
    id: slug,
  });

  return product;
};