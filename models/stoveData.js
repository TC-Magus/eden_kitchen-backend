// models/stoveData.js

const db = require('../config/db');

const StoveData = {
  create: (data, callback) => {
    const query = `
      INSERT INTO stove_data (stove_id, temperature, battery, gas_flow, timestamp)
      VALUES (?, ?, ?, ?, NOW())
    `;
    const values = [data.stove_id, data.temperature, data.battery, data.gas_flow];
    db.query(query, values, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM stove_data ORDER BY timestamp DESC';
    db.query(query, callback);
  },

  getByStoveId: (stove_id, callback) => {
    const query = 'SELECT * FROM stove_data WHERE stove_id = ? ORDER BY timestamp DESC';
    db.query(query, [stove_id], callback);
  }
};

module.exports = StoveData;
