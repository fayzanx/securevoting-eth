import mongoose from 'mongoose'

const ConstituencySchema = mongoose.Schema({
    id:       { type: Number, required: true, unique: true },
    name:     { type: String, required: true },
    city:     { type: String, required: true }
})

const Constituency = mongoose.model('Constituency', ConstituencySchema)
export default Constituency