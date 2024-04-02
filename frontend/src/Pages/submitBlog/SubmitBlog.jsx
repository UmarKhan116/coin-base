import React, { useState } from "react";
import TextField from "../../component/textField/TextField";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { createBlog } from "../../api/internal";
import { useNavigate } from "react-router-dom";
import styles from "./submitblog.module.css"

function SubmitBlog() {
  const navigate = useNavigate()
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();

  const author = useSelector((state) => state.user._id);

  const handleImageChange = (e) => {
    debugger;

    const file = e.target.files[0];

    if (file) {
      let reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

 const handlesubmit = async () => {
    debugger
    const data = {
      author:author,
      title: title,
      content:content,
      image:image
    }
    const response = await createBlog(data);

    if(response.status == 201){
      navigate('/')
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* <div className=""></div> */}
      <h1>Create Blog</h1>
      <TextField
        type="text"
        value={title}
        placeholder="Enter title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        type="text"
        className={styles.content}
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="your content goes here..."
      />
      <div>
        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <button className={styles.submit} onClick={handlesubmit}>Submit blog</button>
    </div>
  );
}

export default SubmitBlog;
