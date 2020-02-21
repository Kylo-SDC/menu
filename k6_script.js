
import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";


export let errRate = new Rate("errors");

export let options = {
  vus: 200,
  duration: "1m"
};

export default function () {
  const url = 'http://localhost:8000/api/restaurant/999999/';

  check(http.get(url), {
    'status is 200': (r) => r.status === 200
  }) || errRate.add(1);
};
