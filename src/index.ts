// (async function () {
//   const response = await this.httpClient
//     .get("/api/post/1")
//     .query("len", 10)
//     .query("len", 10);

//   console.log(response);
// })();

import { worker } from "./mock";

worker.start();

(async function () {
  console.log('132');
})();
