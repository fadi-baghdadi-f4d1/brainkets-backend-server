import { Service } from 'typedi';
import { DB } from '@database';
import { NotFoundException } from '@/exceptions/NotFoundException';
import { Smtp } from '@/interfaces/smtp.interface';
import { SendTestEmailDto, UpdateSmtpDto } from '@/dtos/smtp.dto';
import nodemailer from 'nodemailer';

@Service()
export class SmtpService {
  public async findSmtpById(smtpId: number): Promise<Smtp> {
    const findSmtp: Smtp = await DB.Smtps.findByPk(smtpId);
    if (!findSmtp) throw new NotFoundException();

    return findSmtp;
  }

  public async updateSmtp(smtpId: number, smtpData: UpdateSmtpDto): Promise<Smtp> {
    const findSmtp: Smtp = await DB.Smtps.findByPk(smtpId);
    if (!findSmtp) throw new NotFoundException();

    await DB.Smtps.update({ ...smtpData }, { where: { id: smtpId } });
    const updateSmtp: Smtp = await DB.Smtps.findByPk(smtpId);
    return updateSmtp;
  }

  public async sendTestEmail(smtpData: SendTestEmailDto): Promise<Boolean> {
    try {
      const { mailHost, mailPort, mailUsername, mailPassword, mailFromName, mailFromEmail, mailEncryption } = smtpData;

      // Create a transporter object
      const transporter = nodemailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: mailEncryption === 'ssl', // true for 465, false for other ports
        auth: {
          user: mailUsername,
          pass: mailPassword,
        },
      });

      // Send a test email
      await transporter.sendMail({
        from: `"${mailFromName}" <${mailFromEmail}>`,
        to: mailFromEmail, // Send to the same address for testing
        subject: 'Test Email',
        text: 'This is a test email to verify SMTP settings.',
      });

      // If the email was sent successfully
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}
