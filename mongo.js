const mongoose =  require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as an argument')
    process.exit(1)
} else if (process.argv.length === 3) {
    // print the contacts
} else {
    // add the contacts to database
}

const password = process.argv[2]
const url = `mongodb+srv://dy97va:${password}@cluster0.obkuscm.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

if(process.argv.length === 5) {
    const newName = process.argv[3]
    const newNumber = process.argv[4]
    const person = new Person({
        name: newName,
        number: newNumber,
    })
    person.save().then(result => {
        console.log('person saved')
        mongoose.connection.close()
    })

}
