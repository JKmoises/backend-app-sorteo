import { Validators } from "../../../config";

export class UpdateRaffleDto {
  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly createdAt: Date,
    public readonly endAt: Date,
    public readonly prize: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateRaffleDto?] {
    const {
      name,
      description,
      createdAt = new Date(),
      endAt,
      prize,
    } = object;

    if (!name) return ["El nombre es requerido"];
    if (!description) return ["La descripción es requerida"];
    
    if(!createdAt) return ["La fecha de inicio es requerida"];
    if (!endAt) return ["La fecha de finalización es requerida"];

    if (!prize) return ["El premio es requerido"];
    if (!Validators.isMongoID(prize)) return ["ID de premio inválido"];

    return [undefined, new UpdateRaffleDto(name, description, createdAt,endAt, prize)];
  }
}
