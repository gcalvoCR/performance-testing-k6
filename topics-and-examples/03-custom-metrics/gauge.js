// This script demonstrates how to use a custom metric to track the last value of a metric.

// 1. Import the necessary modules
import http from "k6/http";
import { Gauge } from "k6/metrics";

// 2. Define the options for the test
export const options = {
  // 3. Define the number of virtual users
  vus: 100,
  // 4. Define the duration of the test
  duration: "30s",
};

// 5. Create a new gauge to track the last call time
const myGauge = new Gauge("last_call_time");

// 6. Define the default function that will be executed by each virtual user
export default function () {
  // 7. Send a GET request to the specified URL
  const request = http.get("https://api.escuelajs.co/api/v1/products");
  // 8. Add the waiting time to the gauge
  myGauge.add(request.timings.waiting);
  // 9. Log the name of the gauge to the console
  console.log(myGauge.name);
}
