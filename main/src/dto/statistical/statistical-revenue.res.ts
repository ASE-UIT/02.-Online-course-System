export class StatisticalRevenueRes {
  revenue!: any[];
  constructor({ revenue }: { revenue: any[] }) {
    this.revenue = revenue;
  }
}
