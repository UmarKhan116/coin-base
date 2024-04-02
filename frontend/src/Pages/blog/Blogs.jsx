import React, { useState,useEffect } from 'react'
import { getAllBlogs } from '../../api/internal';
import { useNavigate } from 'react-router-dom';
import styles from './Blog.module.css'

function Blogs() {
  const [blogs,setBlog] = new useState([])

  const navigate = useNavigate()

  useEffect(()=>{
    debugger
    (async function getAllBlogsApiCall(){
      const response = await getAllBlogs();
      if(response.status = 200){
        console.log(response)
        setBlog(response.data.blogs)
      }
    })();
    setBlog([])
  },[]);

  return (
    <div className={styles.blogsWrapper}>
      {blogs.map((blog) => (
        <div
          id={blog._id}
          className={styles.blog}
          onClick={() => navigate(`/blog/${blog._id}`)}
        >
          <h1>{blog.title}</h1>
          <img src={blog.image} />
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  )
}

export default Blogs