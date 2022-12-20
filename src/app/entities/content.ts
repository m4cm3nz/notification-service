export class Content {
  private readonly _value: string;

  get value(): string {
    return this._value;
  }

  private validateContentLength(content: string) {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isValidContentLength = this.validateContentLength(content);

    if (!isValidContentLength)
      throw new Error('Content should be beteen 5 and 240 characters');

    this._value = content;
  }
}
