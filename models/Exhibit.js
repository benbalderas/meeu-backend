const { Schema, model } = require("mongoose");

const exhibitSchema = new Schema({
  title: {
    type: String,
    required: [true, "An exhibit must have a title"],
  },
  description: {
    type: String,
    required: [true, "An exhibit must have a description"],
    max: [550, "You should not exceed 550 characters"],
  },
  type: {
    type: String,
    enum: ["Permanent", "Temporary"],
    required: [true, "An exhibit must have a title"],
  },
  endDate: {
    type: Date,
  },
  museum: { type: Schema.Types.ObjectId, ref: "Museum" },
});

module.exports = model("Exhibit", exhibitSchema);
