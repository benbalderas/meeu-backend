const { Schema, model, models } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "You must add an email"],
      validate: {
        message: "Email already has an account",
        validator: async (email) => {
          const items = await models["User"].count({ email });
          return items < 1;
        },
      },
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
    museum: { type: Schema.Types.ObjectId, ref: "Museum" },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
