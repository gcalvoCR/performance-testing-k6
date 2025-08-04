// This script demonstrates how to use checks to verify the response of a request.

// 1. Import the necessary modules
import { check } from "k6";
import http from "k6/http";

// 2. Define the options for the test
export const options = {
  // 3. Define the number of virtual users
  vus: 20,
  // 4. Define the duration of the test
  duration: "15s",
};

// 5. Define the default function that will be executed by each virtual user
export default function () {
  // 6. Send a GET request to the specified URL
  const response = http.get("https://api.escuelajs.co/api/v1/products");
  // 7. Check the response
  check(response, {
    // 8. Check that the status is 200
    "status is 200": (r) => r.status === 200,
    // 9. Check that the transaction is below 500ms
    "transaction is below 500ms": (r) => r.timings.duration < 500,
  });
}
