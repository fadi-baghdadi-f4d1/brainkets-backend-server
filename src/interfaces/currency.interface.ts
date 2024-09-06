export interface Currency {
  id?: number;
  name: string;
  symbol: string;
  code: string;
  isDefault: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}
