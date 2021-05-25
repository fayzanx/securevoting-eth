import mongoose from 'mongoose'

const Constituency = mongoose.Schema({
    id:                 { type: Number, required: true, unique: true },
    type:               { type: String, required: true },
    number:             { type: String, required: true },
    name:               { type: String },
})

const constituency = mongoose.model('constituency', Constituency)
export default constituency