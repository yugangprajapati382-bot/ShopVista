import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { SlidersHorizontal, Search, ArrowRight } from "lucide-react";
import Card from "./Card";
import { products } from "./products";
import "./Shop.css";

function Shop({ wish, addCart, addWish, search }) {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [max, setMax] = useState(1200);

  const list = useMemo(() => {
    const result = products.filter((item) =>
      (category === "All" || item.category === category) &&
      item.price <= max &&
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [category, max, search, sort]);

  const reset = () => {
    setCategory("All");
    setMax(1200);
    setSort("featured");
  };

  return (
    <main className="page">
      <section className="shop-top">
        <div className="shop-bg"></div>
        <div className="wrap shop-top-in">
          <div className="shop-copy">
            <span className="small-title">THE SHOP · CURATED FOR EVERYDAY</span>
            <h1>Find something<br /><em>worth keeping.</em></h1>
            <p>Discover thoughtful essentials, modern favourites and little luxuries chosen to make every day feel better.</p>
            <div className="crumb"><NavLink to="/">Home</NavLink> / Shop</div>
          </div>
          <div className="shop-photo">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=90" alt="Curated fashion collection" />
            <span>THE EVERYDAY<br />COLLECTION</span>
          </div>
        </div>
      </section>

      <section className="wrap shop-area">
        <div className="shop-heading move">
          <div>
            <span className="small-title">SHOP THE COLLECTION</span>
            <h2>All the good things<span>.</span></h2>
            <p>Browse our complete edit of everyday favourites.</p>
          </div>
          <span className="shop-count">{list.length} products</span>
        </div>

        <div className="shop-tools move">
          <div className="shop-categories">
            {["All", "Electronics", "Fashion", "Home", "Beauty"].map((name) => (
              <button
                className={category === name ? "chip active" : "chip"}
                key={name}
                onClick={() => setCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="shop-sort">
            <label>
              <SlidersHorizontal size={16} />
              <span>Max price</span>
              <input type="range" min="50" max="1200" step="10" value={max} onChange={(e) => setMax(Number(e.target.value))} />
              <b>${max}</b>
            </label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
            <button className="reset" onClick={reset}>Reset</button>
          </div>
        </div>

        {list.length ? (
          <div className="cards shop-cards">
            {list.map((item) => (
              <Card key={item.id} product={item} addCart={addCart} addWish={addWish} wished={wish.includes(item.id)} />
            ))}
          </div>
        ) : (
          <div className="empty-shop">
            <Search size={30} />
            <h3>No products found</h3>
            <p>Try another search or clear your filters.</p>
            <button className="btn" onClick={reset}>Clear filters</button>
          </div>
        )}
      </section>

      <section className="shop-note move">
        <div className="wrap">
          <span className="small-title">A LITTLE MORE THOUGHTFUL</span>
          <h2>Good choices.<br /><em>Better everyday.</em></h2>
          <NavLink to="/about" className="more">Our story <ArrowRight size={17} /></NavLink>
        </div>
      </section>
    </main>
  );
}

export default Shop;
