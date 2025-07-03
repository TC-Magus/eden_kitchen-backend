// controllers/modeHistoryController.js

const ModeHistory = require('../models/modeHistory');

// Log a new mode switch
exports.createModeHistory = (req, res) => {
  const { stove_id, mode } = req.body;

  // Validate input
  if (!stove_id || !mode || !['solar', 'biogas'].includes(mode.toLowerCase())) {
    return res.status(400).json({ error: 'Invalid stove_id or mode (must be "solar" or "biogas")' });
  }

  ModeHistory.create({ stove_id, mode: mode.toLowerCase() }, (err, result) => {
    if (err) {
      console.error('Error creating mode history:', err);
      return res.status(500).json({ error: 'Failed to save mode history' });
    }
    res.status(201).json({ message: 'Mode switch recorded successfully' });
  });
};

// Fetch all mode switches for a stove
exports.getModeHistoryByStove = (req, res) => {
  const { stove_id } = req.params;

  ModeHistory.getByStoveId(stove_id, (err, rows) => {
    if (err) {
      console.error('Error fetching mode history:', err);
      return res.status(500).json({ error: 'Failed to retrieve mode history' });
    }
    res.json(rows);
  });
};
