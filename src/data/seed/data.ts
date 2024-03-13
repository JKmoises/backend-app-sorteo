import { BcryptAdapter } from "../../config";

export const seedData = {
  users: [
    {
      name: "Usuario 1",
      email: "usuario1@gmail.com",
      password: BcryptAdapter.hash("123456"),
    },
    {
      name: "Usuario 2",
      email: "usuario2@gmail.com",
      password: BcryptAdapter.hash("123456"),
    },
    {
      name: "Usuario 3",
      email: "usuario3@gmail.com",
      password: BcryptAdapter.hash("123456"),
    },
    {
      name: "Usuario 4",
      email: "usuario4@gmail.com",
      password: BcryptAdapter.hash("123456"),
    },
    {
      name: "Usuario 5",
      email: "usuario5@gmail.com",
      password: BcryptAdapter.hash("123456"),
    },
    {
      name: "Usuario 6",
      email: "usuario6@gmail.com",
      password: BcryptAdapter.hash("123456"),
    },
  ],
};