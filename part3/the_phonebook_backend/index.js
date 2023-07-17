const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

morgan.token('contactBody', (req, res) => {
    const body = req.body
    return JSON.stringify(body)
 })

app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :contactBody`))

let phonebook = [
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
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the phonebook!</h1>')
})
app.get('/phonebook', (req, res) => {
    res.json(phonebook)
})
app.get('/info', (req, res) => {
    res.send(
        `<h1>Phonebook has info for ${phonebook.length}</h1>
               <p>${new Date().toUTCString()}</p>`
            )
})

app.get("/phonebook/:id", (req, res) => {
    const id = Number(req.params.id)
    const contact = phonebook[id]

    if (!contact) {
        return res.status(404).json({
            error: `Contact was not found with ID ${id}`
        })
    }

    res.json(contact)
})

const generateId = () => {
    const maxId = phonebook.length > 0
        ? Math.max(...phonebook.map(n => n.id))
        : 0
    return maxId + 1
}

app.post("/phonebook", (req, res) => {
    const body = req.body
    console.log(body)

    if (!(body.name && body.number)) {
        return res.status(400).json({
            error: 'Name or number is missing'
        })
    }

    const contact = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    if (phonebook.find(c => c.name === contact.name)) {
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    phonebook = phonebook.concat(contact)

    res.json(contact)
})

app.delete('/phonebook/:id', (req, res) => {
    const id = Number(req.params.id)
    const contact = phonebook[id]

    if (!contact) {
        return res.status(404).json({
            error: `Contact was not deleted with ID ${id}`
        })
    }

    phonebook = phonebook.filter(contact => contact.id !== id)
    res.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

