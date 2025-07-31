// 1. Import the necessary modules
import { sleep } from "k6";
import http from "k6/http";

// 2. Define the options for the test
export const options = {
  // 3. Define the number of virtual users
  vus: 10,
  // 4. Define the duration of the test
  duration: "30s",
};

// 5. Define the default function that will be executed by each virtual user
export default function () {
  // 6. Send a GET request to the specified URL
  let response = http.get("https://api.escuelajs.co/api/v1/products");

  // 7. Wait for 1 second before the next iteration
  sleep(1);
}
