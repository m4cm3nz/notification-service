import { SendNotification } from '@app/use-cases/send-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationsController } from './kafka/controllers/notifications.controller';
import { KafkaConsumerService } from './kafka/service.-consumer-kafka';

@Module({
  imports: [DatabaseModule],
  providers: [SendNotification, KafkaConsumerService],
  controllers: [NotificationsController],
})
export class MessagingModule {}
