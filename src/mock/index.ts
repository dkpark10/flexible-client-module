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
  rest.get("https://example.com/content", (_ ,res, ctx) => {
    return res(ctx.json(mock));
  }),
];

export const server = setupServer(...handlers);
