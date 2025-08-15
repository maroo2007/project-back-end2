const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();


connectDB();

const app = express();


app.use(express.json());


app.get('/', (req, res) => {
  res.send('API is running...');
});


const medicineRoutes = require('./routes/medicineRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/medicines', medicineRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
