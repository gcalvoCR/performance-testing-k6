# k6 Custom Metrics Overview

k6 provides several types of custom metrics to track different aspects of your load tests:

- **Counter**  
  A cumulative metric that only increases over time.  
  *Use case:* Counting the number of requests, errors, or events.  

```js
  import { Counter } from 'k6/metrics';
  let errorCount = new Counter('errors');

  export default function () {
    let res = http.get('https://test-api.com');
    if (res.status !== 200) {
      errorCount.add(1);
    }
  }
```

- **Gauge**  
  A metric that represents a value that can go up or down.  
  *Use case:* Tracking current memory usage, number of active users, or queue length.
```js
import { Gauge } from 'k6/metrics';
let activeUsers = new Gauge('active_users');

export default function () {
  activeUsers.add(__VU); // __VU is the virtual user number
}
```

- **Rate**  
  Represents the proportion of successful or specific events relative to total events, in other words Represents the ratio of events that meet a condition. 
  *Use case:* Calculating error rates or success rates (e.g., percentage of requests that failed).
```js
import { Rate } from 'k6/metrics';
let successRate = new Rate('success_rate');

export default function () {
  let res = http.get('https://test-api.com');
  successRate.add(res.status === 200);
}
```


- **Trend**  
  Records numeric values over time and provides statistical summaries (min, max, average, percentiles).  
  *Use case:* Measuring response times, latency, or payload sizes.

```js
import { Trend } from 'k6/metrics';
let responseTime = new Trend('response_time');

export default function () {
  let res = http.get('https://test-api.com');
  responseTime.add(res.timings.duration);
}
```



---