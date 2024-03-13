import { envs } from "../../config";
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
    await UserModel.deleteMany(),
    await UserModel.insertMany(seedData.users),
  ]);

  console.log("SEEDED");
}


