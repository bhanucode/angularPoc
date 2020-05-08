export class Pagination<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: string;
  numberOfElements: number;
  first: boolean;
}

