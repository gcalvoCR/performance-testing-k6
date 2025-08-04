
# Getting Started with k6

This guide will walk you through the process of setting up a new k6 project from scratch.

## 1. Install k6

First, you need to install k6 on your local machine. You can find the installation instructions for your operating system in the [official k6 documentation](https://k6.io/docs/getting-started/installation/).

## 2. Create a new project

Next, create a new directory for your project and navigate to it in your terminal.

```bash
mkdir my-k6-project
cd my-k6-project
```

## 3. Create your first test

Now, you can create your first k6 test. Create a new file called `test.js` and add the following code to it:

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}
```

This is a simple k6 test that sends a GET request to `https://test.k6.io` every second.

## 4. Run your test

To run your test, use the following command:

```bash
k6 run test.js
```

You should see the following output in your terminal:

```
          /\      |‾\ | /‾/  /‾/
     /\  /  \     |  \|/  /  / /
    /  \/    \    |     (  /  /
   /          \   |  |\   \  \
  /            \  |__| \___\__\

  execution: local
     script: test.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 iterations for 1s (max VUs: 1, gracefulStop: 30s)

running (00m01.0s) / 1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m01.0s/10m0s  1/1 iters, 1 per VU

     data_received..................: 12 kB 12 kB/s
     data_sent......................: 1.1 kB 1.1 kB/s
     http_req_blocked...............: avg=1.2ms    min=1.2ms    med=1.2ms    max=1.2ms    p(90)=1.2ms    p(95)=1.2ms
     http_req_connecting............: avg=1.1ms    min=1.1ms    med=1.1ms    max=1.1ms    p(90)=1.1ms    p(95)=1.1ms
     http_req_duration..............: avg=134.9ms  min=134.9ms  med=134.9ms  max=134.9ms  p(90)=134.9ms  p(95)=134.9ms
       { expected_response:true }...: avg=134.9ms  min=134.9ms  med=134.9ms  max=134.9ms  p(90)=134.9ms  p(95)=134.9ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 1
     http_req_receiving.............: avg=33.3µs   min=33.3µs   med=33.3µs   max=33.3µs   p(90)=33.3µs   p(95)=33.3µs
     http_req_sending...............: avg=21.3µs   min=21.3µs   med=21.3µs   max=21.3µs   p(90)=21.3µs   p(95)=21.3µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=134.8ms  min=134.8ms  med=134.8ms  max=134.8ms  p(90)=134.8ms  p(95)=134.8ms
     http_reqs......................: 1      0.996012/s
     iteration_duration.............: avg=1s       min=1s       med=1s       max=1s       p(90)=1s       p(95)=1s
     iterations.....................: 1      0.996012/s
     vus............................: 1      min=1      max=1
     vus_max........................: 1      min=1      max=1
```
Congratulations! You've successfully run your first k6 test.

## 5. Next steps

Now that you've run your first test, you can start exploring the other features of k6. Here are some resources to help you get started:

*   [k6 documentation](https://k6.io/docs/)
*   [k6 examples](https://k6.io/docs/topics-and-examples/)
*   [k6 community](https://community.k6.io/)

