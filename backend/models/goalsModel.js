const mongoose = require("mongoose");
const { User, userSchema } = require("./userModel");
const Schema = mongoose.Schema;

const GoalsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", GoalsSchema);
