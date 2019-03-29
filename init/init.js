'use strict'

const cmc = require('../helpers/cmc')
const binance = require('../helpers/binance')

const Sale = require('../db/models/sale')
const User = require('../db/models/user')
const Deposit = require('../db/models/deposit')
const Vendor = require('../db/models/vendor')

const vendorSeeds = require('../init/seeds/vendors')

async function init(config) {
	try {
		
		// Clear DB
		await Vendor.deleteMany({})
		await Sale.deleteMany({})
		await User.deleteMany({})
		await Deposit.deleteMany({})
		
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
