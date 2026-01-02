# Pakistani Cities API & NPM Package

A comprehensive package to get cities of Pakistan by province with REST API and CLI.

## Features

- 📍 Get all cities of Pakistan
- 🏙️ Filter cities by province
- 🔍 Search cities by name
- 📊 Get city details including population
- 🚀 REST API with Express.js
- 💾 MongoDB support with Mongoose
- 🖥️ CLI interface
- 📦 NPM package

## Installation

### As NPM Package
```bash
npm install pakistani-cities-api



As API Server
bash
git clone https://github.com/anisulislam10/pakistani-cities-api.git
cd pakistani-cities-api
npm install
npm run seed  # Seed the database
npm start
Usage
As NPM Package
javascript
const pakistaniCities = require('pakistani-cities-api');

// Get all cities
const allCities = pakistaniCities.getAllCities();

// Get cities by province
const punjabCities = pakistaniCities.getCitiesByProvince('Punjab');

// Search cities
const searchResults = pakistaniCities.searchCityByName('islamabad');
CLI Usage
bash
# List all cities
pakistan-cities list

# List cities in a province
pakistan-cities list --province Sindh

# List all provinces
pakistan-cities provinces

# Search for a city
pakistan-cities search Lahore

# Interactive mode
pakistan-cities interactive
API Endpoints
GET / - API documentation

GET /api/cities - Get all cities

GET /api/cities/province/:province - Get cities by province

GET /api/provinces - Get all provinces

GET /api/cities/search?name=cityName - Search cities

POST /api/cities - Add new city (admin only)

Provinces Covered
Punjab

Sindh

Khyber Pakhtunkhwa

Balochistan

Gilgit-Baltistan

Azad Jammu & Kashmir

Islamabad Capital Territory