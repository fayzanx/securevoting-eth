import mongoose from 'mongoose'

const PersonSchema = mongoose.Schema({
    cnic: Number,
    photo: String,
    fullName: String,
    gender: String,
    fatherName: String,
    dateOfBirth: { type: Date, default: new Date('1947-08-14') },
    dateExpiry: { type: Date, default: new Date('1947-08-14') },
    dateIssue: { type: Date, default: new Date('1947-08-14') },
    temporaryAddress: String,
    permanentAddress: String
})

const PersonBiodata = mongoose.model('PersonBiodata', PersonSchema)
export default PersonBiodata