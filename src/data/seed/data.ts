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
  raffles: [
    {
      name: "Rifa 1",
      description: "Rifa 1",
      endAt: new Date(),
    },
    {
      name: "Rifa 2",
      description: "Rifa 2",
      endAt: new Date(),
    },
    {
      name: "Rifa 3",
      description: "Rifa 3",
      endAt: new Date(),
    },
    {
      name: "Rifa 4",
      description: "Rifa 4",
      endAt: new Date(),
    },
    {
      name: "Rifa 5",
      description: "Rifa 5",
      endAt: new Date(),
    },
  ],
  prizes: [
    {
      name: "Premio 1",
      description: "Premio 1",
    },
    {
      name: "Premio 2",
      description: "Premio 2",
    },
    {
      name: "Premio 3",
      description: "Premio 3",
    },
    {
      name: "Premio 4",
      description: "Premio 4",
    },
    {
      name: "Premio 5",
      description: "Premio 5",
    },
  ],
};