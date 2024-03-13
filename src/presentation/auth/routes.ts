import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const authService = new AuthService();

    const authController = new AuthController(authService);

    // Definir las rutas
    router.post("/login", authController.loginUser);


    return router;
  }
}
