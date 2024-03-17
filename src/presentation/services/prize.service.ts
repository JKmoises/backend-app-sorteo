import { PrizeModel } from "../../data";
import { CustomError } from "../../domain";

export class PrizeService {
  constructor() {}

  public async getAll() {
    try {
      const raffles = await PrizeModel.find()
        

      return raffles;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}