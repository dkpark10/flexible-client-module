import { server } from './mock';
import { client } from './client';
import { all } from './helloworld';

server.listen();

(async function () {
  fetch('https://example.com/content')
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });

  const res = await client
    .setRequestInfo({
      url: 'content',
      queryParams: { start: 2, len: 5, order: 'desc' },
      body: { apiKey: '123' },
    })
    .retrieve<Array<{ name: string; email: string }>>();

  console.log(res.data);

  const res2 = await client
    .setRequestInfo({
      url: 'slug/2',
      queryParams: { mode: 2 },
    })
    .retrieve<string>();

  console.log(res2.data);
})();

console.log(all);
