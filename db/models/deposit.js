'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const depositSchema = new mongoose.Schema({

    deposit: Number,
    userId: String,
    turn: Number

}, { timestamps: true })

const deposit = mongoose.model('deposit', depositSchema)

module.exports = deposit
