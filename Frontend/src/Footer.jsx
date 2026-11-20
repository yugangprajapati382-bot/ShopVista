import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ShoppingBag,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import "./Footer.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not subscribe.");
      }

      setDone(true);
      setMessage(data.message || "Thanks for subscribing!");
      setEmail("");
    } catch (err) {
      setDone(false);
      setMessage(err.message || "Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <NavLink to="/" className="logo">
              <span className="logo-icon"><ShoppingBag size={21} /></span>
              <span>Shop<span>Vista</span></span>
            </NavLink>
            <p>Curated essentials for a life well lived. Discover pieces you'll love, made for your everyday.</p>
            <div className="social">
              <a href="https://www.instagram.com/" aria-label="Instagram" target="_blank"><Instagram /></a>
              <a href="https://www.facebook.com/" aria-label="Facebook" target="_blank"><Facebook /></a>
              <a href="https://www.youtube.com/" aria-label="YouTube" target="_blank"><Youtube /></a>
              <a href="https://www.linkedin.com/" aria-label="LinkedIn" target="_blank"><Linkedin /></a>
            </div>
          </div>

          <div className="foot-links">
            <h3>Explore</h3>
            <NavLink to="/shop">All products</NavLink>
            <NavLink to="/shop">New arrivals</NavLink>
            <NavLink to="/shop">Best sellers</NavLink>
            <NavLink to="/about">Our story</NavLink>
          </div>

          <div className="foot-links">
            <h3>Customer care</h3>
            <NavLink to="/contact">Contact us</NavLink>
            <a href="/contact">Shipping and returns</a>
            <a href="/contact">FAQs</a>
            <a href="#privacy">Privacy policy</a>
          </div>

          <div className="letter">
            <span className="small-title">THE VISTA LETTER</span>
            <h3>Good things, in your inbox.</h3>
            <p>Get first access to new arrivals, thoughtful edits and special offers.</p>
            <form onSubmit={submit}>
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button aria-label="Subscribe" disabled={loading}>
                <ArrowRight size={18} />
              </button>
            </form>
            {message && (
              <small className={done ? "success" : "error"}>
                {done && <CheckCircle2 size={14} />} {message}
              </small>
            )}
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 ShopVista. All rights reserved.</span>
          <span>Designed for better everyday living.</span>
          <span>VISA · Mastercard · PayPal</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
