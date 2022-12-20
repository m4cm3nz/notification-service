import { InMemoryNotificatioRepository } from '../../../test/repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';
import { SendNotification } from './send-notification';

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const notificatioRepository = new InMemoryNotificatioRepository();
    const readNotification = new ReadNotification(notificatioRepository);
    const sendNotification = new SendNotification(notificatioRepository);

    const { notification } = await sendNotification.execute({
      content: 'Você recebeu uma notificação de amizade',
      category: 'social',
      recipientId: '1',
    });

    await readNotification.execute({ notificationId: notification.id });

    expect(notificatioRepository.notifications[0].read).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existent notification', () => {
    const notificatioRepository = new InMemoryNotificatioRepository();
    const readNotification = new ReadNotification(notificatioRepository);
    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
