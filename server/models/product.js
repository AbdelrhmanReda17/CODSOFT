const mongoose = require("mongoose");

// Define the review schema
const reviewSchema = new mongoose.Schema({
  username: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Define the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  department: { type: String, required: true },
  imageUrl: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  discountPercentage: { type: Number, default: 0, min: 0, max: 100 },
  colors: { type: [String] },
  selled: { type: Number, default: 0 },
  reviews: [reviewSchema],
  AverageRating: { type: Number, default:0},
  sizes:{ type : [String]}
}, {
  timestamps: true, 
});

const Products = mongoose.model("products", productSchema);

module.exports = Products;
