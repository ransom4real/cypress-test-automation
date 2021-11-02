var random_name = require('node-random-name');
var depositChoices = ['true', 'false'];

module.exports = {
    "firstname": random_name({ first: true }),
    "lastname": random_name({ last: true }),
    "totalprice": Math.floor(Math.random() * 1000),
    "depositpaid": depositChoices[Math.floor(Math.random() * depositChoices.length)],
    "checkin": new Date().toISOString().slice(0, 10),
    "checkout": new Date().toISOString().slice(0, 10)
}