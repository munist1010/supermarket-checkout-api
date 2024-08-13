# supermarket-checkout-api built by Aaron Kelly
This is a Node.js API designed to emulate a checkout system which takes a string of SKU characters and returns a price, depending on available offers.

## Tools used:
    Node v22.2.0 - JavaScript runtime environment
    npm v9.6.4 - package manager use for below tools
    Nodemon - used to watch and restart the server for changes during development 
    Express - node web app framework used for middleware / HTTP utility
    Jest/Superagent/Supertest for testing - Jest for vanilla JavaScript and Superagent/supertest for testing endpoints

## Endpoints:
    I've included an endpoints.json file which lists the available endpoints for this API, as well as some examples of request body (in the case of POST /api).

## Offers:
    I decided to use a JSON file (offers.json) to act as a database for this model, allowing me to categorise the offers by type, and then to further categorise them by eligible items

## Testing:
    I used a combination of Jest / Supertest / Superagent to test my utils and API calls, and used Postman to send calls to http://localhost:3000 (the default host if no env variable is set).

## Instruction for installation
    Requires Node and npm
    "npm install" after cloning the repository to install all relevant dependancies. I've kept my dev dependencies in the main build just for demonstration purposes in this instance.

## Instructions for launching
    "npm run start" to launch the API server
    "npm run test" to launch the Jest testing suite


### TODO // 
    Create a MongoDB database to store offer objects