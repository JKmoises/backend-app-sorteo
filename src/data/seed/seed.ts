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

const randomBeetween0AndX = (x: number) => {
  return Math.floor(Math.random() * x);
};

async function main() {

  await Promise.all([
    UserModel.deleteMany(),
    RaffleModel.deleteMany(),
    PrizeModel.deleteMany(),
  ]);


  const [users,prizes] = await Promise.all([
    UserModel.insertMany(seedData.users),
    PrizeModel.insertMany(seedData.prizes),
  ]);

  await RaffleModel.insertMany(
    seedData.raffles.map((raffle) => ({
      ...raffle,
      prize: prizes[randomBeetween0AndX(prizes.length)]._id,
      users: [users[randomBeetween0AndX(users.length)]._id],
    
    }))
  ),

  console.log("SEEDED");
}


