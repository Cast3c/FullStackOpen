const { test, after, describe ,beforeEach} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')


describe('when there is initially one user in db', () => {
   
    beforeEach( async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', name: 'admin' ,passwordHash })

        await user.save()
    })

    test('Creation of a new user succeeds', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map((user) => user.username)
        assert(usernames.includes(newUser.username))
    })

    test('User creation fails with proper statuscode and message when username is null or less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: '',
            name: 'Matti Luukkainen',
            password: 'salainen'            
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('username must be at least 3 characters long'))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('User creation fails with proper statuscode and message when username is already taken', async () => {
        const usersAtStart = await helper.usersInDb()

         const newUser = {
            username: 'root',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

})

after(async () => {
    await mongoose.connection.close()
})