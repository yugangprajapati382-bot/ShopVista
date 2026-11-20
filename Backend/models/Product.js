import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  oldPrice: { type: Number, min: 0 },
  image: { type: String, default: "" },
  description: { type: String, default: "" },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  reviews: { type: Number, min: 0, default: 0 },
  featured: { type: Boolean, default: false },
  stock: { type: Number, min: 0, default: 0 }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
