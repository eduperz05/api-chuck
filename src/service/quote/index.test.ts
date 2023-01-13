import { createQuote, findByWord, findRandom, findByCategory } from ".";
import { QuoteRepository } from "../../API/repositories/quote";

class QuoteRepositoryMock implements QuoteRepository {
  public create(): any {
    return null;
  }

  public findByWord(): any {
    return null;
  }

  public findRandom(): any {
    return null;
  }

  public findByCategory(): any {
    return null;
  }
}

const quoteRepository = new QuoteRepositoryMock();

const quote = {
  message: "Hello World",
  category: "test"
};

describe("createQuote Service", () => {
  it("Should return 'Error Creating Quote.'", async() => {
    quoteRepository.create = jest.fn().mockReturnValue(Promise.resolve(null));
    await expect(createQuote(quote, quoteRepository)).rejects.toThrowError("Error Creating Quote.");
  });

  it("should create a quote", async() => {
    quoteRepository.create = jest.fn().mockReturnValue(Promise.resolve(quote));
    await expect(createQuote(quote, quoteRepository)).resolves.toEqual(quote);
  });
});

describe("findByWord Service", () => {
  it("Should return 'No quotes found in database.'", async() => {
    quoteRepository.findByWord = jest.fn().mockReturnValue(Promise.resolve([]));
    await expect(findByWord("Hello", quoteRepository)).rejects.toThrowError("No quotes found in database.");
  });

  it("should create a quote", async() => {
    quoteRepository.findByWord = jest.fn().mockReturnValue(Promise.resolve([quote]));
    await expect(findByWord("Hello", quoteRepository)).resolves.toEqual([quote]);
  });
});

describe("findByCategory Service", () => {
  it("Should return 'No quotes found in database.'", async() => {
    quoteRepository.findByCategory = jest.fn().mockReturnValue(Promise.resolve([]));
    await expect(findByCategory("test", quoteRepository)).rejects.toThrowError("No quotes found in database.");
  });

  it("should create a quote", async() => {
    quoteRepository.findByCategory = jest.fn().mockReturnValue(Promise.resolve([quote]));
    await expect(findByCategory("test", quoteRepository)).resolves.toEqual([quote]);
  });
});

describe("findRandom Service", () => {
  it("Should return 'There's no quotes in database.'", async() => {
    quoteRepository.findRandom = jest.fn().mockReturnValue(Promise.resolve(null));
    await expect(findRandom(quoteRepository)).rejects.toThrowError("There's no quotes in database.");
  });
  
  it("should create a quote", async() => {
    quoteRepository.findRandom = jest.fn().mockReturnValue(Promise.resolve(quote));
    await expect(findRandom(quoteRepository)).resolves.toEqual(quote);
  });
});