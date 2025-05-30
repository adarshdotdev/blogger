import mongoose, { mongo } from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    console.log("DB Connected")
}

