const dotenv = require('dotenv');
dotenv.config(); // Load .env file

module.exports = {
    BASE_URL: process.env.BASE_URL || 'https://automationexercise.com/',
    username: process.env.USERNAME || 'rameshqaonline@gmail.com',
    password: process.env.PASSWORD || 'Test@123'
};