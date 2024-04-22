import axios from 'axios';

const isValidCard = (formData) => {
    return new Promise((resolve, reject) => {
        if (!formData || !formData.cardNumber) {
            console.error("Card number is undefined or null");
            reject(false); // Reject the promise indicating failure
            return;
        }

        let cardNumber = formData.cardNumber;

        // Remove spaces and dashes from card number
        cardNumber = cardNumber.replace(/[-\s]/g, '');

        // Validate CVV
        if (formData.cvv.length !== 3 && formData.cvv.length !== 4) {
            alert("Invalid CVV");
            reject(false); // Reject the promise indicating failure
            return;
        }

        // Validate Expiration Date
        const currentDate = new Date();
        const expDate = new Date(formData.expDate);
        if (expDate < currentDate) {
            alert("Card is expired");
            reject(false); // Reject the promise indicating failure
            return;
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

        console.log("Card Type:", cardType);

        // Call the mock endpoint based on card type
        let mockEndpoint;
        if (cardType === "MasterCard") {
            mockEndpoint = "https://run.mocky.io/v3/266bd809-da31-49a2-9e05-7a379d941741"; // Success
        } else if (cardType === "American Express") {
            mockEndpoint = "https://run.mocky.io/v3/ef002405-2fd7-4c62-87ee-42b0142cc588"; // Insufficient Funds
        } else {
            mockEndpoint = "https://run.mocky.io/v3/8c9c6c97-603f-4ff4-8191-9942915924f6"; // Incorrect/Missing Card
        }

        axios.get(mockEndpoint)
            .then(response => {
                console.log("Transaction Successful");
                resolve(true); // Resolve the promise indicating success
            })
            .catch(error => {
                console.error("Error:", error);
                reject(false); // Reject the promise indicating failure
            });
    });
};

export default isValidCard;


// Test cases
isValidCard({ cardNumber: "5555555555554444", cvv: "123", expDate: "2025-12-01" }); // MasterCard (Valid)
isValidCard({ cardNumber: "3782822463100055", cvv: "456", expDate: "2025-12-01" }); // American Express (Invalid)
isValidCard({ cardNumber: "6011111111111117", cvv: "789", expDate: "2025-12-01" }); // Valid but unsupported
isValidCard({ cardNumber: "4012888888881881", cvv: "246", expDate: "2025-12-01" }); // Invalid
isValidCard({ cardNumber: "4222222222222", cvv: "890", expDate: "2025-12-01" });    // Visa (Valid)
