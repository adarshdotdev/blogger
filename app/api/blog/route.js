import { ConnectDB } from "@/lib/config/db"
import {writeFile} from "fs/promises"
const { NextResponse } = require("next/server")
import BlogModel from "@/lib/models/BlogModel"
const fs = require('fs')

const LoadDB = async () => {
    await ConnectDB()
}

LoadDB()

// API Endpoint to get all blogs
export async function GET(req){

    const blogId = req.nextUrl.searchParams.get("id")

    if(blogId){
        const blog = await BlogModel.findById(blogId)

        return NextResponse.json(blog)
    }else{

        const blogs = await BlogModel.find({})
        return NextResponse.json({blogs})
    }

     
     
}

// API endpoint to upload blogs
export async function POST(req){
    
    const formData = await req.formData()

    const timestamp = Date.now()

    const image = formData.get("image")
    const imageByteData = await image.arrayBuffer()
    const buffer = Buffer.from(imageByteData)
    const path = `./public/${timestamp}_${image.name}`

    await writeFile(path, buffer)

    const imgUrl = `/${timestamp}_${image.name}`

    const blogData = {
        title:`${formData.get("title")}`,
        description:`${formData.get("description")}`,
        category:`${formData.get("category")}`,
        author:`${formData.get("author")}`,
        image:`${imgUrl}`,
        authorImage:`${formData.get("authorImg")}`

    }

    await BlogModel.create(blogData)
    console.log("Blog Saved")

    console.log(imgUrl)

    return NextResponse.json({msg:"Blog Added" , success:true})
}

// API endpoint to delete blog
export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id"); // Removed `await` - not needed for .get()

  const blog = await BlogModel.findById(id);

  if (blog?.image) {
    fs.unlink(`./public${blog.image}`, (err) => {
      if (err) console.error("Failed to delete image:", err);
    });
  }

  await BlogModel.findByIdAndDelete(id);

  return NextResponse.json({ msg: "Blog Deleted" });
}

