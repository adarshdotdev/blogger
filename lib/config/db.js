import mongoose, { mongo } from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect("mongodb+srv://adarshdotdev:adarshdotdev@cluster0.lr2eppt.mongodb.net/blog-app")

    console.log("DB Connected")
}

 