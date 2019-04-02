'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({

    userId: String,
    address: String,
    affiliateId: String,
    keyBalance: Number,
    usdBalance: Number,
    btcBalance: Number,
    ethBalance: Number,
    turn: Number

}, { timestamps: true })

const user = mongoose.model('user', userSchema)

module.exports = user