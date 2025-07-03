// controllers/stoveDataController.js

const StoveData = require('../models/stoveData');

// Create a new sensor data record
exports.createStoveData = (req, res) => {
  const { stove_id, temperature, battery, gas_flow } = req.body;

  // Input validation
  if (!stove_id || temperature === undefined || battery === undefined || !gas_flow) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  StoveData.create({ stove_id, temperature, battery, gas_flow }, (err, result) => {
    if (err) {
      console.error('Error saving stove data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Stove data recorded successfully' });
  });
};

// Get all stove data
exports.getAllStoveData = (req, res) => {
  StoveData.getAll((err, rows) => {
    if (err) {
      console.error('Error retrieving stove data:', err);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
    res.json(rows);
  });
};

// Get data for a specific stove
exports.getStoveDataById = (req, res) => {
  const { stove_id } = req.params;

  StoveData.getByStoveId(stove_id, (err, rows) => {
    if (err) {
      console.error('Error retrieving stove data by ID:', err);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
    res.json(rows);
  });
};
