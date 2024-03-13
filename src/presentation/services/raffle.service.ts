import { RaffleModel } from "../../data";
import { CreateRaffleDto, CustomError, UpdateRaffleDto } from "../../domain";

export class RaffleService {
  public async getAll() {
    try {
      const [nroUsers, raffles] = await Promise.all([
        RaffleModel.countDocuments(),
        RaffleModel.find()
          .populate("prize")
          .populate("user", ["name", "email", "emailValidated", "role"]),
      ]);

      return {
        raffles,
        nroUsers,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async findById(id: number) {
    const raffle = await RaffleModel.findById(id)
      .populate("prize")
      .populate("user", ["name", "email", "emailValidated", "role"]);

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

  public async updateById(id: number, updateRaffleDto: UpdateRaffleDto) {
    
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

  public async deleteById(id: number) {
    try {
      await this.findById(id);
      
      const deletedRaffle = await RaffleModel.findByIdAndDelete(id);

      return deletedRaffle;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
