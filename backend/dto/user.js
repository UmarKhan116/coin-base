class userDTO{
    constructor(user){
        this.id = user._id,
        this.username = user.Username,
        this.email = user.Email
    }
}

module.exports = userDTO