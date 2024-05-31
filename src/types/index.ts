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

export type QueryParams = {
  [Key in EndPoint]: Key extends 'content'
    ? {
        start: number;
        len: number;
        order: 'desc' | 'asce';
      }
    : Key extends 'search'
    ? {
        order: 'desc' | 'asce';
        keyword: string;
        start: number;
        end: number;
      }
    : Key extends `slug/${number}`
    ? {
        mode: number;
      }
    : {
        [key: string]: any;
      };
};

export type RequestBody = {
  [Key in EndPoint]: Key extends 'content'
    ? {
        apiKey: string;
      }
    : Key extends `slug/${number}`
    ? {
        id: number;
      }
    : never;
};
