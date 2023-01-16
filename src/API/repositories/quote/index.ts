import axios, { AxiosResponse } from "axios";

export interface QuoteRepository {
  findRandom(): Promise<any|null>;
  findByCategory(category: string): Promise<any|null>;
  findByWord(word: string): Promise<any|null>;
}

export class QuoteRepositoryAxios implements QuoteRepository {
  
  public async findRandom(): Promise<AxiosResponse> {
    return await axios.get("https://api.chucknorris.io/jokes/random");
  }

  public async findByCategory(category: string): Promise<AxiosResponse> {
    return await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
  }

  public async findByWord(query: string): Promise<AxiosResponse> {
    return await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
  }
}