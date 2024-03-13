import { Validators } from '../../../config/validators';
export class CreateRaffleDto {
  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly active: boolean,
    public readonly createAt: Date,
    public readonly endAt: Date,
    public readonly prize: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, CreateRaffleDto?] {
    const {
      name,
      description,
      active = false,
      createAt = new Date(),
      endAt,
      prize,
    } = object;
    let activeBoolean = active;

    if (!name) return ["Missing name"];
    if (typeof active !== "boolean") {
      activeBoolean = active === "true";
    }
    if (!endAt) return ["Missing end date"];

    if (!prize) return ["Missing prize"];
    if(!Validators.isMongoID(prize)) return ["Invalid prize ID"];


    return [
      undefined,
      new CreateRaffleDto(
        name,
        description,
        activeBoolean,
        createAt,
        endAt,
        prize,
      )
    ];
  }
}
