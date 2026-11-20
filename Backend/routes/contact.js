import { Router } from "express";
import ContactMessage from "../models/ContactMessage.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { name, email, topic, message } = req.body || {};
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
    if (!name || !email || !message || !validEmail) {
      return res.status(400).json({ success: false, message: "Please provide a name, valid email and message." });
    }
    if (String(name).length > 100 || String(email).length > 254 || String(message).length > 5000) {
      return res.status(400).json({ success: false, message: "One or more fields are too long." });
    }

    const saved = await ContactMessage.create({
      name: String(name).trim(),
      email: String(email).trim(),
      topic: String(topic || "General enquiry").slice(0, 100),
      message: String(message).trim()
    });
    res.status(201).json({ success: true, message: "Thanks! Your message has been received.", id: saved._id });
  } catch (error) {
    next(error);
  }
});

export default router;
