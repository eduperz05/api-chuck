export class QuoteBadFormat extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QuoteBadFormat";
  }
}