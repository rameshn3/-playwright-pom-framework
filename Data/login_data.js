const dotenv = require('dotenv');
const path = require('path');

// Load the correct .env file explicitly
dotenv.config({ path: path.resolve(__dirname, '../.env.dev') });

console.log("🔍 Raw USERNAME from env:", `"${process.env.USERNAME}"`); // Debug print

const testConfig  = {
    BASE_URL: process.env.BASE_URL ? process.env.BASE_URL.trim() : 'https://automationexercise.com/',
    username: process.env.USERNAME ? String(process.env.USERNAME).trim() : "rameshqaonline@gmail.com",
    password: process.env.PASSWORD ? process.env.PASSWORD.trim() : "Test@123"
};
process.env.USERNAME = process.env.USERNAME || "rameshqaonline@gmail.com"; 
console.log("🔍 Forced USERNAME:", `"${process.env.USERNAME}"`);
console.log("✅ Loaded USERNAME:", `"${testConfig.username}"`); // Debug print
module.exports = { testConfig };
