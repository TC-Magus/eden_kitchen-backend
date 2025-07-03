// routes/serviceRequestRoutes.js

const express = require('express');
const router = express.Router();
const serviceRequestController = require('../controllers/serviceRequestController');

// Create a new service request
router.post('/', serviceRequestController.createServiceRequest);

// Get all service requests (optional/admin view)
router.get('/', serviceRequestController.getAllRequests);

// Get service requests by user ID
router.get('/:user_id', serviceRequestController.getUserRequests);

module.exports = router;
