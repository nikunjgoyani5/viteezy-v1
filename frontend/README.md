# Viteezy
Your own personalized nutrition

## Branch model
Merging to `master` requires a Pull Request with code review.

## Requirements
* [Node.js] = 18 (https://nodejs.org/en/) 

## Setup your own local environment
* Start by cloning the project
* Run `npm i` to install the project dependencies
* Run the `npm start` to start app

## Deploy to Google Cloud
* `ng build --configuration production --aot --build-optimizer`
* `docker build -t europe-docker.pkg.dev/viteezy/frontend/docker .`
* `docker push europe-docker.pkg.dev/viteezy/frontend/docker`

## Framework
* Angular + Angular JS
* Sass