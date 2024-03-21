#Check if the card is valid
odd_digit_sum = 0
even_digit_sum = 0
total=0
expiration_date = 12/22

card_number =input("Enter your card number: ")
card_number = card_number.replace("-", "")
card_number = card_number.replace(" ", "")
card_number=card_number[0:]

'''expire_date = input("Enter expiration date: ")
if expiration_date > 12/22:
    print("Card is expired")
else:
    print("Valid")'''

#Mask the credit card number        
def mask_credit_card(card_number):
    return "XXXXXXXXXXXX" + card_number[-4:]
print(mask_credit_card(card_number))    


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
