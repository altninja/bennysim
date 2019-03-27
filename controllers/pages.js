'use strict'

const cmc = require('../helpers/cmc')

async function getIndex(req, res) {
	let cmcData = await cmc()
	res.render('index', {
		title: 'Setup',
		key: cmcData.key,
		eth: cmcData.eth
	})
}

function getResults(req, res) {
	res.render('results', {
		title: 'Results'
	})
}

function getError(req, res) {
	res.render('error', {
		title: 'Error'
	})
}

module.exports = {
	getIndex,
	getResults,
	getError
}