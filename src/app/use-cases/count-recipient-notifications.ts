import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notifications-repository';

interface CountRecipientNotificationRequest {
  recipientId: string;
}

interface CountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificatioRepository: NotificationRepository) {}

  async execute(
    request: CountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = request;

    const count = await this.notificatioRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
