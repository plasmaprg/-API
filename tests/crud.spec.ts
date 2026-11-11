import { test, expect } from '@playwright/test';

test.describe.serial('Crud', () => {
  let createdId: string;

  test('create', async ({ request }) => {
    const payload = {
      name: 'Apple MacBook Pro 16',
      data: {
        year: 2026,
        price: 2499.99,
        color: 'Space Black',
      },
    }; 

    const response = await request.post('/objects', { data: payload });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBeDefined();
    expect(body.name).toBe(payload.name);
    expect(body.data).toEqual(payload.data);

    createdId = body.id;
  });

  test('read', async ({ request }) => {
    const response = await request.get(`/objects/${createdId}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(createdId);
    expect(body.name).toBe('Apple MacBook Pro 16');
  });

  test('update', async ({ request }) => {
    const updatedPayload = {
      name: 'Apple MacBook Pro 16 (Updated)',
      data: {
        year: 2026,
        price: 2199.00,
        color: 'Silver',
      },
    };

    const response = await request.put(`/objects/${createdId}`, { data: updatedPayload });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.name).toBe(updatedPayload.name);
    expect(body.data).toEqual(updatedPayload.data);
  });

  test('patch', async ({ request }) => {
    const patchPayload = {
      name: 'Apple MacBook Pro 16 (Patched)',
    };

    const response = await request.patch(`/objects/${createdId}`, { data: patchPayload });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.name).toBe(patchPayload.name);
    expect(body.data.color).toBe('Silver');
  });

  test('delete', async ({ request }) => {
    const deleteResponse = await request.delete(`/objects/${createdId}`);
    expect(deleteResponse.status()).toBe(200);

    const checkDeleted = await request.get(`/objects/${createdId}`);
    expect(checkDeleted.status()).toBe(404);
  });
});
