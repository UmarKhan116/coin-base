class blogDto{
    constructor(blog){
        this._id = blog._id,
        this.author = blog.author,
        this.content = blog.content,
        this.title = blog.title,
        this.image = blog.image
    }
}

module.exports = blogDto