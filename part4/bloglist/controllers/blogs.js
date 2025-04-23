const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//Getting all blogs 
blogsRouter.get('/', (request, response) => { 
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

//Getting a specific blog
blogsRouter.get('./:id', (request, response, next) => {
    Blog.findById(request.params.id)
    .then(blog => {
        if(blog){
            response.json(note)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

//Creating a blog
blogsRouter.post('/', (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog.save()
    .then(savedBlog => {
        response.json(savedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
