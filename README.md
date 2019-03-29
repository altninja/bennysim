# SelfKey Network Simulation Tool

## Overview

In order to build a robust and intelligently designed network, SelfKey R&D has been tasked with creating a simulation environment to perform data experiments and attempt to find solutions to hypothesis.  By using a combination of Agent Based Modeling, real world data and machine learning we can build small and large scale experiments using parts or all network components with as flexible configuration as possible in regards to agents enabled and granularity of flow tracking.  

### What is the purpose of the simulation?

There are 3 main reasons for the development and use of the SelfKey Token Economic Model Simulation tool:

* To Predict how the SelfKey Network will Impact the Supply, Distribution and Price of the KEY Token
* To Examine the Relationships and Interactions between the SelfKey Network participants including Users, Marketplace Vendors and Exchanges
* To Assist in the Development of the SelfKey Network by implementing roadmap Component Features and looking for Design Issues

### What areas of research are within the scope of this project?
* Agent Based Modelling
* Computational Economics
* Cryptoeconomics
* General Economic Theory
* Game Theory
* Simulation Tools and Infrastructure
* Cryptoeconomic and Cryptoutility projects
* Machine Learning
* Technical Chart Analysis
* Data Analytics (Predictive and Retrospective)

### What tools are being used to build the simulator?

JS Simulator Library is used to manage the scheduler and agent interactions.  It's been modified to be used server side in a NodeJS application as opposed to in the browser as the original implementation.  This allows the benefit of being able to leverage server side libraries. 

* https://github.com/chen0040/js-simulator

It is integrated with MongoDB using the Mongoose libarary.  

* https://github.com/Automattic/mongoose

It is running in an Express app and can be accessed via both a web based UI and from an API endpoint.

* https://github.com/expressjs/express

The web based UI is created using Pug as a templating system.  Uses Chart.js and jQuery DataTables to manage visual data representations.

* https://github.com/pugjs/pug
* https://github.com/chartjs/Chart.js
* https://github.com/DataTables/DataTables

Uses a Python Shell wrapper to allow access to the vast number of AI and Machine Learning libraries written in Python while still enjoying NodeJS as the primary runtime environment.

* https://github.com/extrabacon/python-shell

### Data Sources

Coin Market Cap API

* https://api.coinmarketcap.com

Binance API

* https://api.binance.com


## How is the simulator designed?

* The SelfKey Simulator is built on principles and infrastructure for Agent Based Modelling and Computational Economic simulation
* It takes into account Cryptoeconomic data and general economic theory
* Agents are the actors in the simulation, in our case the different participants on the SelfKey network
* Agents have data models that use a mix of state variables and persistent data
* Agents have unique logic for how they will behave during the simulation
* Agent logic is executed each time increment
* All Agents are added to a simulation scheduler
* The scheduler runs all agent logic for each time increment
* The simulation runs a specific amount of time increments for each simulation run with each time increment representing a 24 hour day
* The simulation uses a variety of global variables for network configuration as well as conversion and growth rates

## What can the simulator do right now?

### Init, Configuration and Access
* The init process performs several actions to prepare the simulation run
* Clears out the DB of all data from the previous simulation run
* Parses Seed data from JSON files and populates the DB
* Gets external API data then parses and formats it in preparation for the simulation
* The simulation accepts custom configuration options to override the defaults on some of the global variables used by the simulation
* The simulation can be accessed using one of two methods: 
* via the web based UI setup and configuration view, which includes a form for modifying the default config options OR 
* by sending a POST request to a provided API endpoint with your configuration options passed in the request body

### Main Simulation
* Defines Agent Models for Users, Vendors, Exchanges and Affiliates
* Seeds Agents and adds Agent objects to the simulation scheduler
* Defines all Agent logic to be run during the time increments
* Manages global variables and state variables for each Agent object
* Manages persistent data via MongoDB calls
* Integrates with Python Shell to run native Python scripts and libraries within the context of the NodeJS environment - accepts and returns JSON data
* Consumes 3rd party API data from CMC and Binance
* Runs the simulation for a set number of intervals
* Creates cryptographically generated mock DID’s and Eth Addresses (UUIDV4 + Convert to Hex / MD5 Hash)
* Adds new users each time increment based on dynamic growth rate
* Executes Agent logic each interval including KEY Deposit to access the network and Marketplace purchases of multiple product types and vendors
* Manages turn by turn simulation results, both global and agent specific
* Manages and prepares data to be consumed in charts and tables in the results dashboard or API response object
* Handles all errors beautifully and has comprehensive test coverage

### Simulation Results
* Displays a dashboard UI including at a glance final stats from the simulation
* Data visualization using charts to show turn by turn and cumulative data
* DataTables are used to display granular data
* If you are using it via the API endpoint, the results will be returned in JSON format in the response object


## Installation

* Install NodeJS
* Install MongoDB
* Install Python3
* Git Clone
* `npm i`

## Usage

`npm run dev`

## TDL

### Improved Agent Models
* Maintain Agent Balances for USD / KEY / ETH / BTC
* Match Seeded Users w/ Blockchain Token Holders

### Improved Agent Logic
* Add new logic to support Agent Model and Data improvements

### TA Lib Integration
* Parse Binance API Data
* Pass through TA Lib
* Use TA Lib to influence User Agent logic

### AI/ML Lib Integration
* Pass data to Python Libs for Reinforcement Learning and Genetic Algos
* Use returned data to influence User Agent logic
* More and Better Data
* Blockchain Scrapes
* Improved Seed Data
* Improved Data Models
* Improved Default Rates

### Add New Network Components
* DID Registration
* Certifiers Marketplace
* Reputation and Arbitration
* More 3rd Party Agents
* Stablecoin integration for Escrow

```
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

Priority 2 - Affiliate Sim
- [ ] User and affiliate agents the same just change status?
- [ ] 0.5% chance a user joins the affiliate program each turn
- [ ] Affiliates add an additional 1-3 new users each increment and are associated by ID (user growth)
- [ ] New users from affiliates have a higher chance of making a sale (increase sales)
- [ ] Those users will split commissions to the affiliate 
- [ ] Make sure funds are transferred to/from wallet balances
- [ ] Affiliate commissions in escrow

Priority 3 - Fluctuations and Growth Rate Curves
- [ ] KEY token fluctuation
- [ ] Sales conversions curve
- [ ] User signup curve


Priority 4 - Improvements / Nice To Have
- [ ] KEY as an agent model
- [ ] ESCROW and DEPOSIT as agent models?
- [ ] Split main sim file into smaller files
- [ ] Find useful Python libs to integrate
- [ ] Toggle deposit requirement for sales
```

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
