// This script demonstrates how to use thresholds to set pass/fail criteria for a test.

// 1. Import the necessary modules
import { check } from "k6";
import http from "k6/http";

// 2. Define the options for the test
export const options = {
  // 3. Define the number of virtual users
  vus: 20,
  // 4. Define the duration of the test
  duration: "15s",
  // 5. Define the thresholds for the test
  thresholds: {
    // 6. The 95th percentile of the request duration must be below 500ms
    http_req_duration: ["p(95)<500"],
    // 7. The rate of failed requests must be below 0.35
    http_req_failed: ["rate<0.35"],
  },
};

// 8. Define the default function that will be executed by each virtual user
export default function () {
  // 9. Send a GET request to a random product
  const response = http.get(
    `https://api.escuelajs.co/api/v1/products/${Math.floor(
      Math.random() * 300
    )}`
  );
  // 10. Check the response
  check(response, {
    // 11. Check that the status is 200
    "status is 200": (r) => r.status === 200,
    // 12. Check that the transaction is below 500ms
    "transaction is below 500ms": (r) => r.timings.duration < 500,
  });
}
