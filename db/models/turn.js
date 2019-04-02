'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const turnSchema = new mongoose.Schema({

	totalTime: Number,
	keyPrice: Number,
	ethPrice: Number,
	skUsers: Number,
	skSales: Number,
	skRevenue: Number,
	skDeposits: Number,
	skTotalDeposited: Number,
	timeLabels: Number,
	totalUsers: Number,
	usersPerTurn: Number,
	totalSales: Number,
	salesPerTurn: Number,
	totalRevenue: Number,
	revenuePerTurn: Number,
	totalDeposits: Number,
	depositsPerTurn: Number

}, { timestamps: true })

const turn = mongoose.model('turn', turnSchema)

module.exports = turn
