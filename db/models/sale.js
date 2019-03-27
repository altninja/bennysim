'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saleSchema = new mongoose.Schema({

    price: String,
    sku: String,
    vendorId: String

}, { timestamps: true })

const sale = mongoose.model('sale', saleSchema)

module.exports = sale
