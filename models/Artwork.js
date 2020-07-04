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
      type: Date,
      required: [true, "An artwork must have a year"],
    },
    medium: {
      type: String,
    },
    description: {
      type: String,
      max: [500, "You must not exceen 500 characters"],
    },
  },
  { timestamps: true }
);

module.exports = model("Artwork", artworkSchema);
