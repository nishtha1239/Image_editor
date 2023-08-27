const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    image: String,
    tags: [String],
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
