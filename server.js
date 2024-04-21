const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const User = require('./models/User');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

mongoose.connect('mongodb+srv://amiyahrichardson312:RP7Fgu5P4dVtkOqk@iscapstonedb.aoacdzs.mongodb.net/?retryWrites=true&w=majority&appName=ISCapstoneDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

const userSchema = new mongoose.Schema({
  email: String,
  phone: String,
  firstName: String,
  lastName: String,
  street: String,
  aptUnit: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  cardNumber: String,
  expDate: String,
  cvv: String
});

app.post('/api/add-user', async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
    err.status = 400; // Set the status code for validation errors
  } else {
    err.status = 500; // Set the status code for other errors
  }
    next(err); 
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  console.error(err.message); // Log the error message
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
