export interface Smtp {
  id?: number;
  mailDriver: string;
  mailHost: string;
  mailPort: number;
  mailUsername: string;
  mailPassword: string;
  mailFromName: string;
  mailFromEmail: string;
  mailEncryption: string;
  isVerified: boolean;
  mailConnection: string;
  updatedAt?: Date;
  createdAt?: Date;
}
