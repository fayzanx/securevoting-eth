import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import PersonRoutes from './routes/person.js'
import PartyRoutes from './routes/party.js'
import ConstituencyRoutes from './routes/constituency.js'


const app = express()
dotenv.config()

// properly send requests
app.use(bodyParser.json({ limit: "3mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "3mb", extended: true }))
app.use(cors())

// api endpoints
app.use('/person', PersonRoutes)
app.use('/party', PartyRoutes)
app.use('/constituency', ConstituencyRoutes)
app.use('/', (req, res) => res.send('securevoting-eth API'))

// constants
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)