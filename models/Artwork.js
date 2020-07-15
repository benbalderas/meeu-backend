const { Schema, model } = require("mongoose");

const artworkSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "An artwork must have an image"],
    },
    title: {
      type: String,
      required: [true, "An artwork must have a title"],
    },
    author: {
      type: String,
    },
    year: {
      type: String,
      required: [true, "An artwork must have a year"],
    },
    medium: {
      type: String,
    },
    description: {
      type: String,
      max: [700, "You must not exceed 500 characters"],
    },
    // agregar id de exhibicion
  },
  { timestamps: true }
);

module.exports = model("Artwork", artworkSchema);
