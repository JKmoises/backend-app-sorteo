import { BcryptAdapter } from "../../config";

export const seedData = {
  users: [
    {
      name: "Usuario 1",
      email: "usuario1@gmail.com",
      password: BcryptAdapter.hash("123456"),
      emailValidated: true,
      role: "ADMIN_ROLE",
    },
    {
      name: "Usuario 2",
      email: "usuario2@gmail.com",
      password: BcryptAdapter.hash("123456"),
      emailValidated: true,
    },
    {
      name: "Usuario 3",
      email: "usuario3@gmail.com",
      password: BcryptAdapter.hash("123456"),
      emailValidated: true,
    },
    {
      name: "Usuario 4",
      email: "usuario4@gmail.com",
      password: BcryptAdapter.hash("123456"),
      emailValidated: true,
    },
    {
      name: "Usuario 5",
      email: "usuario5@gmail.com",
      password: BcryptAdapter.hash("123456"),
      emailValidated: true,
    },
    {
      name: "Usuario 6",
      email: "usuario6@gmail.com",
      password: BcryptAdapter.hash("123456"),
      emailValidated: true,
    },
  ],
  raffles: [
    {
      name: "!Sorteo de Programadores",
      description: `¡Participa en nuestro emocionante sorteo de programación y tienes la oportunidad de ganar cursos gratuitos y herramientas exclusivas que potenciarán tu desarrollo como programador!`,
      createAt: new Date("2024-03-17"),
      endAt: new Date("2024-03-26"),
    },
    {
      name: "Sorteo de Verano",
      description:
        "¡Participa en nuestro sorteo especial de verano y gana grandes premios!",
      createAt: new Date("2024-03-01"),
      endAt: new Date(),
    },
    {
      name: "Gran Sorteo de Navidad",
      description:
        "¡Celebra la temporada navideña participando en nuestro gran sorteo!",
      createAt: new Date("2024-03-04"),
      endAt: new Date(),
    },
    {
      name: "Sorteo de Cumpleaños de la Empresa",
      description:
        "¡Celebra nuestro aniversario participando en nuestro sorteo especial!",
      createAt: new Date("2024-03-05"),
      endAt: new Date(),
    },
    {
      name: "Sorteo de Primavera",
      description:
        "¡Da la bienvenida a la primavera participando en nuestro sorteo especial!",
      createAt: new Date("2024-03-06"),
      endAt: new Date(),
    },
  ],
  prizes: [
    {
      name: "Cursos HTML5,CSS3,etc",
      description: `¡Participa en nuestro sorteo y podrías ganar cursos gratuitos de HTML5, CSS3, Python y más! Impulsa tu carrera como programador con herramientas exclusivas para tu desarrollo profesional.`,
    },
    {
      name: "Tarjeta de Regalo",
      description:
        "Una tarjeta de regalo de $100 para compras en cualquier tienda asociada.",
    },
    {
      name: "Paquete de Vacaciones",
      description:
        "Un paquete todo incluido para dos personas a un destino sorpresa.",
    },
    {
      name: "Cena de Lujo",
      description:
        "Una cena de lujo para dos personas en el restaurante más exclusivo de la ciudad.",
    },
    {
      name: "Vale de Compras",
      description:
        "Un vale de compras de $50 para gastar en nuestra tienda en línea.",
    },
  ],
};
