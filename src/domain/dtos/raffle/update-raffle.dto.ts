import { Validators } from "../../../config";

export class UpdateRaffleDto {
  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly endAt: Date,
    public readonly prize: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateRaffleDto?] {
    const {
      name,
      description,
      endAt,
      prize,
    } = object;

    if (!name) return ["Missing name"];
    if (!endAt) return ["Missing end date"];

    if (!prize) return ["Missing prize"];
    if (!Validators.isMongoID(prize)) return ["Invalid prize ID"];

    return [undefined, new UpdateRaffleDto(name, description, endAt, prize)];
  }
}
