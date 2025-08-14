const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Home route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount routers
const medicineRoutes = require('./routes/medicineRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/medicines', medicineRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
