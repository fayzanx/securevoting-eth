import Party from '../models/Party.js'

export const getParties = async (req, res) => {
    try {

        const PartyObjects = await Party.find()
        res.status(200).json( PartyObjects )

    } catch (error) {

        res.status(404).json({ message: error.message })

    }
}

export const getParty = async (req, res) => {
    const {id: _id} = req.params
    try {

        const PartyObject = await Party.findOne({ id: _id })
        res.status(200).json( PartyObject )

    } catch (error) {

        res.status(404).json({ message: error.message })

    }
}

export const createParty = async (req, res) => {
    
    const partyData = req.body
    const newParty = new Party(partyData)

    try {

        await newParty.save()
        res.status(200).json(newParty)        
    
    } catch (error) {
    
        res.status(409).json({ message: error.message })
    
    }

}