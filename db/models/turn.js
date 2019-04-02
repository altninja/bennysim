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
	timeLabels: Array,
	totalUsers: Array,
	usersPerTurn: Array,
	totalSales: Array,
	salesPerTurn: Array,
	totalRevenue: Array,
	revenuePerTurn: Array,
	totalDeposits: Array,
	depositsPerTurn: Array

}, { timestamps: true })

const turn = mongoose.model('turn', turnSchema)

module.exports = turn
