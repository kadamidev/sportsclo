const mongoose = require("mongoose")

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "Image url is required"],
  },
  alt: {
    type: String,
    required: [true, "Alt is required"],
  },
})

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item name is required"],
  },
  image: {
    type: ImageSchema,
    required: [true, "Image is required"],
  },
  description: {
    type: String,
    required: [true, "Item description is required"],
  },
  options: Array,
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  sports: {
    type: mongoose.Schema.Types.Mixed,
  },
  categories: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.models.Item || mongoose.model("Item", ItemSchema)
