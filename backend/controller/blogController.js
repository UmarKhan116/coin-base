const Joi = require("joi");
const Blog = require("../model/blog");
const Comment = require("../model/comment");
const blogDTO = require("../dto/blogDto");
const { BACKEND_SERVER_PATH } = require("../config/index");
const fs = require("fs");
const blogDetailDTO = require("../dto/blogDetails");
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const blogController = {
  async create(req, res, next) {
    debugger;
    // validate data
    const blogSchema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      image: Joi.string().required(),
      author: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = blogSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { title, author, content, image } = req.body;

    // read as buffer
    const buffer = Buffer.from(
      image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );

    // allot a random name
    const imagePath = `${Date.now()}-${author}.png`;

    // save to cloudinary
    let response;

    try {
      //   response = await cloudinary.uploader.upload(photo);
      fs.writeFileSync(`storage/${imagePath}`, buffer);
    } catch (error) {
      return next(error);
    }

    // save blog in db
    let newBlog;
    try {
      newBlog = new Blog({
        title,
        content,
        image: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
        author,
      });

      await newBlog.save();
    } catch (error) {
      return next(error);
    }

    const blogDto = new blogDTO(newBlog);

    return res.status(201).json({ blog: blogDto });
    // handle photo storage and naming
    // return response
  },
  async getAll(req, res, next) {
    debugger;
    try {
      const allblogs = await Blog.find({});
      let blogdto = [];
      for (let i = 0; i < allblogs.length; i++) {
        const DTO = new blogDTO(allblogs[i]);
        blogdto.push(DTO);
      }
      return res.status(201).json({ blogs: blogdto });
    } catch (error) {
      return next(error);
    }
  },
  async getBlogById(req, res, next) {
    debugger;

    const blogIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });
    const { error } = blogIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { id } = req.params;
    let blog;
    try {
      blog = await Blog.findById({ _id: id }).populate("author");
    } catch (error) {
      return next(error);
    }
    // const dto = new blogDTO(blog)

    const blogDDTO = new blogDetailDTO(blog);

    res.status(200).json({ blog: blogDDTO });
  },
  async updateBlog(req, res, next) {
    debugger
    const updateBlogSchema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      author: Joi.string().regex(mongodbIdPattern).required(),
      blogId: Joi.string().regex(mongodbIdPattern).required(),
      photo: Joi.string(),
    });

    const { error } = updateBlogSchema.validate(req.body);

    if(error){
      return next(error)
    }

    const { title, content, author, blogId, photo } = req.body;

    // delete previous photo
    // save new photo

    let blog;

    try {
      blog = await Blog.findOne({ _id: blogId });
    } catch (error) {
      return next(error);
    }

    if (photo) {
      const buffer = Buffer.from(
        photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );
  
      // allot a random name
      const imagePath = `${Date.now()}-${author}.png`;

      let response;
      try {
        fs.writeFileSync(`storage/${imagePath}`, buffer);
      } catch (error) {
        return next(error);
      }

      await Blog.updateOne(
        { _id: blogId },
        {
          title,
          content,
          image: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
        }
      );
    }
    else {
      await Blog.updateOne({ _id: blogId }, { title, content });
    }

    return res.status(200).json({ message: "blog updated!" });
  },

  async deleteBlog(req, res, next) {
    debugger;
    const deleteIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = deleteIdSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    const { id } = req.params;

    try {
      await Blog.deleteOne({ _id: id });
      await Comment.deleteMany({ _id: id });
    } catch (error) {
      return next(error);
    }
    res.status(200).json({ msg: "blog deleted" });
  },
};
module.exports = blogController;
