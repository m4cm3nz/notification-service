import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma notificação de amizade');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less then 5 characteres', () => {
    expect(() => new Content('abcd')).toThrow();
  });

  it('should not be able to create a notification content with more then 240 characteres', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
