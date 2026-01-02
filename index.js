// index.js - Main package entry point
const citiesData = require('./src/data/citiesData');

class PakistaniCities {
  constructor() {
    this.cities = citiesData;
  }

  // Get all cities
  getAllCities() {
    return this.cities;
  }

  // Get cities by province
  getCitiesByProvince(province) {
    const provinceLower = province.toLowerCase();
    return this.cities.filter(city => 
      city.province.toLowerCase() === provinceLower
    );
  }

  // Get all provinces
  getProvinces() {
    const provinces = new Set(this.cities.map(city => city.province));
    return Array.from(provinces);
  }

  // Search cities by name
  searchCityByName(name) {
    const nameLower = name.toLowerCase();
    return this.cities.filter(city => 
      city.name.toLowerCase().includes(nameLower)
    );
  }

  // Get city by exact name
  getCityByName(name) {
    const nameLower = name.toLowerCase();
    return this.cities.find(city => 
      city.name.toLowerCase() === nameLower
    );
  }
}

module.exports = new PakistaniCities();
module.exports.PakistaniCities = PakistaniCities;