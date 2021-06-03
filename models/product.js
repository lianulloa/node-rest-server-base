const { Schema, model} = require("mongoose")

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true
  },
  status: {
    type: Boolean,
    default: true,
    required: [true, "status is required"]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  description: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  }
})

module.exports = model("Product", ProductSchema)