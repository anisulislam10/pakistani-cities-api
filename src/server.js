// src/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cityRoutes = require('./routes/cityRoutes');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', cityRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Pakistan Cities API',
    version: '1.0.0',
    endpoints: {
      getAllCities: '/api/cities',
      getCitiesByProvince: '/api/cities/province/:province',
      searchCities: '/api/cities/search',
      getAllProvinces: '/api/provinces',
      addCity: '/api/cities (POST)'
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}`);
});