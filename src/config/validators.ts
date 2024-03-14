import mongoose from "mongoose";

export class Validators {
  static isMongoID(id: string) {
    return mongoose.isValidObjectId(id);
  }

  static mongoId(id: string) {
    return new mongoose.Types.ObjectId(id);
  }
  
}
