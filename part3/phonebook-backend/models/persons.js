const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(
    console.log('connected to MongoDB')
  )
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z\s]+$/.test(v)
      },
      message: props => `${props.value} is not a valid name!`
    },
    minlength: [5, 'Name must be at least 5 characters long'],
    required: true,
    unique: true,
  },
  number: {
    type:String,
    validate:{
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true,
    minlength: [8, 'Number must be at least 8 characters long'],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)