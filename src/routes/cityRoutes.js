// src/routes/cityRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllCities,
  getCitiesByProvince,
  searchCities,
  addCity
} = require('../controllers/cityController');

router.get('/cities', getAllCities);
router.get('/cities/province/:province', getCitiesByProvince);
router.get('/cities/search', searchCities);
router.post('/cities', addCity);

// Get all provinces
router.get('/provinces', (req, res) => {
  const provinces = [
    'Punjab',
    'Sindh',
    'Khyber Pakhtunkhwa',
    'Balochistan',
    'Gilgit-Baltistan',
    'Azad Jammu & Kashmir',
    'Islamabad Capital Territory'
  ];
  res.json({
    success: true,
    count: provinces.length,
    data: provinces
  });
});

module.exports = router;