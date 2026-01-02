// src/seedDatabase.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const City = require('./models/City');
const citiesData = require('./data/citiesData');
const path = require('path');

// Debug: Show current directory and env file path
console.log('Current directory:', __dirname);
console.log('Project root:', path.resolve(__dirname, '..'));
console.log('Looking for .env file at:', path.resolve(__dirname, '..', '.env'));

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

// Debug: Show what MONGODB_URI is
console.log('MONGODB_URI from env:', process.env.MONGODB_URI);

// If no MONGODB_URI found, provide default
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pakistan_cities';
console.log('Using MongoDB URI:', mongoURI);

const seedDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB Connected');
    
    // Clear existing data
    await City.deleteMany({});
    console.log('🗑️  Cleared existing cities');
    
    // Insert new data
    console.log(`📊 Inserting ${citiesData.length} cities...`);
    await City.insertMany(citiesData);
    
    console.log('✅ Database seeded successfully!');
    
    // Count and show stats
    const totalCities = await City.countDocuments();
    console.log(`Total cities in database: ${totalCities}`);
    
    // Show provinces count
    const provinces = await City.aggregate([
      { $group: { _id: "$province", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\n📈 Cities by Province:');
    provinces.forEach(province => {
      console.log(`   ${province._id}: ${province.count} cities`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    
    if (error.message.includes('connect')) {
      console.log('\n💡 MongoDB Connection Issue:');
      console.log('1. Make sure MongoDB is running');
      console.log('2. Try: mongod --version');
      console.log('3. Start MongoDB service');
      console.log('\nOR use Docker:');
      console.log('   docker run -d -p 27017:27017 --name mongodb mongo:latest');
    }
    
    process.exit(1);
  }
};

seedDatabase();