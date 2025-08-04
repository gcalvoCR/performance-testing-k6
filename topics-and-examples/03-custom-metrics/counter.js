// This script demonstrates how to use custom metrics to count the number of times a specific endpoint is called.

// 1. Import the necessary modules
import http from "k6/http";
import { Counter } from "k6/metrics";

// 2. Define the options for the test
export const options = {
  // 3. Define the number of virtual users
  vus: 100,
  // 4. Define the duration of the test
  duration: "30s",
};

// 5. Create a new counter for each endpoint
const categoriesCounter = new Counter("called_categories");
const usersCounter = new Counter("called_users");
const productsCounter = new Counter("called_products");

// 6. Define the default function that will be executed by each virtual user
export default function () {
  // 7. Use a switch statement to randomly call one of the three endpoints
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      // 8. Send a GET request to the categories endpoint
      let categoriesResponse = http.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      // 9. Increment the categories counter
      categoriesCounter.add(1);
      break;

    case 1:
      // 10. Send a GET request to the users endpoint
      let usersResponse = http.get("https://api.escuelajs.co/api/v1/products");
      // 11. Increment the users counter
      usersCounter.add(1);
      break;
    case 2:
      // 12. Send a GET request to the products endpoint
      let productsResponse = http.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      // 13. Increment the products counter
      productsCounter.add(1);
      break;
    default:
      break;
  }
}
