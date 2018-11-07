// Import Mongoose ORM for MongoDB
const mongoose = require('mongoose');

// Let mongoose know that we want to use native promises
mongoose.Promise = global.Promise;

// Connect to local database
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';
mongoose.connect(dbURI);

module.exports = { mongoose };