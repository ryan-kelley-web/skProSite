const express = require('express');
const router = express.Router();
const validateSession = require('../Middleware/validateSession');
const Blog = require('../db').import('../Models/blogModel');

//***all blogController activity needs to be ADMIN-USER only***-----------confirmed? QQQ

// router.get('/practice', validateSession, function(req, res){
//     res.send('This is a GET request for the "A Letter to the Strong" blog endpoint.')
// })

/*****************
ENDPOINTS
*****************/

//CREATE NEW BLOG  
router.post('/newBlog', validateSession, (req, res) => {
    const blogArticle = {
        category: req.body.blog.category,
        title: req.body.blog.title,
        subtitle: req.body.blog.subtitle,
        pubDate: req.body.blog.pubDate,
        contentBody: req.body.blog.contentBody,
        author: req.user.id,
    }

    Blog.create(blogArticle)
        .then((blog) => res.status(200).json(blog))
        .catch((err) => res.status(500).json({ error: err }))
}) //END CREATE NEW BLOG ENDPOINT

//GET ALL BLOGS
router.get('/', (req, res) => {
    Blog.findAll()
    .then((blogs)=>res.status(200).json(blogs))
    .catch((err)=>res.status(500).json({error:err}))
})



module.exports = router;




module.exports = router;

//note: write http req in controller, write route in app.js