import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();

// GET /api/products?category=Fashion&search=shoe&sort=price-low
router.get("/", async (req, res, next) => {
  try {
    const { category, search, sort } = req.query;
    const filter = {};
    if (category && category !== "All") filter.category = category;
    if (search) filter.name = { $regex: String(search).slice(0, 80), $options: "i" };

    const sortOptions = {
      "price-low": { price: 1 },
      "price-high": { price: -1 },
      rating: { rating: -1 },
      newest: { createdAt: -1 }
    };

    const products = await Product.find(filter)
      .sort(sortOptions[sort] || { featured: -1, createdAt: -1 })
      .limit(100)
      .lean();

    res.json({ success: true, count: products.length, products });
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    if (!/^[a-f\d]{24}$/i.test(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid product id." });
    }
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });
    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
});

export default router;
