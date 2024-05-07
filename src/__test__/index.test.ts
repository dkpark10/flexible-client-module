import { describe, test, assertType, expectTypeOf } from 'vitest';
import { QueryParams } from '@/types';
import ApiClient from '../client';

describe('쿼리 스트링 타입 테스트', () => {
  test('content', () => {
    const client1 = new ApiClient<'content', any>();

    expectTypeOf(client1.setQuery)
      .parameter(0)
      .toEqualTypeOf<'start' | 'len' | 'order'>();

    expectTypeOf(client1.setQuery)
      .parameter(1)
      .toEqualTypeOf<number | 'desc' | 'asce'>();

    const obj: QueryParams['content'] = {
      start: 0,
      len: 0,
      order: 'desc',
    };

    assertType<QueryParams['content']>(obj);
  });

  test('search', () => {
    const client2 = new ApiClient<'search', any>();

    expectTypeOf(client2.setQuery)
      .parameter(0)
      .toEqualTypeOf<'start' | 'order' | 'keyword' | 'end'>();

    expectTypeOf(client2.setQuery)
      .parameter(1)
      .toEqualTypeOf<number | string | 'desc' | 'asce'>();

    const obj: QueryParams['search'] = {
      start: 0,
      end: 0,
      order: 'desc',
      keyword: 'food',
    };

    assertType<QueryParams['search']>(obj);
  });
});
