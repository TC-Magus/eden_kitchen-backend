const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const stoveDataRoutes = require('./routes/stoveDataRoutes');
const modeHistoryRoutes = require('./routes/modeHistoryRoutes');
const stoveRoutes = require('./routes/stoveRoutes');
const serviceRequestRoutes = require('./routes/serviceRequestRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', deviceRoutes);
app.use('/api/stove-data', stoveDataRoutes);
app.use('/api/mode-history', modeHistoryRoutes);
app.use('/api/stoves', stoveRoutes);
app.use('/api/service-request', serviceRequestRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






