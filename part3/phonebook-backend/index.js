require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/persons')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

//MORGAN MIDDLEWARE
app.use(morgan('dev'))

//MORGAN CUSTOM TOKEN FOR POST REQUESTS
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

//MIDDLEWARE
const Logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}

app.use(Logger)

//INFO VIEW
app.get('/info', (request, response) => {
  const date = new Date()
  const dateString = date.toString()
  const personsCant = Person.length
  console.log(Person.length)
  const info = `<p>Phonebook has info for ${personsCant} people</p><p>${dateString}</p>`
  response.send(info)
})

//INITIAL VIEW OF SERVER
app.get('/', (request, response) => {
  response.send('<h1>Persons server</h1>')
})

//GETTING ALL PERSONS
app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

//GETTING A PERSON BY ID
app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

//CREATING A NEW PERSON
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error:'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

//UPDATING A PERSON
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

//DELETING A PERSON
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(
      response.status(204).end()
    )
    .catch(error => next(error))
})

//MIDDLEWARE FOR HANDLING ERRORS
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})