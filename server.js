const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://amiyahrichardson312:RP7Fgu5P4dVtkOqk@iscapstonedb.aoacdzs.mongodb.net/?retryWrites=true&w=majority&appName=ISCapstoneDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Define routes
app.use('/api', require('./routes/api'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

