# Playwright POM Framework

This project is a Playwright Page Object Model (POM) framework for automating functional test cases and API tests.

## Getting Started

To get started with this project, follow these instructions.

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (version 14 or later)
- [npm](https://www.npmjs.com/) (version 6 or later)
- [Playwright](https://playwright.dev/)

### Installation

Clone the repository:

```sh
git clone https://github.com/rameshn3/-playwright-pom-framework.git
Navigate to the project directory:

sh
cd -playwright-pom-framework
Install the dependencies:

sh
npm install
Running Tests
You can run the tests using the following command:

sh
npx playwright test
To run a specific test, use:

sh
npx playwright test path/to/your/test-file.js
Functional Test Cases
The functional test cases are located in the tests directory. Each test is written following the Page Object Model design pattern for better maintainability and reusability.

Here is an example of a simple functional test:

javascript
const { test, expect } = require('@playwright/test');

test('should display the correct title', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  expect(await page.title()).toBe('Example Domain');
});
API Tests
The API tests are located in the api-tests directory. We use the supertest library for making HTTP requests and asserting the responses.

Here is an example of a simple API test:

javascript
const request = require('supertest');
const app = require('../path/to/your/app'); // Ensure you have your app setup for testing

describe('API Tests', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).get('/api/endpoint');
    expect(response.status).toBe(200);
  });
});
Directory Structure
.
├── tests
│   ├── example.test.js
│   └── ... (other functional tests)
├── api-tests
│   ├── api.test.js
│   └── ... (other API tests)
├── pages
│   ├── basePage.js
│   └── ... (other page objects)
└── README.md
Contributing
Contributions are welcome! Please open an issue or submit a pull request.
