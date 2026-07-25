import { test, expect } from "@playwright/test";

test.use({ baseURL: 'https://jsonplaceholder.typicode.com' });

test('GET - fetch a single post', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect (response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body.title).toBeTruthy();
    expect(body.userId).toBeDefined();
})