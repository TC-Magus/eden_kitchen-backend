// models/stove.js

const db = require('../config/db');

const Stove = {
  create: (data, callback) => {
    const query = `
      INSERT INTO stoves (name, location, user_id)
      VALUES (?, ?, ?)
    `;
    const values = [data.name, data.location, data.user_id];
    db.query(query, values, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM stoves ORDER BY created_at DESC';
    db.query(query, callback);
  },

  getByUserId: (user_id, callback) => {
    const query = 'SELECT * FROM stoves WHERE user_id = ? ORDER BY created_at DESC';
    db.query(query, [user_id], callback);
  }
};

module.exports = Stove;
