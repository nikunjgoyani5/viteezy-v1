#!/bin/bash

base_url=http://localhost:8080
#base_url=https://viteezy-frontend.unicornifylabs.com
#base_url=https://viteezy.nl

: '
Copy incorrect mollie payment id in incorrect_payments like:
'tr_1'
'tr_2'
etc
'

declare -a incorrect_payments=(
)

for mollie_payment_id in "${incorrect_payments[@]}"
do
  echo "$mollie_payment_id"
  curl -X POST "$base_url/viteezy/api/payment/callback" -d "id=$mollie_payment_id" -H "Content-Type: application/x-www-form-urlencoded"
  echo ""
done
