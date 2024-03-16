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
      active = true,
      createAt = new Date(),
      endAt,
      prize,
    } = object;
    let activeBoolean = active;

    if (!name) return ["El nombre es requerido"];
    if (!description) return ["La descripción es requerida"];
    
    if (typeof active !== "boolean") {
      activeBoolean = active === "true";
    }

    if(!createAt) return ["La fecha de inicio es requerida"];
    if (!endAt) return ["La fecha de finalización es requerida"];

    if (!prize) return ["El premio es requerido"];
    if(!Validators.isMongoID(prize)) return ["ID de premio inválido"];


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
