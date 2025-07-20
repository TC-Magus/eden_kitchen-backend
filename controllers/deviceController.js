const Device = require('../models/deviceModel');

const createDevice = async (req, res) => {
  const { name, description } = req.body;
  try {
    await Device.create(name, description);
    res.status(201).json({ message: 'Device created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllDevices = async (req, res) => {
  try {
    const [devices] = await Device.getAll();

    const fakeModes = ['Solar', 'Biogas'];
    const fakeAlerts = ['Low Battery', 'Overheat', 'Offline', null];

    // Map each device to a simulated status object
    const simulatedDevices = devices.map(device => {
      return {
        ...device,
        mode: fakeModes[Math.floor(Math.random() * fakeModes.length)],
        battery_level: Math.floor(Math.random() * 51) + 50, // 50-100%
        temperature: (Math.random() * 100 + 50).toFixed(1), // 50°C - 150°C
        fuel_mode: fakeModes[Math.floor(Math.random() * fakeModes.length)],
        usage_chart: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        alerts: [fakeAlerts[Math.floor(Math.random() * fakeAlerts.length)]].filter(Boolean)
      };
    });

    res.json(simulatedDevices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getDeviceById = async (req, res) => {
  const deviceId = req.params.id;
  try {
    const [results] = await Device.getById(deviceId);
    if (results.length === 0) return res.status(404).json({ error: 'Device not found' });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDevice = async (req, res) => {
  const deviceId = req.params.id;
  const { name, description } = req.body;
  try {
    await Device.update(deviceId, name, description);
    res.json({ message: 'Device updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteDevice = async (req, res) => {
  const deviceId = req.params.id;
  try {
    await Device.delete(deviceId);
    res.json({ message: 'Device deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addUserToDevice = async (req, res) => {
  const { userId, deviceId } = req.body;
  try {
    await Device.addUserToDevice(userId, deviceId);
    res.status(201).json({ message: 'User added to device successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsersInDevice = async (req, res) => {
  const deviceId = req.params.id;
  try {
    const [results] = await Device.getUsersInDevice(deviceId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createDevice,
  getAllDevices,
  getDeviceById,
  updateDevice,
  deleteDevice,
  addUserToDevice,
  getUsersInDevice,
};