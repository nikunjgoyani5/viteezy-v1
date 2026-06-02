#!/bin/bash

base_url=http://localhost:8080
#base_url=https://viteezy-frontend.unicornifylabs.com
#base_url=https://viteezy.nl

: '
Copy ACTIVE payment plans external reference in active_payment_plans like:
'e1a6a0c5-5074-4886-ab5f-252da5c33ddc'
'7014ab0c-a24a-4fa6-beb9-98397041a866' 
etc
'

declare -a active_payment_plans=(
)

for external_reference in "${active_payment_plans[@]}"
do
  echo "$external_reference"
  curl -X DELETE "$base_url/viteezy/api/payment/plan/$external_reference" -H "Content-Type: application/json" -d '{"stopReason": "Mollie subscription migration"}'
  echo ""
done
