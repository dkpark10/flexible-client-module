import { rest } from "msw";
import { setupServer } from "msw/node";
import { faker } from "@faker-js/faker";

const mock = (function () {
  return Array.from({ length: 20 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }));
})();

export const handlers = [
  rest.get("https://example.com/content", (req ,res, ctx) => {
    const start = Number(req.url.searchParams.get('start'));
    const len = Number(req.url.searchParams.get('len'));
    return res(ctx.json(mock.slice(start, len)));
  }),
];

export const server = setupServer(...handlers);
