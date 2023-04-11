const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    // If there is no matching id, person is undefined 
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    // Filter and remove the matching id 
    persons = persons.filter(person => person.id !== id)
  
    // Send status 204. 
    response.status(204).end()

    // Check that persons had deleted the person. 
    console.log(persons)

  })

  // Generate a random ID from the largest current ID to positive infinity 
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id))
      : 0
    const randomId = maxId + 1 + Math.floor(Math.random() * 10000)
    return randomId
  }

  // Add a new person when a POST request is made. 
  app.post('/api/persons', (request, response) => {
    const body = request.body 

    // Check if there is missing name 
    if (!body.name) {
        return response.status(400).json({ 
          error: 'name missing' 
        })
    }

    // Checks if there is missing number 
    if (!body.number) {
        return response.status(400).json({ 
            error: 'number missing' 
          })
    }

    // Checks if the name already exists. 
    const exists = persons.some(obj => obj.name === body.name); 
    if (exists) {
        return response.status(400).json({ 
            error: 'name must be unique' 
          })
    }
    
    // Create a new person object
    const newPerson = {
        id: generateId(), 
        name: body.name, 
        number: body.number 
    }

    // Append to the persons array
    persons = persons.concat(newPerson)

    // Return the newly created person 
    response.json(newPerson)

    // Print the current persons array 
    console.log(persons)
  })

// Returns the total number of people in the phonebook and time of request. 
app.get('/info', (request, response) => {
    const currentDateTime = new Date() 
    const responseHtml = `
        <p>Phonebook has info for ${persons.length} people</p>
        <p> ${currentDateTime.toString()}  </p>
    `
    response.send(responseHtml)
})

// Make the server listen on port 3001
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})