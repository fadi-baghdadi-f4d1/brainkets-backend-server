import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { ThemeController } from '@/controllers/theme.controller';
import { UpdateThemeDto } from '@/dtos/theme.dto';
import multer from 'multer';
import fs from 'fs-extra'; // Use fs-extra instead of fs
import path from 'path'; // path is part of Node.js standard libraries, so it should be available

export class ThemeRoute implements Routes {
  public path = '/themes';
  public router = Router();
  public theme = new ThemeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Configure multer to set the destination dynamically based on themeId
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const tempDir = path.join('uploads', 'temp');
        fs.ensureDirSync(tempDir); // Ensure the temp folder exists
        cb(null, tempDir); // Save files in temp directory
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname); // Keep the original name
      },
    });

    const upload = multer({ storage });

    // Define the route with multiple file uploads for different fields

    this.router.get(`${this.path}/:id(\\d+)`, this.theme.getThemeById);
    // Allow multiple file uploads for different fields
    // Define the route with multiple file uploads for different fields
    this.router.put(
      `${this.path}/:id(\\d+)`,
      upload.fields([
        { name: 'favicon', maxCount: 1 },
        { name: 'logoDarkTheme', maxCount: 1 },
        { name: 'logoLightTheme', maxCount: 1 },
        { name: 'loginBgImage', maxCount: 1 },
      ]),
      ValidationMiddleware(UpdateThemeDto, true),
      this.theme.updateTheme,
    );
  }
}
