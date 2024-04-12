const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Import the route handler
const apiRouter = require('./routes/api');

// Define middleware to parse JSON requests
app.use(express.json());

// Use the route handler
app.use('/api', apiRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

  