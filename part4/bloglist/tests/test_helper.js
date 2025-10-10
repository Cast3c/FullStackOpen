const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
    },
    {
        title: "TDD harms architecture",    
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0    
    }
]

const setInitialUsers = async () => {
  const passwordHash1 = await bcrypt.hash('secret1', 10)
  const passwordHash2 = await bcrypt.hash('secret2', 10)
  return [
    {
      username: 'user1',
      name: 'User One',
      passwordHash: passwordHash1,
    },
    { username: 'user2', 
      name: 'User Two',
      passwordHash: passwordHash2
    },
  ]
}


const nonExistingId = async () => {
  const blog = new Blog({
    title: 'This will beremoved soon',
    author: 'Temporary',
    url: 'http://tempurl.com',
    likes: 0
  })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  setInitialUsers,
  nonExistingId, 
  blogsInDb,
  usersInDb
}