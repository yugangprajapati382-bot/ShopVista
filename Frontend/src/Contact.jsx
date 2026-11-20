import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Headphones,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Plus,
} from "lucide-react";
import "./Contact.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const change = (key, value) => {
    setForm((old) => ({ ...old, [key]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not send your message.");
      }

      setSent(true);
      setForm({ name: "", email: "", topic: "", message: "" });
    } catch (err) {
      setError(err.message || "Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="page">
      <section className="contact-top">
        <div className="wrap contact-top-in">
          <div>
            <span className="small-title">WE'RE ALL EARS</span>
            <h1>Let's talk<span>.</span></h1>
            <p>Questions, feedback, or just want to say hello? We'd love to hear from you.</p>
            <div className="crumb"><NavLink to="/">Home</NavLink> / Contact</div>
          </div>
          <div className="contact-art">
            <span><Headphones size={78} /></span>
            <i><Mail size={20} /></i>
            <b><Send size={20} /></b>
          </div>
        </div>
      </section>

      <section className="wrap contact-area">
        <div className="contact-info">
          <span className="small-title">GET IN TOUCH</span>
          <h2>Here for the<br /><em>little details.</em></h2>
          <p className="contact-intro">Our friendly team is ready to help with orders, products or anything else on your mind.</p>

          <div className="detail">
            <span><Mail /></span>
            <div><small>Email us</small><b>hello@shopvista.example</b><p>We usually reply within one business day.</p></div>
          </div>
          <div className="detail">
            <span><Phone /></span>
            <div><small>Call us</small><b>+1 (800) 555-0199</b><p>Monday – Friday, 9am – 6pm</p></div>
          </div>
          <div className="detail">
            <span><MapPin /></span>
            <div><small>Visit us</small><b>Studio 08, Market Street</b><p>By appointment</p></div>
          </div>
          <div className="detail">
            <span><Clock /></span>
            <div><small>Opening hours</small><b>Monday – Friday</b><p>9:00 AM – 6:00 PM</p></div>
          </div>
        </div>

        <div className="form-box">
          <span className="small-title">SEND A NOTE</span>
          <h2>How can we help?</h2>
          <p>Fill in the form and we'll get back to you soon.</p>

          {sent ? (
            <div className="sent">
              <CheckCircle2 size={42} />
              <h3>Message received!</h3>
              <p>Thanks for reaching out. Our team will be in touch soon.</p>
              <button className="btn dark" onClick={() => setSent(false)}>Send another message</button>
            </div>
          ) : (
            <form className="form" onSubmit={submit}>
              <div className="form-row">
                <label>Your name
                  <input required maxLength="100" value={form.name} onChange={(e) => change("name", e.target.value)} placeholder="Your name" />
                </label>
                <label>Email address
                  <input required type="email" maxLength="254" value={form.email} onChange={(e) => change("email", e.target.value)} placeholder="you@example.com" />
                </label>
              </div>

              <label>What can we help with?
                <select value={form.topic} onChange={(e) => change("topic", e.target.value)}>
                  <option value="">Choose a topic</option>
                  <option>Order enquiry</option>
                  <option>Product question</option>
                  <option>Returns and refunds</option>
                  <option>Something else</option>
                </select>
              </label>

              <label>Your message
                <textarea required maxLength="5000" rows="5" value={form.message} onChange={(e) => change("message", e.target.value)} placeholder="Write your message..." />
              </label>

              {error && <small className="error">{error}</small>}
              <button className="btn" disabled={sending}>
                {sending ? "Sending..." : "Send message"} <Send size={16} />
              </button>
              <small className="note">Your details are only used to reply to your message.</small>
            </form>
          )}
        </div>
      </section>

      <section className="wrap faq">
        <div>
          <span className="small-title">A QUICK ANSWER</span>
          <h2>Frequently asked<br /><em>questions.</em></h2>
        </div>
        <div className="faq-list">
          {[
            { q: "When will my order arrive?", a: "Most orders are dispatched within 1–2 business days. Delivery estimates are shown at checkout." },
            { q: "Can I return an item?", a: "Eligible items can be returned within 30 days of delivery, provided they are unused and in their original condition." },
            { q: "How can I track my order?", a: "Once your order ships, you will receive an email with a tracking link and delivery updates." },
          ].map((item) => (
            <details key={item.q}>
              <summary>{item.q}<Plus size={18} /></summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Contact;
