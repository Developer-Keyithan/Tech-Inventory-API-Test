const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const deviceRoutes = require('./Routes/deviceRoutes');
const userRoutes = require('./Routes/userRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const PORT = 3000;

const MONGO_URI = "mongodb+srv://sathyjaseelankeyithan:keyithanb2002.12@cluster0.78zte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.use('/api', deviceRoutes);
app.use('/api', userRoutes);
app.use('/api', orderRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});