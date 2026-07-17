'use server'
import bcrypt from 'bcrypt'
import { collections, dbConnect } from "@/app/lib/dbConnect"
export const PostUser = async (payload) => {
    const { email, password, name, phone,nid } = payload;
    // Check payload email is exist or not
    if (!email || !password) return null;
    // Check User is alive
    const userCollection = await dbConnect(collections.USERS)
    const isExist = await userCollection.findOne({ email })
    if (isExist) {
        return { message: "User already exist", success: false }
    }
    // Create User
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
        providerId:'credentials',
        email,
        password: hashedPassword,
        name,
        phone,
        nid,
        role: 'user',
    }
    const client = await dbConnect(collections.USERS);
    const result = await client.insertOne(newUser);
    if (result.acknowledged) {
        return { ...result,insertedId:result.insertedId.toString(), message: "User created successfully", success: true }
    }

};

export const LogInUser = async (payload) => {
    const { email, password } = payload;
    // check user
    if (!email || !password) return null;
    // Check User is alive
    const userCollection = await dbConnect(collections.USERS)
    const user = await userCollection.findOne({ email })
    if (!user) {
        return { message: "User not found", success: false }
    }
    // Check Password
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
        return { message: "Invalid password", success: false }
    }
    return { user, success: true }
    
}