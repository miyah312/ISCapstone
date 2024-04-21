import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Grid, Typography, Divider } from '@mui/material';
import isValidCard from './CardValidator';

axios.defaults.baseURL = 'http://localhost:5000';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    street: '',
    aptUnit: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardNumber: '',
    maskedCardNumber: '',
    expDate: '',
    cvv: '',
    maskedCvv:'',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate credit card
    if (!isValidCard(formData)) {
      console.error('Invalid credit card');
      return;
    }

    try {
      const response = await axios.post('/api/add-user', formData);
      console.log('YAY! Success:', response.data);
      // Handle success response
    } catch (error) {
      console.error('Oh no an error:', error);
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <Divider />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom>
          Shipping Address
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Street"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })} 
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Apt/Unit"
              value={formData.aptUnit}
              onChange={(e) => setFormData({ ...formData, aptUnit: e.target.value })} 
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })} 
              />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              required
              fullWidth
              label="ZIP"
              value={formData.zip}
              onChange={(e) => setFormData({ ...formData, zip: e.target.value })} // Update phone in formData
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })} // Update phone in formData
              />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom>
          Payment
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Card Number"
              value={formData.cardNumber} // Use maskedCardNumber
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })} // Update phone in formData
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Expiration Date"
              value={formData.expDate}
              onChange={(e) => setFormData({ ...formData, expDate: e.target.value })} // Update phone in formData
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="CVV"
              value={formData.cvv} // Use maskedCvv
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })} // Update phone in formData
              />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Checkout
        </Button>
        {successMessage && <Typography variant="body1" color="success">{successMessage}</Typography>}
        {errorMessage && <Typography variant="body1" color="error">{errorMessage}</Typography>}
      </form>
    </Container>
  );
};

export default CheckoutPage;