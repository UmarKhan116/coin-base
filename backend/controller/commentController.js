const Joi = require("joi");
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const Comment = require("../model/comment");
const commentDto = require('../dto/commentDto')

const commentController = {
  async createComment(req, res, next) {
    const commentSchema = Joi.object({
      content: Joi.string().required(),
      blog: Joi.string().regex(mongodbIdPattern).required(),
      author: Joi.string().regex(mongodbIdPattern).required(),
    });
    const { error } = commentSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { content, blog, author } = req.body;

    try {
      const newComment = new Comment({
        content,
        blog,
        author,
      });
      await newComment.save();
    } catch (error) {
      return next(error);
    }
    return res.status(201).json({ message: "comment created" });
  },

  async getCommentsById(req, res, next) {
    debugger
    const commentsByIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = commentsByIdSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    const { id } = req.params;
    console.log(id)
    let comments;
    try {
      comments = await Comment.find({ blog: id }).populate('author');
    } catch (error) {
        return next(error)
    }
let dto
let arr = []

    for(let i=0;i<comments.length; i++){
         dto = new commentDto(comments[i])
         arr.push(dto)
    }
    res.status(200).json({data: arr})
  },
};
module.exports = commentController;
