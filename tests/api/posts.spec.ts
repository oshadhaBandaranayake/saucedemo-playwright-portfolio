import { test, expect } from '@playwright/test';

test.use({ baseURL: 'https://jsonplaceholder.typicode.com' });

test.describe('Posts API Tests', () => {

  test('GET - fetch a single post', async ({ request }) => {
    const response = await request.get('/posts/1');

    // Confirm the request succeeded
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Confirm the returned post matches the requested ID
    expect(body.id).toBe(1);

    // Title should be a non-empty string
    expect(body.title).toBeTruthy();

    // userId should exist on the object (even if its value could be falsy, e.g. 0)
    expect(body.userId).toBeDefined();
  });

  test('GET - fetch all posts returns an array', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.status()).toBe(200);

    const body = await response.json();

    // The endpoint should return a JSON array...
    expect(Array.isArray(body)).toBeTruthy();

    // ...and it shouldn't be empty
    expect(body.length).toBeGreaterThan(0);
  });


  test('POST - create a new post', async ({ request }) => {
    const response = await request.post('/posts', {
      data: {
        title: 'My Portfolio Post',
        body: 'Testing Playwright API capabilities',
        userId: 1,
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    // The response should echo back the data we sent
    expect(body.title).toBe('My Portfolio Post');

    // A new post should be assigned an id by the "server"
    expect(body.id).toBeDefined();
  });

  
  test('PUT - update an existing post', async ({ request }) => {
    const response = await request.put('/posts/1', {
      data: {
        id: 1,
        title: 'Updated Title',
        body: 'Updated Body',
        userId: 1,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('Updated Title');
  });

  
  test('DELETE - remove a post', async ({ request }) => {
    const response = await request.delete('/posts/1');

    // JSONPlaceholder returns 200 (not 204) on delete, with an empty object body
    expect(response.status()).toBe(200);
  });

 
  test('GET - 404 for a post that does not exist', async ({ request }) => {
    const response = await request.get('/posts/99999');

    expect(response.status()).toBe(404);
  });

});