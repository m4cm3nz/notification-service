import { Notification } from '@app/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notifications-repository';

interface GetRecipientNotificationRequest {
  recipientId: string;
}

interface GetRecipientNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotification {
  constructor(private notificatioRepository: NotificationRepository) {}

  async execute(
    request: GetRecipientNotificationRequest,
  ): Promise<GetRecipientNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificatioRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
