import mongoose from 'mongoose'
import PersonBiodata from '../models/Person.js'

export const getPersons = async (req, res) => {
    try {

        const PersonBiodataObjects = await PersonBiodata.find()
        res.status(200).json( PersonBiodataObjects )

    } catch (error) {

        res.status(404).json({ message: error.message })

    }
}

export const getPerson = async (req, res) => {
    const {cnic: _cnic} = req.params
    try {

        const PersonBiodataObject = await PersonBiodata.findOne({ cnic: _cnic })
        res.status(200).json( PersonBiodataObject )

    } catch (error) {

        res.status(404).json({ message: error.message })

    }
}

export const createPerson = async (req, res) => {
    
    const { cnic, fullName, fatherName, photo, gender, dateOfBirth, dateOfIssue, dateOfExpiry, temporaryAddress, permanentAddress } = req.body

    const newPersonBiodata = new PersonBiodata({ cnic, fullName, fatherName, photo, gender, dateOfBirth, dateOfIssue, dateOfExpiry, temporaryAddress, permanentAddress })

    console.log({ cnic, fullName, fatherName, photo, gender, dateOfBirth, dateOfIssue, dateOfExpiry, temporaryAddress, permanentAddress })

    try {

        await newPersonBiodata.save()
        res.status(200).json(newPersonBiodata)        
    
    } catch (error) {
    
        res.status(409).json({ message: error.message })
    
    }

}

export const updatePerson = async (req, res) => {
    
    const {id: _id} = req.params
    const person = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No data for current ID exists')
    
    const updatedPerson = await PersonBiodata.findByIdAndUpdate(_id, person, { new: true })

    res.json(updatedPerson)

}