import { Notification } from '../entities/notification';

export abstract class NotificationRepository {
  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
  abstract create(notification: Notification): Promise<void>;
  abstract save(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
}
