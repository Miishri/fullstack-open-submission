const express = require('express')
const app = express()
app.use(express.json())

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
            error: 'Contact was not found'
        })
    }

    res.json(contact)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

