const Chapter = require('../models/chapterModel');

const createChapter = async (req, res) => {
  const { name, description } = req.body;
  try {
    await Chapter.create(name, description);
    res.status(201).json({ message: 'Chapter created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllChapters = async (req, res) => {
  try {
    const [results] = await Chapter.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getChapterById = async (req, res) => {
  const chapterId = req.params.id;
  try {
    const [results] = await Chapter.getById(chapterId);
    if (results.length === 0) return res.status(404).json({ error: 'Chapter not found' });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateChapter = async (req, res) => {
  const chapterId = req.params.id;
  const { name, description } = req.body;
  try {
    await Chapter.update(chapterId, name, description);
    res.json({ message: 'Chapter updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteChapter = async (req, res) => {
  const chapterId = req.params.id;
  try {
    await Chapter.delete(chapterId);
    res.json({ message: 'Chapter deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addUserToChapter = async (req, res) => {
  const { userId, chapterId } = req.body;
  try {
    await Chapter.addUserToChapter(userId, chapterId);
    res.status(201).json({ message: 'User added to chapter successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsersInChapter = async (req, res) => {
  const chapterId = req.params.id;
  try {
    const [results] = await Chapter.getUsersInChapter(chapterId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createChapter,
  getAllChapters,
  getChapterById,
  updateChapter,
  deleteChapter,
  addUserToChapter,
  getUsersInChapter,
};