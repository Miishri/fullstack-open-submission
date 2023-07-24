const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config({ path: './mongo.env' });

const Contact = require("./contact")

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('contactBody', (req, res) => {
    const body = req.body
    return JSON.stringify(body)
 })
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :contactBody`))

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the phonebook!</h1>')
})
app.get('/info', (req, res) => {

    Contact.find({}).then(phonebook => {
        res.send(
            `<h1>Phonebook has info for ${phonebook.length}</h1>
               <p>${new Date().toUTCString()}</p>`
        )
    })
})

app.post("/phonebook", (req, res) => {

    const contact =  new Contact({
        name: req.body.name,
        number: req.body.number
    })

    contact.save().then(savedContact => {
        res.json(savedContact)
    }).catch(error => {
        console.log("Error occurred inside post", error)
        return res.status(400).send({ error: `Contact creation failed: Contact name (${contact.name}) provided is less than minimum length of (3) characters.`})
    })
})
app.get('/phonebook', (req, res) => {
    Contact.find({}).then(phonebook => {
        res.json(phonebook)
    })
})

app.get("/phonebook/:id", (req, res, next) => {
    Contact.findById(req.params.id)
        .then(contact => {
        if (contact) {
            res.json(contact)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})

app.put("/phonebook/:id", (req, res, next) => {
    const contact =  {
        name: req.body.name,
        number: req.body.number
    }

    Contact.findByIdAndUpdate(req.params.id, contact, {new:true})
        .then(updatedContact => {
            res.json(updatedContact)
        }).catch(error => next(error))
})
app.delete('/phonebook/:id', (req, res, next) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

