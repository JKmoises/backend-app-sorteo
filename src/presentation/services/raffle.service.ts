import { RaffleModel } from "../../data";
import { CreateRaffleDto, CustomError, UpdateRaffleDto } from "../../domain";
import { Validators } from "../../config";

export class RaffleService {
  public async getAll() {
    try {
      const raffles = await RaffleModel.find()
        .populate("prize")
        .populate("users",["name","email"]);

      return raffles;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async findById(id: string) {
    const raffle = await RaffleModel.findById(id)
      .populate("prize", ["name", "description", "id"])
      .populate("users", ["name", "email"]);

    if (!raffle) throw CustomError.notFound(`Raffle with id ${id} not found`);

    return raffle;
  }

  public async create(createRaffleDto: CreateRaffleDto) {
    const raffleExists = await RaffleModel.findOne({
      name: createRaffleDto.name,
    });

    if (raffleExists) throw CustomError.badRequest("Raffle already exists");

    try {
      const raffle = new RaffleModel(createRaffleDto);

      await raffle.save();

      return raffle;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async updateById(id: string, updateRaffleDto: UpdateRaffleDto) {
    try {
      await this.findById(id);

      const updatedRaffle = await RaffleModel.findByIdAndUpdate(
        id,
        updateRaffleDto,
        { new: true }
      );

      return updatedRaffle;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async deleteById(id: string) {
    try {
      await this.findById(id);

      const deletedRaffle = await RaffleModel.findByIdAndDelete(id);

      return deletedRaffle;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async createUserInRaffle(raffleId: string, userId: string) {
    try {
      const userIdObj = Validators.mongoId(userId);
      const raffle = await RaffleModel.findById(raffleId);
      
      if (!raffle) throw CustomError.notFound(`Raffle with id ${raffleId} not found`);
      if (raffle.users.includes(userIdObj)) throw CustomError.badRequest("User already in raffle");
      
      raffle.users.push(userIdObj);

      await raffle.save();

      return raffle;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
