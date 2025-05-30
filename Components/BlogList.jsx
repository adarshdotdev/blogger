import { blog_data } from '@/Assets/assets'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios'

const BlogList = () => {
    const [menu, setMenu] = useState("All")

    const [blogs, setBlogs] = useState([])

    const fetchBlogs = async () => {
        const response = await axios.get("/api/blog")
        setBlogs(response.data.blogs)
        // console.log(response.data.blogs)
    }

    useEffect(() => {
        fetchBlogs()
    }, [])
    return (
        <div>
            <div className='flex justify-center gap-6 my-10'>
                <button className={menu === "All" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""} onClick={() => setMenu("All")}>All</button>
                <button className={menu === "Technology" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""} onClick={() => setMenu("Technology")}>Technology</button>
                <button className={menu === "Startup" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""} onClick={() => setMenu("Startup")}>Startup</button>
                <button className={menu === "Lifestyle" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""} onClick={() => setMenu("Lifestyle")}>Lifestyle</button>

            </div>
            <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
                {blogs.filter((item) => menu === "All" ? true : item.category === menu).map((item, index) => {
                    return <BlogItem id={item._id} title={item.title} image={item.image} description={item.description} category={item.category} key={index} />
                })}

            </div>
        </div>
    )
}

export default BlogList