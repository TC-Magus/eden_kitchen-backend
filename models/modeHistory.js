// models/modeHistory.js

const db = require('../config/db');

const ModeHistory = {
  create: (data, callback) => {
    const query = `
      INSERT INTO mode_history (stove_id, mode)
      VALUES (?, ?)
    `;
    const values = [data.stove_id, data.mode];
    db.query(query, values, callback);
  },

  getByStoveId: (stove_id, callback) => {
    const query = `
      SELECT * FROM mode_history
      WHERE stove_id = ?
      ORDER BY timestamp DESC
    `;
    db.query(query, [stove_id], callback);
  }
};

module.exports = ModeHistory;
