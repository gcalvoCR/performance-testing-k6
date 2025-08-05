# 📦 Splitting k6 Code with tar and Multi-File Projects
tar is not a k6 feature itself, but you can use it to package multiple files (scripts, configs, data) into one archive — especially useful when:

Using multiple modules in your test (test.js, utils.js, etc.)

Running tests in k6 Cloud or with the k6 Operator

Sharing a self-contained test bundle

## 🗂 Folder Structure Example
```arduino
my-k6-test/
├── test.js         # main script (with setup/teardown)
├── utils.js        # helper functions
├── config.js       # configuration values
└── data.json       # static data file
```
## 🧵 1. Sample Code Split
```javascript
//  test.js
import { getToken } from './utils.js';
import { API_BASE } from './config.js';

export const options = {
  vus: 1,
  duration: '10s',
};

export function setup() {
  return { token: getToken() };
}

export default function (data) {
  console.log(`Token is: ${data.token}`);
}
```
```javascript
//  utils.js
export function getToken() {
  return 'mocked-token-123';
}
```
```javascript
// config.js
export const API_BASE = 'https://example.com/api';
```


## 📦 2. Package Your Files with tar
Run this in your terminal:

```bash
k6 archive test.js -O test.tar
```
https://grafana.com/docs/k6/latest/reference/archive/


This will create a tar archive named test.tar containing test.js and all its dependencies (utils.js, config.js, data.json).

## ☁️ 3. Run with k6 cloud
You can now upload and run the archive:

```bash
k6 cloud test.tar
```

or locally:

```bash
k6 run test.tar
```

## ✅ Notes
- Use relative imports (./utils.js) in your scripts.
- setup() and teardown() must be in the main script.
- Only .js, .json, and .pem files are allowed in the archive.
