// routes/stoveRoutes.js

const express = require('express');
const router = express.Router();
const stoveController = require('../controllers/stoveController');

// Create a new stove
router.post('/', stoveController.createStove);

// Get all stoves
router.get('/', stoveController.getAllStoves);

// Get stoves by user ID
router.get('/:user_id', stoveController.getStovesByUser);

module.exports = router;
