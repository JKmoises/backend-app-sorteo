import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { RaffleService } from "../services";
import { RaffleController } from "./controller";

export class RaffleRoutes {
  static get routes(): Router {
    const router = Router();

    const raffleService = new RaffleService();
    const controller = new RaffleController(raffleService);

    // Definir rutas
    router.get("/",[AuthMiddleware.validateJWT], controller.getRaffles);
    router.get("/latest", controller.getLatestRaffle);
    router.get("/:id", [AuthMiddleware.validateJWT], controller.getRaflleById);

    router.post("/", [AuthMiddleware.validateJWT], controller.createRaffle);
    router.post(
      "/users/:id",
      [AuthMiddleware.validateJWT],
      controller.createUserInRaffle
    );

    router.put("/:id", [AuthMiddleware.validateJWT], controller.updateRaffle);
    router.put("/winner/:id/:userid", [AuthMiddleware.validateJWT], controller.markUserAsWinner);

    router.delete("/:id", [AuthMiddleware.validateJWT], controller.deleteRaffle);




    return router;
  }
}
