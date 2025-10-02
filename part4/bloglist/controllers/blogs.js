const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//Getting all blogs 
blogsRouter.get('/', async (request, response) => { 
    const blogs = await Blog.find({})
    response.json(blogs)
})

//Getting a specific blog
blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if(!blog){
        return response.status(404).json({ error: 'blog not found' })
    }

    response.json(blog)
})

//Creating a blog
blogsRouter.post('/', async (request, response ) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    if(!blog.title || !blog.url){
        return response.status(400).json({ error: 'title or url missing ' })
    }
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)  
})

//Updating a blog
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const update = {
        likes: body.likes        
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id, 
        update, 
        {  new: true, 
           runValidators: true, 
           context: 'query'
        }
    )

    if(!updatedBlog){
        return response.status(404).json({ error: 'blog not found' })
    }
    response.json(updatedBlog)
})

//Deleting a blog
blogsRouter.delete('/:id', async (request, response ) => {
    
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter
