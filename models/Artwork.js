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
      max: [1000, "You must not exceed 1000 characters"],
    },
    exhibit: { type: Schema.Types.ObjectId, ref: "Exhibit" },
  },
  { timestamps: true }
);

module.exports = model("Artwork", artworkSchema);
