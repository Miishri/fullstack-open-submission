const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://kiwixmishi:${password}@fullstackopen.jfyj0tg.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Contact = mongoose.model('Contact', phonebookSchema)

const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4]
})

if (contact.name && contact.number) {
    contact.save().then(result => {
        console.log(`Added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}else {
    Contact.find({}).then(phonebook => {
        phonebook.forEach(contact => {
            console.log(contact)
        })
        mongoose.connection.close()
    })
}

