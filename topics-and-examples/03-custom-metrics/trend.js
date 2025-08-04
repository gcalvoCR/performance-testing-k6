// This script demonstrates how to use a custom metric to collect statistics on a series of values.

// 1. Import the necessary modules
import http from "k6/http";
import { Trend } from "k6/metrics";

// 2. Define the options for the test
export const options = {
  // 3. Define the number of virtual users
  vus: 100,
  // 4. Define the duration of the test
  duration: "30s",
};

// 5. Create a new trend for each endpoint
const myTrend01 = new Trend("waiting_time_01");
const myTrend02 = new Trend("waiting_time_02");
const myTrend03 = new Trend("waiting_time_03");

// 6. Define the default function that will be executed by each virtual user
export default function () {
  // 7. Send a GET request to the categories endpoint
  let categoriesResponse = http.get(
    "https://api.escuelajs.co/api/v1/categories"
  );
  // 8. Add the waiting time to the first trend
  myTrend01.add(categoriesResponse.timings.waiting);
  // 9. Send a GET request to the users endpoint
  let usersResponse = http.get("https://api.escuelajs.co/api/v1/users");
  // 10. Add the waiting time to the second trend
  myTrend02.add(usersResponse.timings.waiting);
  // 11. Send a GET request to the products endpoint
  let productsResponse = http.get("https://api.escuelajs.co/api/v1/products");
  // 12. Add the waiting time to the third trend
  myTrend03.add(productsResponse.timings.waiting);
}
