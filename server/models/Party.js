import mongoose from 'mongoose'

const PartySchema = mongoose.Schema({
    id:                 { type: Number, required: true, unique: true },
    name:               { type: String, required: true },
    abbreviation:       { type: String, required: true },
    symbol:             { type: String, required: true },
    logo:               { type: String, required: true },
    flag:               { type: String, required: true },
    focalPersonCnic:    { type: Number, required: true },
})

const Party = mongoose.model('Party', PartySchema)
export default Party