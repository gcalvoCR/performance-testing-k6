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
tar -czf my-k6-test.tar.gz test.js utils.js config.js data.json
```

This will create a gzipped archive named my-k6-test.tar.gz.

## ☁️ 3. Run with k6 cloud
You can now upload and run the archive:

```bash
k6 cloud my-k6-test.tar.gz
```
If the main script isn’t named script.js, specify it manually:

```bash
k6 cloud --script test.js my-k6-test.tar.gz
```

## ✅ Notes
- Use relative imports (./utils.js) in your scripts.
- setup() and teardown() must be in the main script.
- Only .js, .json, and .pem files are allowed in the archive.

## ⚙️ Optional: Automate with a Makefile
```makefile
FILES = test.js utils.js config.js data.json
ARCHIVE = my-k6-test.tar.gz

package:
	tar -czf $(ARCHIVE) $(FILES)

run-cloud: package
	k6 cloud --script test.js $(ARCHIVE)
```

Then run:

```bash
make run-cloud
```