import { QuoteRepository } from "../../API/repositories/quote";
import { QuoteNotFoundError } from "../../error/quoteNotFoundError.ts";
import { HistoryRepository } from "../../API/repositories/history";


export const findRandom = async(quoteRepository: QuoteRepository, category?: string) => {
  const quote = category ? await quoteRepository.findByCategory(category) : await quoteRepository.findRandom();
  if (!quote.data.value) {
    throw new QuoteNotFoundError("Coudn't connect with the API.");
  }
  return quote.data;
};

export const findByWord = async(search: string, options: object, quoteRepository: QuoteRepository, historyRepository: HistoryRepository) => {
  const response = await quoteRepository.findByWord(search);
  if (response.data.result.length == 0) {
    throw new QuoteNotFoundError(`No quotes found with the query ${search}.`);
  }
  const modelQuote = response.data.result.map((quote: { id: string; value: string; url: string; icon_url: string; created_at: string; updated_at: string; }) => {
    return {
      "id_chuck_norris_api": quote.id,
      "search": search,
      "value": quote.value,
      "url": quote.url,
      "icon_url": quote.icon_url
    };
  });
  await Promise.all(
    modelQuote.map(async(quote: any) => {
      const isStored = await historyRepository.findByIdAPI(quote.id_chuck_norris_api);
      if (!isStored) {
        await historyRepository.create(quote);
      }
    })
  );
  const quotes = await historyRepository.findBySearch(search, options);
  return quotes;
};

