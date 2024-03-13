import { envs } from "../../config";
import { PrizeModel } from "../mongo/models/prize-model";
import { RaffleModel } from "../mongo/models/raffle-model";
import { UserModel } from "../mongo/models/user.model";
import { MongoDatabase } from "../mongo/mongo-database";
import { seedData } from "./data";


(async () => {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();

  await MongoDatabase.disconnect();
})();

async function main() {

  await Promise.all([
    UserModel.deleteMany(),
    RaffleModel.deleteMany(),
    PrizeModel.deleteMany(),
    UserModel.insertMany(seedData.users),
    RaffleModel.insertMany(seedData.raffles),
    PrizeModel.insertMany(seedData.prizes),
  ]);

  console.log("SEEDED");
}


