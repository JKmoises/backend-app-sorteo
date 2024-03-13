import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { RaffleRoutes } from "./raffle/routes";


export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/raffle", RaffleRoutes.routes);
    

    return router;
  }
}
