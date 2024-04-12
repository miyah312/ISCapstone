const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model

// Define route to add a new user
router.post('/add-user', async (req, res) => {
    try {
        const newUser = new User(req.body); // Create a new user object
        await newUser.save(); // Save the user to the database
        res.status(201).json(newUser); // Respond with the newly created user
    } catch (err) {
        res.status(400).json({ message: err.message }); // Handle any errors
    }
});

module.exports = router;

