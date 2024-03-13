import mongoose, { Schema } from "mongoose";

const raffleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  description: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
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
  users: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
});

raffleSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
  },
});

export const RaffleModel = mongoose.model("Raffle", raffleSchema);
