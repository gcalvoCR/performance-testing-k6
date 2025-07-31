// This script demonstrates how to export the full raw data of a k6 test to a JSON file.
// To run this script, use the following command:
// k6 run --out json=file.json examples/02-output/process.js

// 1. Import the necessary modules
import http from "k6/http";

// 2. Define the options for the test
export const options = {
  // 3. Define the stages for the test
  stages: [
    // 4. Ramp up to 100 virtual users over 60 seconds
    { duration: "60s", target: 100 },
    // 5. Stay at 100 virtual users for 180 seconds
    { duration: "180s", target: 100 },
    // 6. Ramp down to 0 virtual users over 60 seconds
    { duration: "60s", target: 0 },
  ],
};

// 7. Define the default function that will be executed by each virtual user
export default function () {
  // 8. Send a GET request to the specified URL
  let response = http.get("https://api.escuelajs.co/api/v1/products");
}
