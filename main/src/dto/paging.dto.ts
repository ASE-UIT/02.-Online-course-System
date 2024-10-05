export class PagingDto {
  public page = 1;
  public rpp = 10;

  constructor(page?: number | undefined, rpp?: number | undefined) {
    if (page) {
      this.page = Number(page);
    }
    if (rpp) {
      this.rpp = Number(rpp);
    }
  }
}
