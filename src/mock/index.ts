import { setupWorker } from "msw/browser";
import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

const mock = (function () {
  return Array.from({ length: 20 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  })).reduce(
    (acc, item, idx) => ({
      ...acc,
      [idx]: item,
    }),
    {}
  );
})();

export const handlers = [
  http.get("https://example.com/post", () => {
    return HttpResponse.json(mock, {
      status: 200,
    });
  }),
];

export const worker = setupWorker(...handlers);
