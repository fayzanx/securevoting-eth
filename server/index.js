import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import PersonRoutes from './routes/persons.js'

import {CONNECTION_URL} from './db.js'
const PORT = process.env.PORT || 5000

const app = express()

// properly send requests
app.use(bodyParser.json({ limit: "3mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "3mb", extended: true }))
app.use(cors())

app.use('/persons', PersonRoutes)

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)