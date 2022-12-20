import { InMemoryNotificatioRepository } from '../../../test/repositories/notification-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { SendNotification } from './send-notification';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificatioRepository = new InMemoryNotificatioRepository();
    const cancelNotification = new CancelNotification(notificatioRepository);
    const sendNotification = new SendNotification(notificatioRepository);

    const { notification } = await sendNotification.execute({
      content: 'Você recebeu uma notificação de amizade',
      category: 'social',
      recipientId: '1',
    });

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificatioRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existent notification', () => {
    const notificatioRepository = new InMemoryNotificatioRepository();
    const cancelNotification = new CancelNotification(notificatioRepository);
    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
