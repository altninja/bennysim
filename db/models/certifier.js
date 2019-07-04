'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const certifierSchema = new mongoose.Schema({

    userId: String,
    address: String,
    affiliateId: String,
    keyBalance: Number,
    usdBalance: Number,
    btcBalance: Number,
    ethBalance: Number,
    turn: Number

}, { timestamps: true })

const certifier = mongoose.model('certifier', certifierSchema)

module.exports = certifier
