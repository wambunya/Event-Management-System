// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const eventRoutes = require('./backend/routes/eventRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve the React build folder
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Database connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize('eventsmanagement', 'root', 'HalalJesus2024', {
  host: 'localhost',
  dialect: 'mysql',
  dialectModule: require('mysql2')
});

// Sync the database
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// API routes
app.use('/api/events', eventRoutes);

// Default Route
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

// Handle errors (optional, but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});