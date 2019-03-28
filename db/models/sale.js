'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saleSchema = new mongoose.Schema({

    price: Number,
    sku: String,
    vendorId: String,
    userId: String,
    turn: Number

}, { timestamps: true })

const sale = mongoose.model('sale', saleSchema)

module.exports = sale
