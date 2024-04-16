import requests

#Check if the card is valid
odd_digit_sum = 0
even_digit_sum = 0
total=0
expiration_date = 12/22

card_number =input("Enter your card number: ")
card_number = card_number.replace("-", "")
card_number = card_number.replace(" ", "")
card_number=card_number[0:]

#Check CVV of card
cvv = input("Enter CVV: ")
if len(cvv) == 3 or len(cvv) == 4:
    print(" ")
else:
    print("Invalid CVV")

#Check expiration date of card
expire_date = input("Enter expiration date: ")
if expire_date > "01/25":
    print(" ")
else:
    print("Invalid expiration date")

#Mask the credit card number        
def mask_credit_card(card_number):
    return "XXXXXXXXXXXX" + card_number[-4:]
print(mask_credit_card(card_number))    

#Check if the card is valid
for x in card_number[::2]:
    odd_digit_sum += int(x)

for x in card_number[1::2]:
    x = int(x) * 2
    if x >= 10:
        even_digit_sum += (1+(x%10))
    else:
        even_digit_sum += x

total = odd_digit_sum + even_digit_sum

if total % 10 == 0:
    print("Valid")
else:
    print("Invalid")

#Determine the type of credit card
if card_number[0] == "3" and card_number[1] == "4" or card_number[1] == "7":
    print("American Express")
elif card_number[0] == "5" or card_number[0] == "2":
    print("MasterCard")
elif card_number[0] == "4":
    print("Visa")

#Send a request to the API
if card_number == (card_number[0] == "3" and card_number[1] == "4" or card_number[1] == "7") or (card_number[0] == "5" or card_number[0] == "2") or card_number[0] == "4": 
#if card_number == "Valid":
    requests.get("https://run.mocky.io/v3/266bd809-da31-49a2-9e05-7a379d941741")
    print("Transaction Successful")
#elif card_number != (card_number[0] == "3" and card_number[1] == "4" or card_number[1] == "7") or (card_number[0] == "5" or card_number[0] == "2") or card_number[0] == "4" or total % 10 != 0:
elif card_number == "Invalid" or total % 10 != 0:
    requests.get("https://run.mocky.io/v3/ef002405-2fd7-4c62-87ee-42b0142cc588")
    print("Insufficient Funds on card ending in " + card_number[-4:])
elif card_number != "American Express" or card_number != "MasterCard" or card_number != "Visa" or cvv != len(cvv) == 3 or len(cvv) == 4 or expire_date < "12/25" or total % 10 != 0:
#elif total % 10 != 0 or card_number[0] != "3" and card_number[1] != "4" or card_number[1] != "7" or card_number[0] != "5" or card_number[0] != "2" or card_number[0] != "4":
#elif card_number == total % 10 != 0: 
#else:
    requests.get("https://run.mocky.io/v3/023b1b8c-c9dd-40a5-a3bd-b21bcde402d4")
    print("Card Details incorrect or missing on Card Ending in " + card_number[-4:])

   
	
#Test Cases
'''
5555555555554444 (This card is successful and is valid use CVV 123 - Mastercard)*
3782822463100055 (This card is invalid but has insufficient funds use CVV 2343 - AMEX)*
6011111111111117 (This card is valid but is not supported use CVV 345 - )*
4222222222222 (This card is valid use CVV 345 - VISA)*
