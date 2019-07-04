'use strict'

const request = require('request-promise-native')

async function cmc() {
	let btc = await request('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=USD')
 	let key = await request('https://api.coinmarketcap.com/v1/ticker/selfkey/?convert=USD')
	let eth = await request('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD')
	let data = {
		btc: JSON.parse(btc)[0],
		key: JSON.parse(key)[0],
		eth: JSON.parse(eth)[0]
	}
	return data
}

module.exports = cmc
