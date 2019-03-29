'use strict'

const cmc = require('../helpers/cmc')
const binance = require('../helpers/binance')

const vendors = require('../init/seeds/vendors')
const products = require('../init/seeds/products')

async function getIndex(req, res) {
	let cmcData = await cmc()
	let binanceData = await binance()
	res.render('index', {
		title: 'Setup',
		key: cmcData.key,
		eth: cmcData.eth,
		keyEth: binanceData.keyEth,
		keyBtc: binanceData.keyBtc,
		vendors,
		products
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