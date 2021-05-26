import mongoose from 'mongoose'
import Person from '../models/Person.js'

export const getPeople = async (req, res) => {
    try {

        const PersonObjects = await Person.find()
        res.status(200).json( PersonObjects )

    } catch (error) {

        res.status(404).json({ message: error.message })

    }
}

export const getPerson = async (req, res) => {
    const {cnic: _cnic} = req.params
    try {

        const PersonObject = await Person.findOne({ cnic: _cnic })
        res.status(200).json( PersonObject )

    } catch (error) {

        res.status(404).json({ message: error.message })

    }
}

export const createPerson = async (req, res) => {
    
    const { cnic, fullName, fatherName, photo, gender, dateOfBirth, dateOfIssue, dateOfExpiry, temporaryAddress, permanentAddress } = req.body

    const newPerson = new Person({ cnic, fullName, fatherName, photo, gender, dateOfBirth, dateOfIssue, dateOfExpiry, temporaryAddress, permanentAddress })

    console.log({ cnic, fullName, fatherName, photo, gender, dateOfBirth, dateOfIssue, dateOfExpiry, temporaryAddress, permanentAddress })

    try {

        await newPerson.save()
        res.status(200).json(newPerson)        
    
    } catch (error) {
    
        res.status(409).json({ message: error.message })
    
    }

}

export const updatePerson = async (req, res) => {
    
    const {id: _id} = req.params
    const person = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No data for current ID exists')
    
    const updatedPerson = await Person.findByIdAndUpdate(_id, person, { new: true })

    res.json(updatedPerson)

}