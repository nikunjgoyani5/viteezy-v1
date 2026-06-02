#!/bin/bash

: '
Copy mollie payment id to cancel in incorrect_payments like:
'tr_1'
'tr_2'
etc
'

declare -a incorrect_payments=(
)

for payment in "${incorrect_payments[@]}"
do
  echo "$payment"
  curl "https://api.mollie.com/v2/payments/$payment" -H "Authorization: Bearer live_9HNcAF2B6S4UyMrrBbR6eF6qmsNzFh"
  echo ""
done
