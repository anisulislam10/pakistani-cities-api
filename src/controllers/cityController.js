// src/controllers/cityController.js
const City = require('../models/City');

exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find().sort('name');
    res.json({
      success: true,
      count: cities.length,
      data: cities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.getCitiesByProvince = async (req, res) => {
  try {
    const cities = await City.find({ province: req.params.province }).sort('name');
    
    if (cities.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No cities found in this province'
      });
    }

    res.json({
      success: true,
      count: cities.length,
      province: req.params.province,
      data: cities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.searchCities = async (req, res) => {
  try {
    const { name, province, minPopulation, maxPopulation } = req.query;
    
    let query = {};
    
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    
    if (province) {
      query.province = province;
    }
    
    if (minPopulation || maxPopulation) {
      query.population = {};
      if (minPopulation) query.population.$gte = parseInt(minPopulation);
      if (maxPopulation) query.population.$lte = parseInt(maxPopulation);
    }

    const cities = await City.find(query).sort('name');
    
    res.json({
      success: true,
      count: cities.length,
      data: cities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.addCity = async (req, res) => {
  try {
    const city = await City.create(req.body);
    res.status(201).json({
      success: true,
      data: city
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'City already exists'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};