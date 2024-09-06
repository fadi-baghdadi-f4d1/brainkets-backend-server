export interface Rate {
  id?: number;
  currencyId: number;
  exchangeRate: number;
  updatedAt?: Date;
  createdAt?: Date;
}
