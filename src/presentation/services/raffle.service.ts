import { RaffleModel, UserModel } from "../../data";
import { CreateRaffleDto, CustomError, UpdateRaffleDto } from "../../domain";
import { Validators } from "../../config";

export class RaffleService {
  public async getAll() {
    try {
      const raffles = await RaffleModel.find()
        .populate("prize")
        .populate("users", ["name", "email"]);

      return raffles;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getLatestRaffle() {
    try {
      const raffle = await RaffleModel.findOne().sort({ createAt: -1 })
        .populate("prize", ["name", "description", "id"])
      
      if (!raffle) throw CustomError.notFound("Raffle not found");

      return {
        id: raffle.id,
        name: raffle.name,
        description: raffle.description,
        prize: raffle.prize,
        createAt: raffle.createAt,
        endAt: raffle.endAt,
      
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async findById(id: string) {
    const raffle = await RaffleModel.findById(id)
      .populate("prize", ["name", "description", "id"])
      .populate("users", ["name", "email", "winner"]);
    

    if (!raffle) throw CustomError.notFound(`Raffle with id ${id} not found`);

    return raffle;
  }

  public async create(createRaffleDto: CreateRaffleDto) {
    const startOfDay = Validators.startDay(createRaffleDto.createAt);
    const endOfDay = Validators.endDay(createRaffleDto.createAt);

    const raffleExists = await RaffleModel.findOne({
      createAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (raffleExists) throw CustomError.badRequest("El sorteo ya existe con la fecha de inicio");

    try {
      const raffle = new RaffleModel(createRaffleDto);

      await raffle.save();

      return {
        id: raffle.id,
        name: raffle.name,
        description: raffle.description,
        prize: raffle.prize,
        createAt: raffle.createAt,
        endAt: raffle.endAt,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async updateById(id: string, updateRaffleDto: UpdateRaffleDto) {
    await this.findById(id);

    const startOfDay = Validators.startDay(updateRaffleDto.createAt);
    const endOfDay = Validators.endDay(updateRaffleDto.createAt);

    const raffleExists = await RaffleModel.findOne({
      createAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (raffleExists) throw CustomError.badRequest("El sorteo ya existe con la fecha de inicio");

    try {

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
    const userIdObj = Validators.mongoId(userId);
    const raffle = await RaffleModel.findById(raffleId);

    if (!raffle) throw CustomError.notFound(`Raffle with id ${raffleId} not found`);
    if (raffle.users.includes(userIdObj)) throw CustomError.badRequest("¡Ya estas participando, suerte en el sorteo!");

    try {
      raffle.users.push(userIdObj);

      await raffle.save();

      return raffle;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async toggleUserAsWinner(raffleId: string, userId: string) {
    const userIdObj = Validators.mongoId(userId);
    const raffle = await this.findById(raffleId);

    const existUser = raffle.users.some((user) => user._id.toString() === userId);
    if (!existUser) throw CustomError.badRequest("El usuario no existe en el sorteo");
    try {
      
      if (raffle.winner && raffle.winner.toString() === userId) {
        raffle.winner = null;
      } else {
        raffle.winner = userIdObj;
      }
      
      await raffle.save();

      return {
        winner: Boolean(raffle.winner),
        userId: raffle.winner,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
