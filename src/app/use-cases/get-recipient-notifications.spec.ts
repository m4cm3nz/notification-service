import { InMemoryNotificatioRepository } from '../../../test/repositories/notification-repository';
import { GetRecipientNotification } from './get-recipient-notifications';
import { SendNotification } from './send-notification';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificatioRepository = new InMemoryNotificatioRepository();
    const getRecipientNotification = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
