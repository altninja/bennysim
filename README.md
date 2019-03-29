# SelfKey Network Simulation Tool

## Overview

In order to build a robust and intelligently designed network, we will create a simulation infrastructure using agent based modeling, real world data and machine learning.  We can build small and large scale experiments using parts or all network components with as flexible configuration as possible in regards to agents enabled and granularity of flow tracking.  

## Infrastructure

### Tools

JS Simulator Library is used to manage the scheduler and agent interactions.  It's been modified to be used server side in a NodeJS application as opposed to in the browser as the original implementation.  This allows the benefit of being able to leverage server side libraries. 
https://github.com/chen0040/js-simulator

It is integrated with MongoDB using the Mongoose libarary.  
https://github.com/Automattic/mongoose

It is running in an Express app and can be accessed via both a web based UI and from an API endpoint.
https://github.com/expressjs/express

The web based UI is created using Pug as a templating system.  Uses Chart.js and jQuery DataTables to manage visual data representations.
https://github.com/pugjs/pug
https://github.com/chartjs/Chart.js
https://github.com/DataTables/DataTables

Uses a Python Shell wrapper to allow access to the vast number of AI and Machine Learning libraries written in Python while still enjoying NodeJS as the primary runtime environment.
https://github.com/extrabacon/python-shell

### Data Sources

Coin Market Cap API
https://api.coinmarketcap.com

Binance API
https://api.binance.com


## How it works?

### Agent Based Modelling


### User Agent

can...
buy eth from an exchange
buy key from an exchange
sell eth to an exchange
sell key to an exchange
purchase multiple items from a vendor
deposit key to a staking contract
revoke key from a staking contract

### Exchange Agent


### Vendor Agent


### Affiliate Agent

### Payment Model

### Claim Model


## Installation

Install NodeJS
Install MongoDB
Install Python3
Git Clone
`npm i`
`npm run dev`


## Usage


## Development


## Resources

## TDL

// INIT TDL
// Improved Seed Users
// - Scrape all KEY token holders

// Improved Seed Vendors
// - Flag Theory
// - Crypto Exchanges
// - Other Vendors

// Improved Seed Products (More accurate data)
// - Incorporations
// - Bank Accounts
// - Notaries
// - Translations
// - Accountants

// Improved Seed Exchange
// - Format exchange order book and seed DB for Agents to execute realistic orders

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).

## License
SelfKey Simulator    
Copyright © 2018 SelfKey Foundation [https://selfkey.org/](https://selfkey.org/)

[The GPL-3.0 License](http://opensource.org/licenses/GPL-3.0)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
