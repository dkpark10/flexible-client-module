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
    .setUrl('content', { start: 2, len: 5, order: 'desc' })
    .retrieve<Array<{ name: string; email: string }>>();

  console.log(res.data);

  const res2 = await client.setUrl('slug/2', { mode: 5 }).retrieve<string>();

  console.log(res2.data);
})();

console.log(all);
