const form = document.getElementById("checkoutForm");
const messageDiv = document.getElementById("message");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  const cardNumber = document.getElementById("cardNumber").value;
  const securityCode = document.getElementById("securityCode").value;
  const zipCode = document.getElementById("zipCode").value;
  const expMonth = document.getElementById("expMonth").value;
  const expYear = document.getElementById("expYear").value;

  // Validate card details
  if (!validateCardNumber(cardNumber) ||
      !validateSecurityCode(securityCode) ||
      !validateZipCode(zipCode) ||
      !validateExpiry(expYear)) {
    messageDiv.innerText = "Invalid card details!";
    return;
  }

  const cardType = detectCardType(cardNumber); // Function to detect card type (optional)

  const url = chooseEndpoint(cardType); // Choose appropriate mock endpoint

  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      cardNumber,
      securityCode,
      zipCode,
      expMonth,
      expYear,
      // Add order amount here (e.g., 100)
      amount: 100
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.Success) {
      messageDiv.innerText = `Success! Order authorized. 
                              Authorization Token: ${data.AuthorizationToken}, 
                              Amount: ${data.AuthorizedAmount}, 
                              Expires: ${data.TokenExpirationDate}`;
    } else if (data.Reason === "Card Details incorrect or missing on Card Ending in XXXX") {
      messageDiv.innerText = "Invalid card details!";
    } else if (data.Reason === "Insufficient Funds on Card ending in XXXX") {
      messageDiv.innerText = "Insufficient Funds!";
    } else {
      messageDiv.innerText = "Authorization Failed!";
    }
  })
  .catch(error => {
    console.error("Error:", error);
    messageDiv.innerText = "An error occurred. Please try again later.";
  });
});

// Implement separate validation functions here (replace placeholders with actual logic)
function validateCardNumber(cardNumber) {
  // Validate card number based on card type (if implemented)
  return isValid;
}

function validateSecurityCode(securityCode) {
  // Validate security code length (usually 3 or 4 digits)
  return isValid;
}

function validateZipCode(zipCode) {
  // Validate zip code format (based on your region)
  return isValid;
}

function validateExpiry(expYear) {
  // Validate expiry date (e.g., not expired)
  return isValid;
}

// Optional function to detect card type (can use libraries like card-detector)
function detectCardType(cardNumber) {
  // Implement logic to detect card type using regular expressions or libraries
  return cardType;
}

// Function to choose appropriate mock endpoint based on card type (optional)
function chooseEndpoint(cardType) {
  let url;
  switch (cardType) {
    case "visa":
      url = "https://run.mocky.io/v3/266bd809-da31-49a2-9e05-7a379d941741"; // Success
      break;
    case "mastercard":
      url = "https://run.mocky.io/v3/266bd809-da31-49a2-9e05-7a379d941741"; // Success (replace with appropriate endpoint)
      break;
    default:
      url = "https://run.mocky.io/v3/023b1b8c-c9dd-40a5-a3bd-b21bcde402d4"; // Incorrect details
  }
  return url;
}
