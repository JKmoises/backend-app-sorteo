import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PrizeService } from "../services/prize.service";
import { PrizeController } from "./controller";

export class PrizeRoutes {
  static get routes(): Router{
    const router = Router();

    const prizeService = new PrizeService();
    const controller = new PrizeController(prizeService);

    router.get("/", [AuthMiddleware.validateJWT], controller.getPrizes);

    return router;
  }
}