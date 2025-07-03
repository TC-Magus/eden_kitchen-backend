// models/serviceRequest.js

const db = require('../config/db');

const ServiceRequest = {
  create: (data, callback) => {
    const query = `
      INSERT INTO service_requests (stove_id, user_id, type, description)
      VALUES (?, ?, ?, ?)
    `;
    const values = [data.stove_id, data.user_id, data.type, data.description];
    db.query(query, values, callback);
  },

  getByUserId: (user_id, callback) => {
    const query = `
      SELECT * FROM service_requests
      WHERE user_id = ?
      ORDER BY requested_at DESC
    `;
    db.query(query, [user_id], callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM service_requests ORDER BY requested_at DESC';
    db.query(query, callback);
  }
};

module.exports = ServiceRequest;
