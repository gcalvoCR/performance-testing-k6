## Checks

Checks allow you to validate responses or conditions during your test execution. They help verify if your system behaves as expected and record success or failure counts.
```js
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  let res = http.get('https://test-api.com');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response body contains welcome': (r) => r.body.includes('welcome'),
  });
}
```
- Each check returns `true` or `false`.
- k6 aggregates check results and reports success rates.

---

## Thresholds

Thresholds let you define performance goals that your tests must meet. If thresholds fail, the test run is marked as failed.

```js
import http from 'k6/http';

export let options = {
  thresholds: {
    'http_req_duration': ['p(95)<500'], // 95% of requests should be below 500ms
    'checks': ['rate>0.95'],            // At least 95% of checks must pass
  },
};

export default function () {
  let res = http.get('https://test-api.com');
}
```

- You can apply thresholds to any metric, including custom metrics and built-in ones.
- Useful for automated pass/fail criteria in CI pipelines.

---

# Differences Between Checks and Thresholds in k6

- **Purpose**  
  - *Checks*: Validate correctness of individual responses or conditions during test execution.  
  - *Thresholds*: Define overall performance goals and criteria that the test must meet.

- **Function**  
  - *Checks*: Evaluate boolean conditions and record pass/fail results for each iteration.  
  - *Thresholds*: Set pass/fail criteria based on aggregated metrics over the entire test or time intervals.

- **Result Type**  
  - *Checks*: Counts of passed and failed assertions reported as success rates.  
  - *Thresholds*: Determines pass/fail status of the entire test run.

- **Usage**  
  - *Checks*: Verify if each response meets expectations (e.g., correct status code, expected content).  
  - *Thresholds*: Enforce service-level agreements or performance requirements (e.g., 95% of requests under 500ms).

- **Timing**  
  - *Checks*: Performed continuously during test iterations.  
  - *Thresholds*: Evaluated after test completion or periodically during execution.

- **Effect on Test**  
  - *Checks*: Do not automatically fail the test; mainly report success/failure rates.  
  - *Thresholds*: Can automatically fail the test if criteria are not met.

- **Scope**  
  - *Checks*: Applied individually to each request or response.  
  - *Thresholds*: Applied on aggregated data across all requests or over defined time windows.

---