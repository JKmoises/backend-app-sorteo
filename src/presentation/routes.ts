import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { RaffleRoutes } from "./raffle/routes";
import { PrizeRoutes } from "./prize/routes";


export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    // Definir las rutas
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/raffle", RaffleRoutes.routes);
    router.use("/api/prize", PrizeRoutes.routes);

    return router;
  }
}
