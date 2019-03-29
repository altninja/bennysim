'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new mongoose.Schema({

    price: Number,
    sku: String,
    vendorId: String

}, { timestamps: true })

const product = mongoose.model('product', productSchema)

module.exports = product
