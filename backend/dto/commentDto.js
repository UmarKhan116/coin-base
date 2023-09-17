class CommentDTO{
    constructor(comment){
        this.id = comment._id,
        this.content = comment.content,
        this.username = comment.author.Username,
        this.email = comment.author.Email
    }
}
module.exports = CommentDTO;