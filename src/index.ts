// import { server } from './mock';
// import ApiClient from './client';
import { all } from './helloworld';

// server.listen();

// (async function () {
//   fetch("https://example.com/content")
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res);
//     });

//   const res = await new ApiClient<
//     'content',
//     Array<{ name: string; email: string }>
//   >()
//     .setUrl('content')
//     .setQuery('start', 2)
//     .setQuery('len', 5)
//     .setQuery('order', 'asce')
//     .retrieve();

//   console.log(res.data);

//   const res2 = await new ApiClient<'slug/2', string>()
//     .setUrl('slug/2')
//     .setQuery('mode', 5)
//     .retrieve();

//   console.log(res2.data);
//   const response = await new ApiClient<'search', string>()
//   .setUrl('search')
//   .setQuery('order', 'asce')
//   // .setQuery('invalidKey', 0)
//   .setQuery('end', 10)
//   .setQuery('keyword', 'food')
//   .retrieve();
// })();

console.log(all);