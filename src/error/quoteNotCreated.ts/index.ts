export class QuoteNotCreatedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QuoteNotCreatedError";
  }
}