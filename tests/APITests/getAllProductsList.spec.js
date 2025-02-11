const { test, expect, request } = require('@playwright/test');
const APIUtils = require('../../Utils/apiUtils');
const endpointData = require('../../Data/apiendpoints.json');

// Testcase 1: Verify the response status code is 200
test('should return status code 200', async ({ request }) => {
    const response = await request.get(endpointData.baseURL + '/productsList');
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const resBody = await response.json();
    console.log(resBody);
});

// Testcase 2: Verify the response contains a list of products
test('Verify the response contains a list of products', async ({ request }) => {
    const response = await request.get(endpointData.baseURL + '/productsList');
    const resBody = await response.json();
    expect(Array.isArray(resBody.products)).toBeTruthy();
});

// Testcase 3: Verify the structure of each product's response schema
test('Verify the structure of each product\'s response schema', async ({ request }) => {
    const response = await request.get(endpointData.baseURL + '/productsList');
    const resBody = await response.json();
    resBody.products.forEach(product => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('brand');
    });
});
