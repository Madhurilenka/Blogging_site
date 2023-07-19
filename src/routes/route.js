const express = require('express');
const router = express.Router();
const authorController = require("../controller/authorController")
const blogsController = require("../controller/blogsController")
const midAuth = require ("../middleware/auth")




//<<----------------- BLOG Project ---------------------------->>

// Create Author Api -------------------------------------
router.post('/authors',  authorController.createAuthor )

//  Login Api ------------------------------------------------
router.post('/login', authorController.authorLogin)

// Create Blogs Api ---------------------------------------
router.post('/createblogs', midAuth.authenticate , blogsController.createBlog)
router.get ('/blogs' , blogsController.getBlogs)
router.get ('/blogs/:blogId' ,  blogsController.getBlogById)

// Update Blogs Api ----------------------------------------
router.put('/blogs/:blogId', midAuth.authenticate ,   blogsController.updateBlogs )

//   Delete Blog Api -----------------------------------------
router.delete('/blogs/:blogId', midAuth.authenticate , blogsController.deleteByParams)





module.exports = router;