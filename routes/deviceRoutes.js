const express = require('express');
const deviceController = require('../controllers/deviceController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/devices', deviceController.getAllDevices);
router.get('/devices/:id', deviceController.getDeviceById);

// Protected routes (require authentication)
router.post('/devices', authenticateToken, deviceController.createDevice);
router.put('/devices/:id', authenticateToken, deviceController.updateDevice);
router.delete('/devices/:id', authenticateToken, deviceController.deleteDevice);
router.post('/devices/add-user', authenticateToken, deviceController.addUserToDevice);
router.get('/devices/:id/users', authenticateToken, deviceController.getUsersInDevice);

module.exports = router;