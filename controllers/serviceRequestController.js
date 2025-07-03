// controllers/serviceRequestController.js

const ServiceRequest = require('../models/serviceRequest');

// Create a new service request
exports.createServiceRequest = (req, res) => {
  const { stove_id, user_id, type, description } = req.body;

  if (!stove_id || !user_id || !type) {
    return res.status(400).json({ error: 'stove_id, user_id, and type are required' });
  }

  ServiceRequest.create({ stove_id, user_id, type, description }, (err, result) => {
    if (err) {
      console.error('Error creating service request:', err);
      return res.status(500).json({ error: 'Failed to submit service request' });
    }
    res.status(201).json({ message: 'Service request submitted successfully' });
  });
};

// Get service requests by user ID
exports.getUserRequests = (req, res) => {
  const { user_id } = req.params;

  ServiceRequest.getByUserId(user_id, (err, rows) => {
    if (err) {
      console.error('Error retrieving user requests:', err);
      return res.status(500).json({ error: 'Failed to fetch user service requests' });
    }
    res.json(rows);
  });
};

// Optional: Get all service requests (admin view)
exports.getAllRequests = (req, res) => {
  ServiceRequest.getAll((err, rows) => {
    if (err) {
      console.error('Error retrieving all service requests:', err);
      return res.status(500).json({ error: 'Failed to fetch service requests' });
    }
    res.json(rows);
  });
};
