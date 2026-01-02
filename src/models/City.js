// src/models/City.js
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  province: {
    type: String,
    required: true,
    enum: ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan', 'Azad Jammu & Kashmir', 'Islamabad Capital Territory']
  },
  population: {
    type: Number,
    required: true
  },
  capital: {
    type: Boolean,
    default: false
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  area: String,
  established: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('City', citySchema);