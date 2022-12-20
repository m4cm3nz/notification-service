import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Você recebeu uma notificação de amizade'),
      category: 'social',
      recipientId: '1',
    });

    expect(notification).toBeTruthy();
  });
});
