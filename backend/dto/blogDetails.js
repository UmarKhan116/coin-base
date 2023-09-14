class blogDetailDTO{
    constructor(blog){
        this._id = blog._id,
        this.author = blog.author,
        this.content = blog.content,
        this.title = blog.title,
        this.image = blog.image
        this.author_name = blog.author.Name,
        this.authorUserName = blog.author.Username
        this.email = blog.author.Email

    }
}
module.exports = blogDetailDTO;