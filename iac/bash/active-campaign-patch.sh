#!/bin/bash

base_url=http://localhost:8080
#base_url=https://viteezy-frontend.unicornifylabs.com
#base_url=https://viteezy.nl

: '
Copy incorrect plan external reference in incorrect_payment_plans like:
'e1a6a0c5-5074-4886-ab5f-252da5c33ddc'
'7014ab0c-a24a-4fa6-beb9-98397041a866' 
etc
'

declare -a incorrect_payment_plans=(
)

for plan_external_reference in "${incorrect_payment_plans[@]}"
do
  echo "$plan_external_reference"
  curl -X PATCH "$base_url/viteezy/api/payment/active-campaign/$plan_external_reference"
  echo ""
done
