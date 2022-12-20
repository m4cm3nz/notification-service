import { InMemoryNotificatioRepository } from '../../../test/repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { SendNotification } from './send-notification';
import { UnreadNotification } from './unread-notification';

describe('Unread Notification', () => {
  it('should be able to unread a notification', async () => {
    const notificatioRepository = new InMemoryNotificatioRepository();
    const unreadNotification = new UnreadNotification(notificatioRepository);
    const sendNotification = new SendNotification(notificatioRepository);

    const { notification } = await sendNotification.execute({
      content: 'Você recebeu uma notificação de amizade',
      category: 'social',
      recipientId: '1',
    });

    notification.read();

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificatioRepository.notifications[0].read).toBeNull();
  });

  it('should not be able to unread a non existent notification', () => {
    const notificatioRepository = new InMemoryNotificatioRepository();
    const unreadNotification = new UnreadNotification(notificatioRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
