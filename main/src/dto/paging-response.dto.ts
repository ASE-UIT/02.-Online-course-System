export class PagingResponseDto<T> {
  public total = 0;
  public items: Array<T>;

  constructor(total: number, items: Array<T>) {
    this.items = items;
    this.total = total;
  }
}
