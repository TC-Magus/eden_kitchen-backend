// controllers/stoveController.js

const Stove = require('../models/stove');

// Create a new stove
exports.createStove = (req, res) => {
  const { name, location, user_id } = req.body;

  if (!name || !user_id) {
    return res.status(400).json({ error: 'Stove name and user_id are required' });
  }

  Stove.create({ name, location, user_id }, (err, result) => {
    if (err) {
      console.error('Error creating stove:', err);
      return res.status(500).json({ error: 'Failed to create stove' });
    }
    res.status(201).json({ message: 'Stove created successfully' });
  });
};

// Get all stoves
exports.getAllStoves = (req, res) => {
  Stove.getAll((err, rows) => {
    if (err) {
      console.error('Error retrieving stoves:', err);
      return res.status(500).json({ error: 'Failed to fetch stoves' });
    }
    res.json(rows);
  });
};

// Get stoves by user ID
exports.getStovesByUser = (req, res) => {
  const { user_id } = req.params;

  Stove.getByUserId(user_id, (err, rows) => {
    if (err) {
      console.error('Error retrieving user’s stoves:', err);
      return res.status(500).json({ error: 'Failed to fetch stoves' });
    }
    res.json(rows);
  });
};
