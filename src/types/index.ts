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

export type QueryParams = {
  content: {
    start: number;
    len: number;
  };

  search: {
    order: 'ascend' | 'descend';
  };
};
