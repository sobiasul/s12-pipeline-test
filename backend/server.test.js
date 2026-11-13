
const { before, after, test } = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('./server');

let server;
let baseUrl;

before(async () => {
  server = createServer();

  await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', resolve);
  });

  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
});

test('GET /health returns a healthy status', async () => {
  const response = await fetch(`${baseUrl}/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    status: 'ok',
    service: 'backend'
  });
});

test('GET / returns a healthy status', async () => {
  const response = await fetch(`${baseUrl}/`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    status: 'ok',
    service: 'backend'
  });
});

test('Unknown routes return 404', async () => {
  const response = await fetch(`${baseUrl}/unknown`);

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), {
    error: 'Not found'
  });
});
