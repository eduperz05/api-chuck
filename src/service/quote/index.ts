import { QuoteRepository } from "../../API/repositories/quote";
import { QuoteNotFoundError } from "../../error/quoteNotFoundError.ts";
import { QuoteNotCreatedError } from "../../error/quoteNotCreated.ts";
import { QuoteBadFormat } from "../../error/quoteBadFormat";

export const createQuote = async(quote: object, repository: QuoteRepository) => {
  const createdQuote = await repository.create(quote);
  if (!createdQuote) {
    throw new QuoteNotCreatedError("Error Creating Quote.");
  }
  return createdQuote;
};


export const findByWord = async(word: string, quoteRepository: QuoteRepository) => {
  const quotes = await quoteRepository.findByWord(word);
  if (!quotes.length) {
    throw new QuoteNotFoundError("No quotes found in database.");
  }
  const allQuotesContainWord = quotes.every((quote: any) => quote.message.includes(word));
  if (!allQuotesContainWord) {
    throw new QuoteBadFormat("Quotes don't contain the word.");
  }
  return quotes;
};

export const findRandom = async(quoteRepository: QuoteRepository) => {
  const quote = await quoteRepository.findRandom();
  if (!quote) {
    throw new QuoteNotFoundError("There's no quotes in database.");
  }
  return quote;
};


export const findByCategory = async(category: string, quoteRepository: QuoteRepository) => {
  const quote = await quoteRepository.findByCategory(category);
  if (!quote.length) {
    throw new QuoteNotFoundError("No quotes found in database.");
  }
  return quote;
};
