export interface Company {
  id?: number;
  name: string;
  email: string;
  phoneNumber: string;
  website?: string;
  address?: string;
  updatedAt?: Date;
  createdAt?: Date;
}
