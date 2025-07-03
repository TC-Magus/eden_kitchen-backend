const express = require('express');
const router = express.Router();
const modeHistoryController = require('../controllers/modeHistoryController');

// POST: create new mode switch
router.post('/', modeHistoryController.createModeHistory);

// GET: retrieve history for a stove
router.get('/:stove_id', modeHistoryController.getModeHistoryByStove);

module.exports = router;
