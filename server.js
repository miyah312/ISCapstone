const express = require('express');
const cors = require('cors'); // Import cors middleware
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const User = require('./models/User');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));


// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://amiyahrichardson312:RP7Fgu5P4dVtkOqk@iscapstonedb.aoacdzs.mongodb.net/?retryWrites=true&w=majority&appName=ISCapstoneDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Define User schema and model
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

//Submission form
app.post('/api/add-user', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
