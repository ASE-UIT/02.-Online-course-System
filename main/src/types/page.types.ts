/**
 * Page type
 * @param T
 * @prop content
 * Example: Retrieve 10 records from 100 records, the content is 10 records
 * @property totalElements
 * Example: Retrieve 10 records from 100 records, the totalElements is 100
 */
export type Page<T> = {
  content: T[];
  totalElements: number;
};
