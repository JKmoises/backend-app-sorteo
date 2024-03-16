import { regularExps } from "../../../config/regular-exp";

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;

    if (!name) return ["El nombre es requerido"];
    if (!email) return ["El email es requerido"];
    if (!regularExps.email.test(email)) return ["El email no es válido"];
    if (!password) return ["La contraseña es requerida"];
    if (password.length < 6) return ["La contraseña es muy corta, debe tener al menos 6 caracteres"];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
