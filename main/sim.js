'use strict'

const jssim = require('js-simulator')
const python = require('../helpers/python')
const Sale = require('../db/models/sale')
const Vendor = require('../db/models/vendor')
const Deposit = require('../db/models/deposit')
const User = require('../db/models/user')

const products = require('../init/seeds/products')

function runSim(config) {
	return new Promise( async (resolve, reject) => {

		// User defined config from setup form
		const timeSet = config.time || 10
		const JOIN_RATE = config.joinRate || 25
		const DEPOSIT_RATE = config.joinRate || 0.2
		const REVOKE_RATE = config.revokeRate || 0.80
		const BUY_RATE = config.buyRate || 0.05
		const SK_DEPOSIT = parseInt(config.deposit) || 10000

		// Init CMC data
		let key = config.key.available_supply || 3000000000
		let keyPrice = config.key.price_usd || 0.003
		let eth = config.eth.available_supply || 100000000
		let ethPrice = config.eth.price_usd || 135.00

		// Track results within the simulator environment
		let skUsers = 0
		let skSales = 0
		let skRevenue = 0
		let skDeposits = 0
		let skCurrentDeposited = 0
		let skTotalDeposited = 0

		// Increment for time tracking / end sim
		let timesRun = 0

		// Set arrays of per increment data for use in the web UI charts and datatables
		// Time labels (simply 1,2,3 for now, as strings to be used in the chart data)
		let timeLabels = []

		// Per turn and cummulative data on users, sales, revenue and deposits
		let totalUsers = []
		let usersPerTurn = []
		let totalSales = []
		let salesPerTurn = []
		let totalRevenue = []
		let revenuePerTurn = []
		let totalDeposits = []
		let depositsPerTurn = []

		// Python test array
		let pythonTest = []


		// Define all the Agent models
		// User Agent
		let USER = function(address) {
			// Rank order of operations for each increment, users 1, exchange 2, vendor 3, affiliate 4
			let rank = 1
			jssim.SimEvent.call(this, rank)
			
			this.id = address
			//let user = User.findOne({userId: address})
			this.keyBalance = Math.random(50,10000) * 1000000
			this.keyTokenBuys = []
			this.keyTokenSells = []
			this.ethBalance = 0
			this.ethBuys = []
			this.ethSells = []
			this.mpSales = []
		}

		// Exchange Agent
		let EXCHANGE = function(address, exchangeId) {
			let rank = 2
			jssim.SimEvent.call(this, rank)

			// buy/sell KEY/ETH and KEY/BTC
		}

		// SelfKey Marketplace Vendor Agent
		let VENDOR = function(address, vendorId) {
			let rank = 3
			jssim.SimEvent.call(this, rank)

			let vendor = Vendor.findOne({vendorId: vendorId})
			this.id = address
			this.vendorId = vendorId
			this.keyBalance = vendor.keyBalance
			this.mpSales = 0
		}

		// Affiliate Agent
		let AFFILIATE = function(address, affiliateId) {
			let rank = 4
			jssim.SimEvent.call(this, rank)
			
			// gets split payment commissions
		}


		// Add the models to JS Sim
		USER.prototype = Object.create(jssim.SimEvent)
		EXCHANGE.prototype = Object.create(jssim.SimEvent)
		VENDOR.prototype = Object.create(jssim.SimEvent)
		AFFILIATE.prototype = Object.create(jssim.SimEvent)

		
		// Agent Logic to be executed on each time increment
		// User Agent Logic
		USER.prototype.update = async function(deltaTime) {
			
			let buy = Math.random()
			
			// Deposit KEY
			if (buy > (1 - DEPOSIT_RATE) && this.keyBalance > SK_DEPOSIT) {
				
				// Create Deposit object
				let depositObj = {
					deposit: SK_DEPOSIT,
					timelock: 30
				}
				
				// Update user KEY balance
				this.keyBalance = this.keyBalance - depositObj.deposit
				this.deposited = true
				this.deposit = SK_DEPOSIT
				this.depositTimelock = 30
				
				// Update SelfKey Staking Data
				skDeposits++
				skTotalDeposited = skTotalDeposited + depositObj.deposit

				// Save the deposit to the DB
				Deposit.create({
					deposit: this.deposit,
					userId: this.id,
					turn: this.time
				})
			}
			
			// Buy MP
			if (this.deposited === true && buy > (1 - BUY_RATE)) {
				console.log('HERE')
				
				// Create sale price

				let product = products[Math.floor(Math.random() * products.length)]
				let price = product.price / keyPrice

				// Update user KEY balance
				this.keyBalance = this.keyBalance - price
				await User.updateOne({address: this.id},{keyBalance: this.keyBalance})
				
				// Update vendor KEY balance
				let stateVendor = await Vendor.findOne({vendorId: product.vendorId})
				await Vendor.updateOne({vendorId: product.vendorId},{keyBalance: (stateVendor.keyBalance + price)})

				// Update SelfKey Sales and Revenue
				skSales++
				skRevenue = skRevenue + price

				// Save the sale to the DB
				Sale.create({
					price: product.price,
					sku: product.sku,
					vendorId: product.vendorId,
					turn: this.time
				})
				console.log('HERE2')
			}

			// de-increment timelock
			if (this.deposited === true && this.depositTimelock > 0) {
				this.depositTimelock = this.depositTimelock - 1
			}

			// Revoke Deposit
			if (this.deposited === true && this.depositTimelock === 0 && buy > (1 - REVOKE_RATE)) {
				skTotalDeposited = skTotalDeposited - this.deposit
				this.balance = this.balance + this.deposit
				this.deposit = 0
				this.deposited = false
				skDeposits = skDeposits - 1
			}
			console.log('WHY?')
			return
		}

		// Exchange Agent Logic
		EXCHANGE.prototype.update = async function(deltaTime) {
			
			return
		}

		// Vendor Agent Logic
		VENDOR.prototype.update = async function(deltaTime) {
			let sales = await Sale.find({vendorId: this.vendorId})
			let vendor = Vendor.findOne({vendorId: this.vendorId})
			this.keyBalance = vendor.keyBalance
			
			return
		}

		// Affiliate Agent Logic
		AFFILIATE.prototype.update = async function(deltaTime) {
			
			return
		}


		// Initiate the JS Sim scheduler that runs the increments and executes the agent logic
		let scheduler = new jssim.Scheduler()
		scheduler.reset()

		// Seed Agents into the JS Sim Scheduler (has already been added to DB via the init.js script if needed)

		// Seed User Agents
		// const userSeeds = require('../init/seeds/users')
		// for (let user of userSeeds) {
		//   let newUser = new USER(user.address)
		//   scheduler.scheduleRepeatingIn(newUser, 1)
		// }

		// Seed Vendor Agents
		const vendorSeeds = require('../init/seeds/vendors')
		for (let vendor of vendorSeeds) {
			let newVendor = new VENDOR(vendor.address, vendor.vendorId)
			scheduler.scheduleRepeatingIn(newVendor, 1)
		}
	
		// OK, all the pre-game stuff is now ready
		// Let us start the party!
		console.log('BEGIN SIM')
		
		let interval = setInterval( async () => { 
			
			// Setup increment tracking variables
			let stepUsers = 0
			let stepSales = 0
			let stepRevenue = 0
			let stepDeposits = 0

			// Track the increments
			console.log('.')
			timesRun++
			// Update the labels array for the UI Charts etc...
			timeLabels.push(timesRun.toString())
			
			// New Users join the network (download the wallet)
			// uses JOIN_RATE global constant for how many users joining per day
			for (let i = 0; i < 100; i++) {
				if ((Math.random()*100) > JOIN_RATE) {
					let address = Math.random()
					let user = new USER(address)
					scheduler.scheduleRepeatingIn(user, 1)
					skUsers++
					stepUsers++
					User.create({
						userId: address,
						address: address,
						keyBalance: 0,
						turn: timesRun
					})
				}
			}

			// Run the update function for all the Agents
			scheduler.update()

			// Get the sales total for the turn
			stepSales = await Sale.find({turn: scheduler.current_time})
			for (let sale of stepSales) {
				stepRevenue = stepRevenue + sale.price
			}

			// Get the deposit total for the turn
			let allDeposits = await Deposit.find({turn: scheduler.current_time})
			for (let deposit of allDeposits) {
				stepDeposits = stepDeposits + deposit.deposit
			}

			// Update cummulative data for charts
			totalUsers.push(skUsers)
			totalSales.push(skSales)
			totalRevenue.push(Math.round(skRevenue))
			totalDeposits.push(Math.round(skTotalDeposited))

			// Update increment data for charts
			usersPerTurn.push(stepUsers)
			salesPerTurn.push(stepSales.length)
			revenuePerTurn.push(Math.round(stepRevenue))
			depositsPerTurn.push(Math.round(stepDeposits))

			// Test Python integration
			let pythonData = await python(skUsers, './python/test.py')
			pythonTest.push(pythonData)

			// End the simulation run once the time config has run the steps
			if (timesRun  == timeSet) {
				console.log('NEVER?')
				// do one last stats update
				totalUsers.push(skUsers)
				totalSales.push(skSales)
				totalRevenue.push(skRevenue)
				totalDeposits.push(skTotalDeposited)
				usersPerTurn.push(stepUsers)
				salesPerTurn.push(stepSales.length)
				revenuePerTurn.push(Math.round(stepRevenue))
				depositsPerTurn.push(stepDeposits)

		    	// Build results object for web based UI and API response
		    	let results = {
					totalTime: scheduler.current_time,
		    		keyPrice,
		    		ethPrice,
					skUsers,
					skSales,
					skRevenue: Math.round(skRevenue).toLocaleString(),
					skDeposits,
					skTotalDeposited: skTotalDeposited.toLocaleString(),
					timeLabels,
					totalUsers,
					usersPerTurn,
					totalSales,
					salesPerTurn,
					totalRevenue,
					revenuePerTurn,
					totalDeposits,
					depositsPerTurn
		    	}

				// Output the final results to console
				console.log('END SIM')
		    	console.log('******************************')
				console.log("Elapsed Time: " + scheduler.current_time)
				console.log("Total Users: " + skUsers)
				console.log("Total Sales: " + skSales)
				console.log("Total Revenue: " + skRevenue)
				console.log("Total Stakes: " + skDeposits)
				console.log("Total Staked: " + skTotalDeposited)
				if (pythonTest.length) {
					console.log("Python Test: true")
				}

				// clear out the simulation data
		        clearInterval(interval)

		       	// return the results object to the sim controller 
		        resolve(results)
		    }

		}, 100)
	})
}

module.exports = runSim
