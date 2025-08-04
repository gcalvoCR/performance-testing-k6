// This script demonstrates how to use a custom metric to track the rate of successful requests.

// 1. Import the necessary modules
import http from "k6/http";
import { Rate } from "k6/metrics";

// 2. Define the options for the test
export const options = {
  // 3. Define the number of virtual users
  vus: 100,
  // 4. Define the duration of the test
  duration: "30s",
};

// 5. Create a new rate to track the number of successful requests
const myRate = new Rate("called_products");

// 6. Define the default function that will be executed by each virtual user
export default function () {
  // 7. Send a GET request to a random product
  const request = http.get(
    `https://api.escuelajs.co/api/v1/products/${Math.floor(
      Math.random() * 300
    )}`
  );
  // 8. If the request is successful, add 1 to the rate
  if (request.status != 404) {
    myRate.add(1);
  }
  // 9. If the request is not successful, add 0 to the rate
  else {
    myRate.add(0);
  }
}
