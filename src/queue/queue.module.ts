import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MAIL_QUEUE } from './consts';
import { MailQueueConsumer } from './mail-queue.consumer';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: MAIL_QUEUE,
    }),
    MailModule,
  ],
  providers: [MailQueueConsumer],
  exports: [BullModule],
})
export default class QueueModule {}
