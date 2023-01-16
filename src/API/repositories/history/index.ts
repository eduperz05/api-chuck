import { History } from "../../models/history";

export interface HistoryRepository {
  create(fact: any): Promise<any|null>;
  findByIdAPI(id_api: string): Promise<any>;
  findBySearch(search: string, options: any): Promise<any>;
}

export class HistoryRepositorySequelize implements HistoryRepository {

  public async create(search: any): Promise<void> {
    try {
      await History.create(search);
    } catch (error) {
      throw new Error("Error storing on database.");
    }
    return;
  }

  public async findByIdAPI(id_api: string): Promise<boolean>{
    return await History.findOne({ where: { id_chuck_norris_api: id_api } }) ? true : false;
  }
  public async findBySearch(search: string, options: any): Promise<object> {
    return await History.findAndCountAll({ 
      where: { search: search },
      limit: options.limit,
      offset: options.skip
    });
  }
}