'use strict'

const init = require('../init/init')
const runSim = require('../main/sim')

const Sale = require('../db/models/sale')
const Deposit = require('../db/models/deposit')

async function postSim(req, res) {
	try {
		let config = await init(req.body)
		let rawResults = await runSim(config)
		let sales = await Sale.find({})
		let deposits = await Deposit.find({})
		res.render('results', {
			results: rawResults,
			stringResults: JSON.stringify(rawResults),
			sales,
			deposits
		})
	} catch (e) {
		res.redirect('/error')
	}
}

async function apiPostSim(req, res) {
	try {
		let config = await init(req.body)
		let rawResults = await runSim(config)
		let sales = await Sale.find({})
		res.status(200).json({results: rawResults, sales: sales})
	} catch (e) {
		res.status(400).json({message: 'There was an error'})
	}
}

module.exports = {
	postSim,
	apiPostSim
}
