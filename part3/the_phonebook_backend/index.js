require('dotenv').config({ path: './mongo.env' });
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Contact = require("./contact")

app.use(express.json())
app.use(express.static('build'))
app.use(cors())


morgan.token('contactBody', (req, res) => {
    const body = req.body
    return JSON.stringify(body)
 })

app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :contactBody`))

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the phonebook!</h1>')
})
app.get('/phonebook', (req, res) => {
    Contact.find({}).then(phonebook => {
        res.json(phonebook)
    })
})
app.get('/info', (req, res) => {
    res.send(
        `<h1>Phonebook has info for</h1>
               <p>${new Date().toUTCString()}</p>`
            )
})

app.get("/phonebook/:id", (req, res) => {
    Contact.findById(req.params.id).then(contact => {
        res.json(contact)
    })
})

app.post("/phonebook", (req, res) => {
    const body = req.body

    if (!(body.name && body.number)) {
        return res.status(400).json({
            error: 'Name or number is missing'
        })
    }

    const contact =  new Contact({
        name: body.name,
        number: body.number
    })

    contact.save().then(savedContact => {
        res.json(savedContact)
    })
})

app.delete('/phonebook/:id', (req, res) => {
    const id = Number(req.params.id)

    if (!id) {
        return res.status(404).json({
            error: `Contact was not deleted with ID ${id}`
        })
    }


    res.status(204).end()
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

