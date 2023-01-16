import { findByWord, findRandom } from ".";
import { HistoryRepository } from "../../API/repositories/history";
import { QuoteRepository } from "../../API/repositories/quote";

class QuoteRepositoryMock implements QuoteRepository {
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

class HistoryRepositoryMock implements HistoryRepository {
  public create(): any {
    return null;
  }

  public findByIdAPI(): any {
    return null;
  }

  public findBySearch(): any {
    return null;
  }
}

const quoteRepository = new QuoteRepositoryMock();
const historyRepository = new HistoryRepositoryMock();
const options = {};
const search = "hello";


describe("findByWord Service", () => {
  const axiosResponse = {
    data: {
      result: [
        {
          id: 1,
          value: "Hello World",
          url: "",
          icon_url: ""
        }
      ]
    }
  };
  
  const emptyQuote = {
    data: {
      result: []
    }
  };

  const quotes = {
    rows: [
      {
        message: "hello world",
        toJSON: () => {
          return { message: "hello world" };
        }
      }
    ]
  };
  
  const jsonedQuotes = {
    rows: [
      {
        message: "hello world"
      }
    ]
  };
  
  it("Should return 'No quotes found in database.'", async() => {
    quoteRepository.findByWord = jest.fn().mockReturnValue(Promise.resolve(emptyQuote));
    await expect(findByWord(search, options, quoteRepository, historyRepository)).rejects.toThrowError(`No quotes found with the query "${search}".`);
  });

  it("should create a quote", async() => {
    quoteRepository.findByWord = jest.fn().mockReturnValue(Promise.resolve(axiosResponse));
    historyRepository.findByIdAPI = jest.fn().mockReturnValue(Promise.resolve(true));
    historyRepository.findBySearch = jest.fn().mockReturnValue(Promise.resolve(quotes));
    await expect(findByWord("Hello", options, quoteRepository, historyRepository)).resolves.toEqual(jsonedQuotes);
  });
});


describe("findRandom Service", () => {
  it("Should return 'Coudn't connect with the API.'", async() => {
    quoteRepository.findRandom = jest.fn().mockReturnValue(Promise.resolve(null));
    await expect(findRandom(quoteRepository)).rejects.toThrowError("Coudn't connect with the API.");
  });
  
  it("Should return 'Coudn't connect with the API.'", async() => {
    quoteRepository.findByCategory = jest.fn().mockReturnValue(Promise.resolve(null));
    await expect(findRandom(quoteRepository, "test")).rejects.toThrowError("Coudn't connect with the API.");
  });

  const quote = {
    data: {
      value: "Hello World."
    }
  };
  it("should return a quote", async() => {
    quoteRepository.findRandom = jest.fn().mockReturnValue(Promise.resolve(quote));
    await expect(findRandom(quoteRepository)).resolves.toEqual(quote.data);
  });
});