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


// parse binance data
// primary objective - get total amount of KEY tied up in orders
// secondary objective - get realistic costs of purchasing KEY for user agents
// tertiary objective - get realistic costs for vendor agents selling KEY

// response format example
// { 
// 	"lastUpdateId": 23288859, 
// 	"bids": [
//         ["0.00000072", "43573879.00000000"],
//         ["0.00000071", "29400880.00000000"],
//         ["0.00000070", "10466369.00000000"],
//     ], 
//   "asks": [
//         ["0.00000073", "670373.00000000"],
//         ["0.00000074", "16655861.00000000"],
//         ["0.00000075", "12438505.00000000"]
//     ] 
// }