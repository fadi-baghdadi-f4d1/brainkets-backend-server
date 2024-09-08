import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ResponseUtil } from '@/utils/responseUtil';
import { Smtp } from '@/interfaces/smtp.interface';
import { SendTestEmailDto, UpdateSmtpDto } from '@/dtos/smtp.dto';
import { SmtpService } from '@/services/smtp.service';

export class SmtpController {
  public smtp = Container.get(SmtpService);

  public getSmtpById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const smtpId = Number(req.params.id);
      const findOneSmtpData: Smtp = await this.smtp.findSmtpById(smtpId);

      const response = await ResponseUtil.generateSuccessResponse(findOneSmtpData);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  public updateSmtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const smtpId = Number(req.params.id);
      const smtpData: UpdateSmtpDto = req.body;
      const updateSmtpData: Smtp = await this.smtp.updateSmtp(smtpId, smtpData);
      const response = await ResponseUtil.generateSuccessResponse(updateSmtpData);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  public sendTestEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stestEmailData: SendTestEmailDto = req.body;
      const isVerified: Boolean = await this.smtp.sendTestEmail(stestEmailData);
      const response = await ResponseUtil.generateSuccessResponse(isVerified);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
}
