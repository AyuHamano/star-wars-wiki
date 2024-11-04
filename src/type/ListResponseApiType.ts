export interface ListResponseApiType<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
