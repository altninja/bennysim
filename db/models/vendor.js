'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vendorSchema = new mongoose.Schema({

    vendorId: String,
    keyBalance: Number,
    address: String

}, { timestamps: true })

const vendor = mongoose.model('vendor', vendorSchema)

module.exports = vendor