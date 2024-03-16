import mongoose from "mongoose";

export class Validators {
  static isMongoID(id: string) {
    return mongoose.isValidObjectId(id);
  }

  static mongoId(id: string) {
    return new mongoose.Types.ObjectId(id);
  }

  static startDay(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    return startOfDay;
  }

  static endDay(date: Date) {
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return endOfDay;
  }
}
