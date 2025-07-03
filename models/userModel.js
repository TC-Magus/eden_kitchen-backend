const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  create: async (username, password, email) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    return db.promise().query(query, [username, hashedPassword, email]);
  },

  findByUsername: (username) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    return db.promise().query(query, [username]);
  },

  getAll: () => {
    const query = 'SELECT id, username, email, created_at FROM users';
    return db.promise().query(query);
  },

  update: (id, username, email) => {
    const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
    return db.promise().query(query, [username, email, id]);
  },

  delete: (id) => {
    const query = 'DELETE FROM users WHERE id = ?';
    return db.promise().query(query, [id]);
  },
};

module.exports = User;