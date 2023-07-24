const mongoose = require('mongoose')

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
    name: {
        type: String,
        minlength: 3
    },
    number: Number
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', phonebookSchema)