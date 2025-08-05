import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '10s',
};

// Setup: create a user and return the credentials
export function setup() {
  const url = 'https://test-api.k6.io/user/register/';
  const payload = JSON.stringify({
    username: 'testuser123',
    password: 'testpass123!',
  });

  const headers = { 'Content-Type': 'application/json' };
  const res = http.post(url, payload, { headers });

  check(res, {
    'setup: user created': (r) => r.status === 201,
  });

  return { username: 'testuser123', password: 'testpass123!' };
}

// Default: login and simulate user activity
export default function (data) {
  const loginRes = http.post(
    'https://test-api.k6.io/auth/token/login/',
    JSON.stringify(data),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(loginRes, {
    'logged in successfully': (r) => r.status === 200 && r.json('access') !== '',
  });

  sleep(1); // simulate user action
}

// Teardown: delete the user
export function teardown(data) {
  // Get token first
  const loginRes = http.post(
    'https://test-api.k6.io/auth/token/login/',
    JSON.stringify(data),
    { headers: { 'Content-Type': 'application/json' } }
  );
  const token = loginRes.json('access');

  const delRes = http.del(
    'https://test-api.k6.io/user/me/',
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  check(delRes, {
    'user deleted': (r) => r.status === 204,
  });
}
