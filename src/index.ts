import { server } from "./mock";
import httpClient from "./client";

server.listen();

(async function () {
  // fetch("https://example.com/content")
  //   .then((res) => res.json())
  //   .then((res) => {
  //     console.log(res);
  //   });

  const res = await httpClient
    .setUrl("content")
    .setMethod("get")
    .query("start", 2)
    .query("len", 5)
    .retrieve();

  console.log(res);
})();
