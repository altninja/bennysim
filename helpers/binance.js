'use strict'

const request = require('request-promise-native')

async function binance() {
	try {
		let keyEth = await request('https://api.binance.com/api/v1/depth?symbol=KEYETH&limit=1000')
		let keyBtc = await request('https://api.binance.com/api/v1/depth?symbol=KEYBTC&limit=1000')

		// Sum total of orderbook

		// KEY ETH

		keyEth = JSON.parse(keyEth)

		let [keyEthAsks, keyEthBids, keyEthAskPrice, keyEthBidPrice] = [0,0,0,0]
		
		for (let ask of keyEth.asks) {
			keyEthAskPrice = keyEthAskPrice + parseFloat(ask[0])
			keyEthAsks = keyEthAsks + parseFloat(ask[1])
		}
		
		let keyEthAskPriceAverage = keyEthAskPrice / keyEth.asks.length
		
		for (let bid of keyEth.bids) {
			keyEthBidPrice = keyEthBidPrice + parseFloat(bid[0])
			keyEthBids = keyEthBids + parseFloat(bid[1])
		}
		
		let keyEthBidPriceAverage = keyEthBidPrice / keyEth.bids.length


		// KEY BTC

		keyBtc = JSON.parse(keyBtc)

		let [keyBtcAsks, keyBtcBids, keyBtcAskPrice, keyBtcBidPrice] = [0,0,0,0]
		
		for (let ask of keyBtc.asks) {
			keyBtcAskPrice = keyBtcAskPrice + parseFloat(ask[0])
			keyBtcAsks = keyBtcAsks + parseFloat(ask[1])
		}
		let keyBtcAskPriceAverage = keyBtcAskPrice / keyBtc.asks.length

		for (let bid of keyBtc.bids) {
			keyBtcBidPrice = keyBtcBidPrice + parseFloat(bid[0])
			keyBtcBids = keyBtcBids + parseFloat(bid[1])
		}
		
		let keyBtcBidPriceAverage = keyBtcBidPrice / keyBtc.bids.length

		// Response data

		let data = {
			keyEth: keyEth,
			keyBtc: keyBtc,
			keyEthSums: {
				asks: keyEthAsks,
				bids: keyEthBids,
				askPrice: keyEthAskPriceAverage,
				bidPrice: keyEthBidPriceAverage
			},
			keyBtcSums: {
				asks: keyBtcAsks,
				bids: keyBtcBids,
				askPrice: keyBtcAskPriceAverage,
				bidPrice: keyBtcBidPriceAverage
			}
		}

		return data
		
	} catch (e) {
		console.log(e)
		return e
	}
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