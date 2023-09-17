const express = require('express');
const authController = require('../controller/authcontroller');
const blogController = require('../controller/blogController')
const commentController = require('../controller/commentController')
const auth = require('../middleware/auth')


// const app = express()

const router = express.Router();

//login user
router.post('/login',authController.login)
// register user
router.post('/register', authController.register)

//logout

router.post('/logout', auth, authController.logout)

//refresh
router.get('/refresh', authController.refresh)
//blog
//CRUD
//create
router.post('/blog', auth, blogController.create)
//read all blogs
router.get('/blog/all', auth, blogController.getAll)
//read blog by id
router.get('/blog/:id', blogController.getBlogById)
//update
router.put('/update', auth, blogController.updateBlog)
//delete
router.delete('/blog/:id', auth, blogController.deleteBlog)

//comment
//create comment
router.post('/comment', auth, commentController.createComment)
//read comments by blog id
router.get('/comment/:id', auth, commentController.getCommentsById)
module.exports = router;