const { Schema, model } = require("mongoose");

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
          const items = await mongoose.models["User"].count({ email });
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
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
