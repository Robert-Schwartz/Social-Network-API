// Required Dependencies
// =================================
const express = require('express');
const mongoose = require('mongoose');

// Begin Express Server
// =================================
const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware
// =================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

// Connect to Mongo DB
// =================================
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Social-Network-API', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// connect to routes after connected to DB
// =================================
app.use(require('./routes'));

// Log Mongo queries being executed
// =================================
mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);

// Listen for port
// =================================
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));