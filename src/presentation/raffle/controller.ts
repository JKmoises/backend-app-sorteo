import { Request, Response } from "express";
import { RaffleService } from "../services";
import { CreateRaffleDto, CustomError, UpdateRaffleDto } from "../../domain";

export class RaffleController {
  constructor(private readonly raffleService: RaffleService) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  getRaffles = (req: Request, res: Response) => {
    this.raffleService
      .getAll()
      .then((raffles) => res.json(raffles))
      .catch((error) => this.handleError(error, res));
  };

  getLatestRaffle = (req: Request, res: Response) => {
    this.raffleService
      .getLatestRaffle()
      .then((raffle) => res.json(raffle))
      .catch((error) => this.handleError(error, res));
  };

  getRaflleById = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Invalid id" });

    this.raffleService
      .findById(id)
      .then((raffle) => res.json(raffle))
      .catch((error) => this.handleError(error, res));
  };

  createRaffle = (req: Request, res: Response) => {
    const [error, createRaffleDto] = CreateRaffleDto.create({
      ...req.body,
      user: req.body.user.id,
    });
    if (error) return res.status(400).json({ error });

    this.raffleService
      .create(createRaffleDto!)
      .then((raffle) => res.status(201).json(raffle))
      .catch((error) => this.handleError(error, res));
  };

  updateRaffle = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Invalid id" });

    const [error, updateRaffleDto] = UpdateRaffleDto.create({
      ...req.body,
      user: req.body.user.id,
    });
    if (error) return res.status(400).json({ error });

    this.raffleService
      .updateById(id, updateRaffleDto!)
      .then((raffle) => res.json(raffle))
      .catch((error) => this.handleError(error, res));
  };

  deleteRaffle = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Invalid id" });

    this.raffleService
      .deleteById(id)
      .then((raffle) => res.json(raffle))
      .catch((error) => this.handleError(error, res));
  };

  createUserInRaffle = (req: Request, res: Response) => {
    const raffleId = req.params.id;
    const userId = req.body.user.id;

    if (!raffleId) return res.status(400).json({ error: "Invalid id" });

    this.raffleService
      .createUserInRaffle(raffleId, userId)
      .then((raffle) => res.json(raffle))
      .catch((error) => this.handleError(error, res));
  };

  markUserAsWinner = (req: Request, res: Response) => {
    const raffleId = req.params.id;
    const userId = req.params.userid;

    if (!raffleId) return res.status(400).json({ error: "Invalid raffle id " });
    if (!userId) return res.status(400).json({ error: "Invalid user id " });

    this.raffleService
      .toggleUserAsWinner(raffleId, userId)
      .then((raffle) => res.json(raffle))
      .catch((error) => this.handleError(error, res));
  };
}
