'use strict'

const path = require('path')
const consoleNotes = require('./helpers/notes')

const bodyParser = require('body-parser')
const express = require('express')

const pages = require('./controllers/pages')
const sim = require('./controllers/sim')

const app = express()

require('./db/mongoose')

app.set('port', process.env.SK_PORT || 3019)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }))

app.get('/', pages.getIndex)
app.get ('/results', pages.getResults)
app.get ('/error', pages.getError)

app.post('/sim', sim.postSim)
app.post('/api/sim', sim.apiPostSim)

app.listen(app.get('port'), () => consoleNotes(app.get('port')))

module.exports = app
