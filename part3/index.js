const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())

//MORGAN MIDDLEWARE
app.use(morgan('dev'))

//MORGAN CUSTOM TOKEN FOR POST REQUESTS
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
    {
        id: "5",
        name: "Ricardo Castellar ",
        number: "313-212-9686"
    }
  ]

//MIDDLEWARE
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('---')
    next()
}   

app.use(requestLogger)

//INFO VIEW
app.get('/info', (request, response) => {
    const date = new Date()
    const dateString = date.toString()
    const personsCant = persons.length
    const info = `<p>Phonebook has info for ${personsCant} people</p><p>${dateString}</p>`
    response.send(info)
})

//INITIAL VIEW OF SERVER
app.get('/', (request, response) => {
    response.send('<h1>Persons server</h1>')
})

//GETTING ALL PERSONS
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//GETTING A PERSON BY ID
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const maxId = persons.length > 0 
    ? Math.max(...persons.map(p => Number(p.id))) 
    : 0
    return maxId + 1
}

//CREATING A NEW PERSON
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number missing' })
    }
    
    const person = {
        name: body.name,
        number: body.number,
        id: id
    }

    persons = persons.concat(person)

    response.json(person)
})

//MIDDLEWARE FOR HANDLING ERRORS
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}   

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})