import { Quote } from "../../models/quote/quote";
import * as sequelize from "sequelize";

export interface QuoteRepository {
  create(quote: any): Promise<Quote>;
  findRandom(): Promise<Quote|null>;
  findByWord(word: string): Promise<Quote[]>;
  findByCategory(category: string): Promise<Quote[]>;
}

export class QuoteRepositorySequelize implements QuoteRepository {
  
  public create(quote: any): Promise<Quote> {
    return Quote.create(quote);
  }

  public findRandom(): Promise<Quote|null> {
    return Quote.count().then((count: number) => {
      return Quote.findByPk(Math.floor(Math.random() * count));
    });
  }

  public findByWord(word: string): Promise<Quote[]> {
    return Quote.findAll({
      where: {
        message: { [sequelize.Op.like]: `%${word}%` }
      }
    });
  }

  public findByCategory(category: string): Promise<Quote[]> {
    return Quote.findAll({
      where: {
        category: category
      }
    });
  }
}