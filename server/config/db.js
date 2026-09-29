const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Supports MongoDB Atlas connection string from .env
 * Falls back to local MongoDB if Atlas connection is not provided or fails
 */
const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai_resume_builder';
  
  try {
    console.log('[Database] Connecting to MongoDB...');
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 4000, // Timeout after 4 seconds instead of 30s
    });

    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[Database Notice] Could not connect to MongoDB at ${mongoURI}`);
    console.warn(`[Database Notice] Reason: ${error.message}`);
    console.warn('[Database Notice] To enable database persistence, please configure MONGODB_URI in server/.env with your MongoDB Atlas connection string.');
  }
};

module.exports = connectDB;
