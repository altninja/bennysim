'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vendorSchema = new mongoose.Schema({

    vendorId: String,
    address: String,
    keyBalance: Number,
    usdBalance: Number,
    btcBalance: Number,
    ethBalance: Number

}, { timestamps: true })

const vendor = mongoose.model('vendor', vendorSchema)

module.exports = vendor