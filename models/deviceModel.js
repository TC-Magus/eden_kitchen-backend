const db = require('../config/db');

const Device = {
  create: (name, description) => {
    const query = 'INSERT INTO devices (name, description) VALUES (?, ?)';
    return db.promise().query(query, [name, description]);
  },

  getAll: () => {
    const query = 'SELECT * FROM devices';
    return db.promise().query(query);
  },

  getById: (id) => {
    const query = 'SELECT * FROM devices WHERE id = ?';
    return db.promise().query(query, [id]);
  },

  update: (id, name, description) => {
    const query = 'UPDATE devices SET name = ?, description = ? WHERE id = ?';
    return db.promise().query(query, [name, description, id]);
  },

  delete: (id) => {
    const query = 'DELETE FROM devices WHERE id = ?';
    return db.promise().query(query, [id]);
  },

  addUserToDevice: (userId, deviceId) => {
    const query = 'INSERT INTO user_devices (user_id, device_id) VALUES (?, ?)';
    return db.promise().query(query, [userId, deviceId]);
  },

  getUsersInDevice: (deviceId) => {
    const query = `
      SELECT users.id, users.username, users.email 
      FROM users 
      JOIN user_devices ON users.id = user_devices.user_id 
      WHERE user_devices.device_id = ?
    `;
    return db.promise().query(query, [deviceId]);
  },
};

module.exports = Device;