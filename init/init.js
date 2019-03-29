'use strict'

const cmc = require('../helpers/cmc')
const binance = require('../helpers/binance')
const idgen = require('../helpers/idgen')

const Sale = require('../db/models/sale')
const User = require('../db/models/user')
const Deposit = require('../db/models/deposit')
const Vendor = require('../db/models/vendor')

const vendorSeeds = require('../init/seeds/vendors')
const productSeeds = require('../init/seeds/products')

async function init(config) {
	try {
		
		// Clear DB
		await Vendor.deleteMany({})
		await Sale.deleteMany({})
		await User.deleteMany({})
		await Deposit.deleteMany({})
		
		// Seed Vendors and Products
		let products = []
		for (let vendor of vendorSeeds) {
			let vendorDID = idgen.did()
			Vendor.create({
				vendorId: vendorDID,
				address: idgen.address(),
				keyBalance: 0
			})
			// Seed Products
			for (let product of productSeeds) {
				if (product.sid == vendor.sid) {
					products.push({
						sku: product.sku,
						vendorId: vendorDID,
						price: product.price
					})
				}
			}
		}
		config.products = products

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
