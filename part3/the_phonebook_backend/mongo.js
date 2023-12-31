const mongoose = require('mongoose')
require('dotenv').config({ path: './mongo.env' });

const url = process.env.URL

if (!url) {
    console.log("Invalid URL: error does not exist")
    process.exit()
}



mongoose.set('strictQuery',false)
console.log("Connecting to URL: ", url)
mongoose.connect(url).then(
    result => {
        console.log("connected to mongoDB")
    }).catch((error) => {
    console.log("error connecting to mongoDB:", error.message)
})

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: Number
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.id
    }
})

const Contact = mongoose.model('Contact', phonebookSchema)

const contact = new Contact({
    name: process.argv[2],
    number: process.argv[3]
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
