import { UpdateThemeDto } from '@/dtos/theme.dto';
import { Theme } from '@/interfaces/theme.interface';
import { ThemeService } from '@/services/theme.service';
import { ResponseUtil } from '@/utils/responseUtil';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class ThemeController {
  public theme = Container.get(ThemeService);

  public getThemeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const themeId = Number(req.params.id);
      const findOneThemeData: Theme = await this.theme.findThemeById(themeId);

      const response = await ResponseUtil.generateSuccessResponse(findOneThemeData);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  public updateTheme = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const themeId = Number(req.params.id);
      const themeData: UpdateThemeDto = req.body;

      // Handle files from multer and pass to the service
      const files = req.files as { [key: string]: Express.Multer.File[] };

      const updateThemeData: Theme = await this.theme.updateTheme(themeId, themeData, files);

      const response = await ResponseUtil.generateSuccessResponse(updateThemeData);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
}
