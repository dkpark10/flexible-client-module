import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { faker } from '@faker-js/faker';

const mock = (function () {
  return Array.from({ length: 20 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }));
})();

const slugMock = {
  '1': 'one',
  '2': 'two',
  '3': 'three',
};

export const handlers = [
  rest.get('https://example.com/content', (req, res, ctx) => {
    const start = Number(req.url.searchParams.get('start'));
    const len = Number(req.url.searchParams.get('len'));
    return res(ctx.json(mock.slice(start, len)));
  }),

  rest.get('https://example.com/slug/:id', (req, res, ctx) => {
    const slugId = req.params.id;
    if (Array.isArray(slugId)) {
      return res(ctx.status(500));
    }

    if (!Object.keys(slugMock).some((id) => id.includes(slugId as string))) {
      return res(ctx.status(500));
    }

    return res(ctx.json(slugMock[slugId as string]));
  }),
];

export const server = setupServer(...handlers);
