import {
  CustomError,
  LoginUserDto,
  UserEntity,
} from "../../domain";
import { UserModel } from "../../data";
import { JwtAdapter, BcryptAdapter } from "../../config";
import { EmailService } from "./email.service";

export class AuthService {
  // Dependencies Inyection
  constructor() {}


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
