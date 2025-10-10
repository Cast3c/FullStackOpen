const { test, after, beforeEach, before, describe } = require('node:test')
const Blog = require('../models/blog')
const User = require('../models/user')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

describe('When there is initially some blogs saved', () => {
    beforeEach(async () => {
      await Blog.deleteMany({})
      await Blog.insertMany(helper.initialBlogs)
    })

    test("blogs are returned as JSON", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)

    })

    test("there are two blogs", async () => {
      const response = await api.get("/api/blogs")

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test("the first blog is about First Class tests", async () => {
      const response = await api.get("/api/blogs");

      assert.strictEqual(response.body[0].title, "First class tests")
    })

})

describe('Testing the blog interactions with token authentication',  () => {
    
    let users 
    let tokens = []
    
    beforeEach(async () => {

        users = await helper.setInitialUsers()
        await User.deleteMany({})
        await User.insertMany(users)

        const loginUser1 = await api
            .post('/api/login')
            .send({ username: users[0].username, password: 'secret1' })

        tokens.push(loginUser1.body.token)
    })

    test('Blog without title is not added', async () => {
      
      const newBlog = {
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        likes: 7,
        user: users[0].id
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${tokens[0]}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
    
    test('Adding a blog fails if not authorized', async () => {
        const newBlog = {
            title: 'Testing adding a blog',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
            likes:7
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
        
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
})

after(async () => {
  await mongoose.connection.close()
})

