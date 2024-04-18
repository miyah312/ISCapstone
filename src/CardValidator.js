import React, { useState } from 'react';
import axios from 'axios';

const CardValidator = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCVV] = useState('');

  const handleValidation = () => {
    // Do your validation here
    // Convert the validation logic from Python to JavaScript
    // You may use regular expressions or any other validation technique

    // Example:
    const isValid = true; // Replace with your validation logic

    // Send a request to the API based on validation result
    if (isValid) {
      axios.get("https://run.mocky.io/v3/266bd809-da31-49a2-9e05-7a379d941741")
        .then(response => {
          console.log("Transaction Successful");
        })
        .catch(error => {
          console.error("Error:", error);
        });
    } else {
      axios.get("https://run.mocky.io/v3/ef002405-2fd7-4c62-87ee-42b0142cc588")
        .then(response => {
          console.log("Insufficient Funds on card ending in " + cardNumber.slice(-4));
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your card number"
        value={cardNumber}
        onChange={e => setCardNumber(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter CVV"
        value={cvv}
        onChange={e => setCVV(e.target.value)}
      />
      <br />
      <button onClick={handleValidation}>Validate Card</button>
    </div>
  );
};

export default CardValidator;
