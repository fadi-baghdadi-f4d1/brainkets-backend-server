import { Smtp } from '@/interfaces/smtp.interface';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type SmtpCreationAttributes = Optional<
  Smtp,
  | 'id'
  | 'mailDriver'
  | 'mailHost'
  | 'mailPort'
  | 'mailUsername'
  | 'mailPassword'
  | 'mailFromName'
  | 'mailFromEmail'
  | 'mailEncryption'
  | 'isVerified'
  | 'mailConnection'
>;

export class SmtpModel extends Model<Smtp, SmtpCreationAttributes> implements Smtp {
  public id: number;
  public mailDriver: string;
  public mailHost: string;
  public mailPort: number;
  public mailUsername: string;
  public mailPassword: string;
  public mailFromName: string;
  public mailFromEmail: string;
  public mailEncryption: string;
  public isVerified: boolean;
  public mailConnection: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof SmtpModel {
  SmtpModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      mailDriver: {
        allowNull: false,
        type: DataTypes.STRING(),
        field: 'mail_driver',
      },
      mailHost: {
        allowNull: false,
        type: DataTypes.STRING(),
        field: 'mail_host',
      },
      mailPort: {
        allowNull: false,
        type: DataTypes.INTEGER(),
        field: 'mail_port',
      },
      mailUsername: {
        allowNull: false,
        type: DataTypes.STRING(),
        field: 'mail_username',
      },
      mailPassword: {
        allowNull: false,
        type: DataTypes.STRING(),
        field: 'mail_password',
      },
      mailFromName: {
        allowNull: false,
        type: DataTypes.STRING(),
        field: 'mail_from_name',
      },
      mailFromEmail: {
        allowNull: false,
        type: DataTypes.STRING(),
        field: 'mail_from_email',
      },
      mailEncryption: {
        allowNull: false,
        type: DataTypes.STRING(),
        field: 'mail_encryption',
      },
      isVerified: {
        allowNull: false,
        type: DataTypes.BOOLEAN(),
        field: 'is_verified',
        defaultValue: false,
      },
      mailConnection: {
        allowNull: false,
        type: DataTypes.STRING(),
        field: 'mail_connection',
      },
    },
    {
      tableName: 'smtp_settings',
      sequelize,
    },
  );

  return SmtpModel;
}
