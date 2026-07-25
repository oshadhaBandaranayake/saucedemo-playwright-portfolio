import { test, expect } from "@playwright/test";

test.use({ baseURL: 'https://jsonplaceholder.typicode.com' });

test('GET - fetch a single post', async ({ request }) => {
    const response = await request.get('/posts/1'); // 1. Make the call
    expect (response.status()).toBe(200); // 2. Check it worked

    const body = await response.json(); // 3. Parse the data
    expect(body.id).toBe(1);  // 4. Check the data is correct
    expect(body.title).toBeTruthy();
    expect(body.userId).toBeDefined();
});

test ('Get - fetch all posts returns an array', async ({ request }) => {
    const response = await request.get('/posts');
    expect (response.status()).toBe(200);

    const body = await response.json();
    expect (Array.isArray(body)).toBeTruthy();
    expect (body.length).toBeGreaterThan(0);
});