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

//CREATE
////ADD NEW BLOG
router.post('/newblog', validateSession, (req, res) => {
    
    const blogArticle = {
        category: req.body.blog.category,
        title: req.body.blog.title,
        subtitle: req.body.blog.subtitle,
        pubDate: req.body.blog.pubDate,
        contentBody: req.body.blog.contentBody,
        owner: req.user.id,
    }

    Blog.create(blogArticle)
        .then((blog) => res.status(200).json(blog))
        .catch((err) => res.status(500).json({ error: err }))
}) //END ADD NEW BLOG (CREATE)

//READ
////SEE ALL BLOGS 
router.get('/allblogs', (req, res) => { //no validateSession necessary
    
    Blog.findAll()
        .then((blogs) => res.status(200).json(blogs))
        .catch((err) => res.status(500).json({ error: err }))
}) //END SEE ALL BLOGS (READ)

//UPDATE
////EDIT BLOG
router.put('/editblog/:blogId', validateSession, function (req, res) {
    
    const editBlog = {
        category: req.body.blog.category,
        title: req.body.blog.title,
        subtitle: req.body.blog.subtitle,
        pubDate: req.body.blog.pubDate,
        contentBody: req.body.blog.contentBody,
        owner: req.user.id,
    }

    const query = { where: { id: req.params.blogId, owner: req.user.id} };

    Blog.update(editBlog, query)
        .then((blogs) => res.status(200).json(blogs))
        .catch((err) => res.status(500).json({ error: err }))
}) //END EDIT BLOG (UPDATE)

//DELETE
////DELETE BLOG
router.delete('/deleteblog/:blogId', validateSession, function (req, res) {

    const query = {where:{id: req.params.blogId, /*owner: req.user.id*/}}

    Blog.destroy(query)
    .then( () => res.status(200).json({message: 'Blog has been deleted.'}))
    .catch((err) => res.status(500).json({error: err}))
}) //END DELETE BLOG (DELETE)


module.exports = router;



//note: write http req in controller, write route in app.js