import { Job } from 'bull';
import { MailOptionsDTO } from 'src/mail/mail-option.dto';

export type MailJob = { data: MailOptionsDTO } & Job;
