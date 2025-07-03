const db = require('../config/db');

const Chapter = {
  create: (name, description) => {
    const query = 'INSERT INTO chapters (name, description) VALUES (?, ?)';
    return db.promise().query(query, [name, description]);
  },

  getAll: () => {
    const query = 'SELECT * FROM chapters';
    return db.promise().query(query);
  },

  getById: (id) => {
    const query = 'SELECT * FROM chapters WHERE id = ?';
    return db.promise().query(query, [id]);
  },

  update: (id, name, description) => {
    const query = 'UPDATE chapters SET name = ?, description = ? WHERE id = ?';
    return db.promise().query(query, [name, description, id]);
  },

  delete: (id) => {
    const query = 'DELETE FROM chapters WHERE id = ?';
    return db.promise().query(query, [id]);
  },

  addUserToChapter: (userId, chapterId) => {
    const query = 'INSERT INTO user_chapters (user_id, chapter_id) VALUES (?, ?)';
    return db.promise().query(query, [userId, chapterId]);
  },

  getUsersInChapter: (chapterId) => {
    const query = `
      SELECT users.id, users.username, users.email 
      FROM users 
      JOIN user_chapters ON users.id = user_chapters.user_id 
      WHERE user_chapters.chapter_id = ?
    `;
    return db.promise().query(query, [chapterId]);
  },
};

module.exports = Chapter;