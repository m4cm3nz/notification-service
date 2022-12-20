import { InMemoryNotificatioRepository } from '../../../test/repositories/notification-repository';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const notificatioRepository = new InMemoryNotificatioRepository();
    const sendNotification = new SendNotification(notificatioRepository);

    const { notification } = await sendNotification.execute({
      content: 'Você recebeu uma notificação de amizade',
      category: 'social',
      recipientId: '1',
    });

    expect(notificatioRepository.notifications[0]).toEqual(notification);
    expect(notificatioRepository.notifications).toHaveLength(1);
  });
});
