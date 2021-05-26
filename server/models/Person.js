import mongoose from 'mongoose'

const PersonSchema = mongoose.Schema({
    cnic:               { type: Number, required: true, unique: true },
    fullName:           { type: String, required: true },
    fatherName:         { type: String, required: true },
    photo:              { type: String, required: true },
    gender:             { type: String, required: true },
    dateOfBirth:        { type: Date, required: true },
    dateIssue:          { type: Date, required: true },
    dateExpiry:         { type: Date, required: true }, //default: new Date('1947-08-14')
    temporaryAddress:   { type: String, required: true },
    permanentAddress:   { type: String, required: true },
    fingerprintTemplate:{ type: String} //, required: true } // disabled temporarily
})

const Person = mongoose.model('Person', PersonSchema)
export default Person