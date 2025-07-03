// routes/stoveDataRoutes.js

const express = require('express');
const router = express.Router();
const stoveDataController = require('../controllers/stoveDataController');

// Route: POST new stove data
router.post('/', stoveDataController.createStoveData);

// Route: GET all stove data
router.get('/', stoveDataController.getAllStoveData);

// Route: GET stove data by stove ID
router.get('/:stove_id', stoveDataController.getStoveDataById);

module.exports = router;
