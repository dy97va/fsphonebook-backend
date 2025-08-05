const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.static('dist'))

app.use(express.json())

morgan.token('content', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :response-time ms :content'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`<div> Phonebook contains info for ${persons.length} people <div/> <div> ${date} <div/>` )
})

app.get('/api/persons', (request, response)=>{
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const max = 100000
    const min = 5
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'number or name is missing'
        })
    }

    if (persons.find(person => person.name === body.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    
    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response)=> {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})