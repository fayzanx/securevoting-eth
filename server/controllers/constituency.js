import Constituency from '../models/Constituency.js'

export const getConstituencies = async (req, res) => {
    try {

        const ConstituencyObjects = await Constituency.find()
        res.status(200).json( ConstituencyObjects )

    } catch (error) {

        res.status(404).json({ message: error.message })

    }
}

export const getConstituency = async (req, res) => {
    const {id: _id} = req.params
    try {

        const ConstituencyObject = await Constituency.findOne({ id: _id })
        res.status(200).json( ConstituencyObject )

    } catch (error) {

        res.status(404).json({ message: error.message })

    }
}

export const createConstituency = async (req, res) => {
    
    const { id, type, number, locator, city } = req.body

    const newConstituency = new Constituency({ id, type, number, locator, city })

    try {

        await newConstituency.save()
        res.status(200).json(newConstituency)        
    
    } catch (error) {
    
        res.status(409).json({ message: error.message })
    
    }

}