'use server'
import { dbConnect, collections } from "@/app/lib/dbConnect"
import { ObjectId } from "mongodb"

export const getProducts = async() =>{
    const client = await dbConnect(collections.PRODUCTS)
    const cursor = client.find({})
    const products = await cursor.toArray()
    return products
}

export const getSingleProduct = async (id) => {
    // Guard: ObjectId throws if the string is not 24 hex chars
    if (!ObjectId.isValid(id)) return [];
    const client = await dbConnect(collections.PRODUCTS);
    const query = { _id: new ObjectId(id) };
    const cursor = client.find(query);
    const product = await cursor.toArray();
    return product;
}