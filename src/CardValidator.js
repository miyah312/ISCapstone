import axios from 'axios';

const isValidCard = (formData) => {
    if (!formData || !formData.cardNumber) {
        console.error("Card number is undefined or null");
        return false;
    }

    let cardNumber = formData.cardNumber;

    // Remove spaces and dashes from card number
    cardNumber = cardNumber.replace(/[-\s]/g, '');

  // Validate CVV
  if (formData.cvv.length !== 3 && formData.cvv.length !== 4) {
    alert("Invalid CVV");
    return false;
  }

  // Validate Expiration Date
  const currentDate = new Date();
  const expDate = new Date(formData.expDate);
  if (expDate < currentDate) {
    alert("Card is expired");
    return false;
  }

  // Mask the credit card number
  const maskedCardNumber = "XXXX-XXXX-XXXX-" + cardNumber.slice(-4);
  console.log(maskedCardNumber);

  // Determine the type of credit card
  let cardType;
  if (cardNumber.startsWith("34") || cardNumber.startsWith("37")) {
    cardType = "American Express";
  } else if (cardNumber.startsWith("51") || cardNumber.startsWith("52") || cardNumber.startsWith("53") || cardNumber.startsWith("54") || cardNumber.startsWith("55")) {
    cardType = "MasterCard";
  } else if (cardNumber.startsWith("4")) {
    cardType = "Visa";
  }

  console.log(cardType);

  // Call the mock endpoint based on card type
  const endpoint = "https://run.mocky.io/v3/";
  const mockEndpoint = cardType ? "266bd809-da31-49a2-9e05-7a379d941741" : "023b1b8c-c9dd-40a5-a3bd-b21bcde402d4";
  axios.get(endpoint + mockEndpoint)
    .then(response => {
      console.log("Transaction Successful");
      // Display success message
    })
    .catch(error => {
      console.error("Error:", error);
      // Display failure message
    });

  return true;
};

export default isValidCard;

// Test cases
isValidCard("5555555555554444", "123"); // MasterCard (Valid)
isValidCard("3782822463100055", "456"); // American Express (Invalid)
isValidCard("6011111111111117", "789"); // Valid but unsupported
isValidCard("4012888888881881", "246"); // Invalid
isValidCard("4222222222222", "890");    // Visa (Valid)
