export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public imgSrc: string,
    public isBot: boolean
  ) {}
}
