import mongoose, { Schema } from "mongoose";

const raffleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  createAt: {
    type: Date,
    required: [true, "Create date is required"],
    unique: true,
    timestamps: true,
  },
  endAt: {
    type: Date,
    required: [true, "End date is required"],
  },
  active: {
    type: Boolean,
    default: true,
  },
  prize: {
    type: Schema.Types.ObjectId,
    ref: "Prize",
    required: [true, "Prize is required"],
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  ],
  winner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

raffleSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
  },
});

export const RaffleModel = mongoose.model("Raffle", raffleSchema);
