import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  topic: { type: String, trim: true, maxlength: 100, default: "General enquiry" },
  message: { type: String, required: true, trim: true, maxlength: 5000 },
  status: { type: String, enum: ["new", "read", "closed"], default: "new" }
}, { timestamps: true });

export default mongoose.model("ContactMessage", contactMessageSchema);
