const express = require('express');
const chapterController = require('../controllers/chapterController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/chapters', chapterController.getAllChapters);
router.get('/chapters/:id', chapterController.getChapterById);

// Protected routes (require authentication)
router.post('/chapters', authenticateToken, chapterController.createChapter);
router.put('/chapters/:id', authenticateToken, chapterController.updateChapter);
router.delete('/chapters/:id', authenticateToken, chapterController.deleteChapter);
router.post('/chapters/add-user', authenticateToken, chapterController.addUserToChapter);
router.get('/chapters/:id/users', authenticateToken, chapterController.getUsersInChapter);

module.exports = router;