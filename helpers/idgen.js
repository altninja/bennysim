'use strict'

const uuid = require('uuid/v4')
const hexId = require('uuid-to-hex')
const crypto = require('crypto')


function address() {
	return '0x' + hexId(uuid())
}

function did() {
	let newAddress = address()
	let hash = crypto.createHash('md5').update(newAddress.toString()).digest('hex')
	return 'did:key:' + hash
}

module.exports = {
	address,
	did
}

