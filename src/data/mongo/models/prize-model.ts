import mongoose from "mongoose";

const prizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  description: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

prizeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
  },
});

//* Definimos el modelo de la colección de categorias
export const PrizeModel = mongoose.model("Prize", prizeSchema);
