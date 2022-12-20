import { InMemoryNotificatioRepository } from '../../../test/repositories/notification-repository';
import { CountRecipientNotification } from './count-recipient-notifications';
import { SendNotification } from './send-notification';

describe('Count Notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificatioRepository = new InMemoryNotificatioRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificatioRepository,
    );
    const sendNotification = new SendNotification(notificatioRepository);

    await sendNotification.execute({
      content: 'Você recebeu uma notificação de amizade',
      category: 'social',
      recipientId: 'recipient-1',
    });

    await sendNotification.execute({
      content: 'Você recebeu uma notificação de amizade',
      category: 'social',
      recipientId: 'recipient-1',
    });

    await sendNotification.execute({
      content: 'Você recebeu uma notificação de amizade',
      category: 'social',
      recipientId: 'recipient-2',
    });

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
