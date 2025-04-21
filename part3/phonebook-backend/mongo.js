const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://cast3c:${password}@cast3cnewmongodb.x0ednpa.mongodb.net/personApp?
retryWrites=true&w=majority&appName=cast3cNewMongoDB`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
} else if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(() => {
    console.log('added', person.name, 'number', person.number, 'to phonebook')
    mongoose.connection.close()
  })

} else {
  console.log('give name and number as arguments')
  process.exit(1)
}





