const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true, 
    validate: {
      validator: function(v) {
        return v.length >= 3 // Must be at least 3 characters long 
      }, 
      message: props => `${props.value} must be at ≥ 3 characters long!`
    }, 
    unique: true
  },
  name: String,
  passwordHash: {
    type: String, 
    required: true 
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User