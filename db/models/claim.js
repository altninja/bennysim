'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const claimSchema = new mongoose.Schema({

    deposit: Number,
    userId: String,
    issuerId: String,
    valid: Boolean,
    type: String,
    expiry: String,
    data: String

}, { timestamps: true })

const claim = mongoose.model('claim', claimSchema)

module.exports = claim
