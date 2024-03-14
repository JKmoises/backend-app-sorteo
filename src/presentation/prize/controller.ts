import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { PrizeService } from "../services/prize.service";

export class PrizeController {
  constructor(private readonly prizeService: PrizeService) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  getPrizes = (req: Request, res: Response) => {
    this.prizeService
      .getAll()
      .then((prizes) => res.json(prizes))
      .catch((error) => this.handleError(error, res));
  };
}
