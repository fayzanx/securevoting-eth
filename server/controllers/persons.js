import PersonBiodata from '../models/PersonBiodata.js' 

export const getPersons = async (req, res) => {
    try {

        const PersonBiodataObjects = await PersonBiodata.find()
        res.status(200).json( PersonBiodataObjects )

    } catch (error) {

        res.status(404).json({ message: error.message })

    }
}

export const createPerson = async (req, res) => {
    
    const body = req.body
    const newPersonBiodata = new PersonBiodata(body)

    try {

        await newPersonBiodata.save()
        res.status(200).json(newPersonBiodata)        
    
    } catch (error) {
    
        res.status(409).json({ message: error.message })
    
    }
}