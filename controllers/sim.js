'use strict'

const init = require('../init/init')
const runSim = require('../main/sim')

async function postSim(req, res) {
	try {
		let config = await init(req.body)
		let rawResults = await runSim(config)
		res.render('results', {
			results: rawResults,
			stringResults: JSON.stringify(rawResults)
		})
	} catch (e) {
		res.redirect('/error')
	}
}

async function apiPostSim(req, res) {
	try {
		let config = await init(req.body)
		let rawResults = await runSim(config)
		res.status(200).json({results: rawResults})
	} catch (e) {
		res.status(400).json({message: 'There was an error'})
	}
}

module.exports = {
	postSim,
	apiPostSim
}
