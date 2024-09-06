import { Theme } from '@/interfaces/theme.interface';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type ThemeCreationAttributes = Optional<
  Theme,
  'id' | 'primaryColor' | 'secondaryColor' | 'logoLightTheme' | 'logoDarkTheme' | 'favicon' | 'loginBgImage' | 'loginBgColor'
>;

export class ThemeModel extends Model<Theme, ThemeCreationAttributes> implements Theme {
  public id: number;
  public primaryColor: string;
  public secondaryColor: string;
  public logoLightTheme: string;
  public logoDarkTheme: string;
  public favicon: string;
  public loginBgImage: string;
  public loginBgColor: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ThemeModel {
  ThemeModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      primaryColor: {
        allowNull: false,
        type: DataTypes.STRING(),
        field: 'primary_color',
      },
      secondaryColor: {
        allowNull: false,
        type: DataTypes.STRING(),
        field: 'secondary_color',
      },
      logoLightTheme: {
        allowNull: false,
        type: DataTypes.STRING(),
        field: 'logo_light_theme',
      },
      logoDarkTheme: {
        allowNull: false,
        type: DataTypes.STRING(),
        field: 'logo_dark_theme',
      },
      favicon: {
        allowNull: false,
        type: DataTypes.STRING(),
      },
      loginBgImage: {
        allowNull: false,
        type: DataTypes.STRING(),
        field: 'login_bg_image',
      },
      loginBgColor: {
        allowNull: false,
        type: DataTypes.STRING(),
        field: 'login_bg_color',
      },
    },
    {
      tableName: 'theme_settings',
      sequelize,
    },
  );

  return ThemeModel;
}
