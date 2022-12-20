import { Body, Controller, Patch, Param, Post, Get } from '@nestjs/common';
import { SendNotification } from '@app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationVeiwModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@app/use-cases/cancel-notification';
import { ReadNotification } from '@app/use-cases/read-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { CountRecipientNotification } from '@app/use-cases/count-recipient-notifications';
import { GetRecipientNotification } from '@app/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotification,
    private getRecipientNotification: GetRecipientNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    this.cancelNotification.execute({ notificationId: id });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    this.unreadNotification.execute({ notificationId: id });
  }

  @Get('get/recipient/:id')
  async getFromRecipient(@Param('id') id: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId: id,
    });

    return { notifications: notifications.map(NotificationVeiwModel.ToHttp) };
  }

  @Get('count/recipient/:id')
  async countFromRecipient(@Param('id') id: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId: id,
    });

    return { count };
  }

  @Post('create')
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationVeiwModel.ToHttp(notification) };
  }
}
