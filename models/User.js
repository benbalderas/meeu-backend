const { Schema, model, models } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "You must add an email"],
    },
    password: {
      type: String,
      required: [true, "You must add a password"],
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "Visitor"],
      default: "Visitor",
    },
    museum: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
