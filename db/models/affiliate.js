'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const affiliateSchema = new mongoose.Schema({

    userId: String,
    address: String,
    affiliateId: String,
    keyBalance: Number,
    usdBalance: Number,
    btcBalance: Number,
    ethBalance: Number,
    turn: Number

}, { timestamps: true })

const affiliate = mongoose.model('affiliate', affiliateSchema)

module.exports = affiliate
