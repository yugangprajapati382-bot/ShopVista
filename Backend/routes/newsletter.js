import { Router } from "express";
import Subscriber from "../models/Subscriber.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }
    const existing = await Subscriber.findOne({ email }).lean();
    if (existing) return res.json({ success: true, message: "You're already subscribed. Thank you!" });

    await Subscriber.create({ email });
    res.status(201).json({ success: true, message: "Thanks for subscribing!" });
  } catch (error) {
    next(error);
  }
});

export default router;
