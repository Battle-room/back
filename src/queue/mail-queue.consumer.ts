import { MailService } from 'src/mail/mail.service';
import { MAIL_QUEUE } from './consts';
import { Process, Processor } from '@nestjs/bull';
import { MailJob } from './types/mail-job.type';

@Processor(MAIL_QUEUE)
export class MailQueueConsumer {
  constructor(private readonly mailService: MailService) {}

  @Process()
  async sendMail(job: MailJob) {
    await this.mailService.send(job.data);
  }
}
