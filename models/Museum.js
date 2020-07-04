const { Schema, model } = require("mongoose");

const museumSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "Please add an image"],
    },
    name: {
      type: String,
      required: [true, "A musuem must have a name"],
    },
    country: {
      type: String,
      required: [true, "A museum must be located in a country"],
    },
    city: {
      type: String,
      required: [true, "A museum must be in a city"],
    },
    description: {
      type: String,
      required: [true, "A museum must have a description"],
      max: [150, "You should not exceed 150 characters"],
    },
    type: {
      type: String,
      enum: [
        "Art",
        "Encyclopedic",
        "History",
        "Military",
        "Natural History",
        "Science",
      ],
      default: "Encyclopedic",
    },
  },
  { timestamps: true }
);

module.exports = model("Museum", museumSchema);
