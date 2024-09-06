import { Service } from 'typedi';
import { DB } from '@database';
import { HttpException } from '@/exceptions/HttpException';
import { Theme } from '@/interfaces/theme.interface';
import { UpdateThemeDto } from '@/dtos/theme.dto';
import fs from 'fs-extra';
import path from 'path';

@Service()
export class ThemeService {
  public async findThemeById(themeId: number): Promise<Theme> {
    const theme = await this.checkIfThemeExist(themeId);
    return theme;
  }

  public async updateTheme(themeId: number, themeData: UpdateThemeDto, files: { [key: string]: Express.Multer.File[] }): Promise<Theme> {
    const tempDir = path.join('uploads', 'temp');
    const finalDir = path.join('uploads', `theme_${themeId}`);

    try {
      // Ensure the final upload directory exists
      await fs.ensureDir(finalDir);

      // Fetch the existing theme
      const existingTheme = await this.checkIfThemeExist(themeId); // Implement this method

      // Prepare updated theme data
      const updatedThemeData: Partial<Theme> = {
        ...themeData,
        favicon: existingTheme.favicon,
        logoDarkTheme: existingTheme.logoDarkTheme,
        logoLightTheme: existingTheme.logoLightTheme,
        loginBgImage: existingTheme.loginBgImage,
      };

      // Process and move files, updating paths in theme data
      const fileFields = ['favicon', 'logoDarkTheme', 'logoLightTheme', 'loginBgImage'] as const;
      for (const field of fileFields) {
        if (files[field] && files[field][0]) {
          const file = files[field][0];
          const fileExtension = path.extname(file.originalname);
          const newFileName = `${field}${fileExtension}`;
          const newFilePath = path.join(finalDir, newFileName);
          // Update theme data with new file path
          updatedThemeData[field] = newFilePath;
        }
      }

      // Save updated theme data
      const updatedTheme = await this.saveThemeData(themeId, updatedThemeData);

      // If database update is successful, move files and clean up old ones
      for (const field of fileFields) {
        if (files[field] && files[field][0]) {
          const file = files[field][0];
          const newFilePath = updatedThemeData[field] as string;

          // Move new file from temp to final directory
          await fs.move(path.join(tempDir, file.filename), newFilePath, { overwrite: true });

          // Remove old file if it exists and is different from the new file
          if (existingTheme[field] && existingTheme[field] !== newFilePath) {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            await fs.remove(existingTheme[field]).catch(() => {});
          }
        }
      }

      return updatedTheme;
    } catch (error) {
      // If any error occurs, clean up temp files
      for (const field in files) {
        if (files[field] && files[field][0]) {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          await fs.remove(path.join(tempDir, files[field][0].filename)).catch(() => {});
        }
      }

      throw error;
    }
  }

  private async checkIfThemeExist(themeId: number): Promise<Theme> {
    const theme: Theme = await DB.Themes.findByPk(themeId);
    if (!theme) throw new HttpException(409, "Theme doesn't exist");
    return theme;
  }

  // Method to save theme data in the database (implement your database logic here)
  private async saveThemeData(themeId: number, themeData: UpdateThemeDto): Promise<Theme> {
    // Update the theme in the database and return the updated object
    await DB.Themes.update({ ...themeData }, { where: { id: themeId } });
    const theme = await this.checkIfThemeExist(themeId);
    return theme;
  }
}
