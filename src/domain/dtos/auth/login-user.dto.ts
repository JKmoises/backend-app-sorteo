import { regularExps } from "../../../config";

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ["El email es requerido"];
    if (!regularExps.email.test(email)) return ["El email no es válido"];
    if (!password) return ["La contraseña es requerida"];
    if (password.length < 6) return ["La contraseña es muy corta, debe tener al menos 6 caracteres"];

    return [undefined, new LoginUserDto(email, password)];
  }
}
