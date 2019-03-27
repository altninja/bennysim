'use strict'

const request = require('request-promise-native')

async function binance() {
 	let keyEth = await request('https://api.binance.com/api/v1/depth?symbol=KEYETH')
	let keyBtc = await request('https://api.binance.com/api/v1/depth?symbol=KEYBTC')
	let data = {
		keyEth: JSON.parse(keyEth),
		keyBtc: JSON.parse(keyBtc)
	}
	return data
}

module.exports = binance
