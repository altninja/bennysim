'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({

    userId: String,
    keyBalance: Number,
    address: String,
    turn: Number

}, { timestamps: true })

const user = mongoose.model('user', userSchema)

module.exports = user