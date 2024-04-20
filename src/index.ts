import { server } from './mock';
import httpClient from './client';

server.listen();

(async function () {
  // fetch("https://example.com/content")
  //   .then((res) => res.json())
  //   .then((res) => {
  //     console.log(res);
  //   });

  const res = await new httpClient<'content'>()
    .setUrl('content')
    .setQuery('start', 2)
    .setQuery('len', 5)
    .retrieve();

  console.log(res);
})();
