import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import Nav from "./Nav";
import Home from "./Home";
import Shop from "./Shop";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Cart";
import Footer from "./Footer";

function App() {
  const [cart, setCart] = useState([]);
  const [wish, setWish] = useState([]);
  const [search, setSearch] = useState("");
  const location = useLocation();

  const addCart = (product) => {
    setCart((old) => {
      const found = old.find((item) => item.id === product.id);
      if (found) {
        return old.map((item) =>
          item.id === product.id ? { ...item, qty: ifem.qty + 1 } : item
        );
      }
      return [...old, { ...product, qty: 1 }];
    });
  };

  const changeQty = (id, amount) => {
    setCart((old) =>
      old
        .map((item) => item.id === id ? { ...item, qty: item.qty + amount } : item)
        .filter((item) => item.qty > 0)
    );
  };

  const removeCart = (id) => {
    setCart((old) => old.filter((item) => item.id !== id));
  };

  const addWish = (id) => {
    setWish((old) =>
      old.includes(id) ? old.filter((item) => item !== id) : [...old, id]
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const items = document.querySelectorAll(".move");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("show"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -35px 0px" });

    items.forEach((item, index) => {
      item.style.setProperty("--delay", `${(index % 4) * 70}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [location.pathname, search, cart.length]);

  const props = { cart, wish, search, addCart, addWish };

  return (
    <>
      <Nav
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
        wishCount={wish.length}
        search={search}
        setSearch={setSearch}
      />

      <Routes>
        <Route path="/" element={<Home {...props} />} />
        <Route path="/shop" element={<Shop {...props} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart cart={cart} changeQty={changeQty} removeCart={removeCart} />} />
        <Route path="*" element={<Home {...props} />} />
      </Routes>

      <Footer />

      {cart.length > 0 && (
        <div className="toast">
          <CheckCircle2 size={18} />
          <span>{cart.reduce((sum, item) => sum + item.qty, 0)} items in your bag</span>
          <button onClick={() => setCart([])}>Clear</button>
        </div>
      )}
    </>
  );
}

export default App;
