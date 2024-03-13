import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserModel } from "../../data";
import { JwtAdapter, BcryptAdapter, envs } from "../../config";
import { EmailService } from "./email.service";

export class AuthService {
  // Dependencies Inyection
  constructor(private readonly emailService: EmailService) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest("Email already exists");

    try {
      const user = new UserModel(registerUserDto);

      user.password = BcryptAdapter.hash(registerUserDto.password);

      await user.save();

      await this.sendEmailValidationLink(user.email);

      //* Convertimos el usuario a una entidad UserEntity
      const { password, ...userEntity } = UserEntity.fromObject(user);

      //* JWT para mantener la autenticación del usuario
      const token = await JwtAdapter.generateToken({ id: user.id });
      //* Si no se pudo crear el token JWT, lanzamos un error
      if (!token) throw CustomError.internalServer("Error while creating JWT");

      return {
        user: userEntity,
        token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.badRequest("Email not exist");

    const isMatching = BcryptAdapter.compare(
      loginUserDto.password,
      user.password!
    );
    if (!isMatching) throw CustomError.badRequest("Password is not valid");

    const { password, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({ id: user.id });
    if (!token) throw CustomError.internalServer("Error while creating JWT");

    return {
      user: userEntity,
      token,
    };
  }

  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer("Error getting token");

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
    const htmlBody = /*html*/ `
      <h1>Verifica tu email</h1>
      <p>Haz click en el siguiente enlace para verificar tu email.</p>
      <a href="${link}">Valida tu email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: "Verifica tu email",
      htmlBody,
    };

    const isSent = await this.emailService.sendEmail(options);
    if (!isSent) throw CustomError.internalServer("Error sending email");

    return true;
  };

  public async validateEmail(token: string) {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.unauthorized("Invalid token");

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer("Email not in token");

    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.badRequest("User not exist");

    user.emailValidated = true;

    await user.save();

    return true;
  }
}
