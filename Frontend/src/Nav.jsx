import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBag, Search, Heart, Menu, X, Truck, ShieldCheck } from "lucide-react";
import "./Nav.css";

function Nav({ cartCount, wishCount, search, setSearch }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <div className="top">
        <div className="wrap top-in">
          <span><Truck size={15} /> Free delivery on orders over $99</span>
          <span className="top-mid">Thoughtful finds. Better everyday.</span>
          <span><ShieldCheck size={15} /> Safe and secure shopping</span>
        </div>
      </div>

      <header className="nav">
        <div className="wrap nav-in">
          <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>

          <NavLink to="/" className="logo" onClick={close}>
            <span className="logo-icon"><ShoppingBag size={21} /></span>
            <span>Shop<span>Vista</span></span>
          </NavLink>

          <nav className={open ? "links active" : "links"}>
            <NavLink to="/" end onClick={close}>Home</NavLink>
            <NavLink to="/shop" onClick={close}>Shop</NavLink>
            <NavLink to="/about" onClick={close}>About</NavLink>
            <NavLink to="/contact" onClick={close}>Contact</NavLink>
          </nav>

          <label className="search">
            <Search size={18} />
            <input type="search" placeholder="Search products..." value={search}
              onChange={(e) => setSearch(e.target.value)} />
          </label>

          <div className="nav-icons">
            <NavLink to="/cart" className="bag-link" aria-label="Shopping bag">
              <ShoppingBag size={20} />
              <span>{cartCount}</span>
            </NavLink>
            <button aria-label="Wishlist" type="button">
              <Heart size={20} />
              <span>{wishCount}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Nav;
