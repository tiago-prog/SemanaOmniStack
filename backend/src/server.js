const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require = require('./routes')

const server = express()

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-bildf.mongodb.net/o?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(3333)
