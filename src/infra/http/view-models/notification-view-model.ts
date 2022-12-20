import { Notification } from '@app/entities/notification';

export class NotificationVeiwModel {
  static ToHttp(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
    };
  }
}
