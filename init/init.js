// INIT

// Seed Users
// - Scrape all KEY token holders
// - Wallet download stats

// Seed Vendors
// - Flag theory
// - Crypto Exchanges

// Seed Products
// - Incorporations
// - Bank Accounts
// - Notaries
// - Translations
// - Accountants

// Seed Exchange
// - Binance Order Book (Buy/Sell)

// Get CMC data

// Get Config form (req.body)

// format config objet for main sim 

'use strict'

const cmc = require('../helpers/cmc')
const binance = require('../helpers/binance')

const Sale = require('../db/models/sale')

const Vendor = require('../db/models/vendor')
const vendorSeeds = require('../init/seeds/vendors')

async function init(config) {
	try {
		
		// Clear DB
		await Vendor.deleteMany({})
		await Sale.deleteMany({})
		
		// Seed Vendors to DB
		for (let vendor of vendorSeeds) {
			Vendor.create({
				vendorId: vendor.vendorId,
				address: vendor.address,
				keyBalance: 0
			})
		}
		
		// Get CMC data
		let cmcData = await cmc()
		config.key = cmcData.key
		config.eth = cmcData.eth

		// Get Binance data
		let binanceData = await binance()

		// Return config object for main sim
		return config
	} catch (e) {
		return {error: true}
	}
}

module.exports = init
