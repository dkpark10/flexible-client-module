export type UpperMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

export type LowerMethod = Lowercase<UpperMethod>;

export type Method = UpperMethod | LowerMethod;

export type EndPoint = 'content' | 'search' | `slug/${number}`;

export type QueryParams<E extends EndPoint> = {
  [Key in EndPoint]: E extends 'content'
    ? {
        start: number;
        len: number;
      }
    : E extends 'search'
    ? {
        order: 'ascend' | 'descend';
      }
    : E extends `slug/${number}`
    ? {
        mode: number;
      }
    : {
        [key: string]: any;
      };
};
