import React from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import Card from "./Card";
import Benefits from "./Benefits";
import { products, categories } from "./products";
import "./Home.css";

function Home({ wish, addCart, addWish, search }) {
  const show = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <section className="wrap home">
        <div className="hero">
          <div className="hero-text">
            <span className="small-title"><Sparkles size={15} /> THE EVERYDAY EDIT</span>
            <h1>Find your kind of <em>extraordinary.</em></h1>
            <p>Thoughtfully selected pieces for the way you live, work and play.</p>
            <NavLink to="/shop" className="btn">
              Explore collection <ArrowRight size={17} />
            </NavLink>
            <span className="hero-note">New season · New perspective</span>
          </div>
          <div className="hero-img">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90"
              alt="Contemporary fashion collection"
            />
            <div className="round">THE NEW<br /><b>70%</b><br />STYLE, LESS</div>
          </div>
        </div>
      </section>

      <div className="wrap">
        <Benefits />
      </div>

      <section className="wrap section move">
        <div className="heading">
          <div>
            <span className="small-title">A GOOD PLACE TO START</span>
            <h2>Explore our worlds<span>.</span></h2>
          </div>
          <NavLink to="/shop" className="more">View all <ArrowRight size={17} /></NavLink>
        </div>

        <div className="category">
          {categories.map((item) => (
            <NavLink to="/shop" className="category-card" key={item.name}>
              <img src={item.image} alt={item.name} />
              <div className="category-text">
                <h3>{item.name}</h3>
                <p>{item.sub}</p>
              </div>
              <span className="category-arrow"><ArrowRight size={18} /></span>
            </NavLink>
          ))}
        </div>
      </section>

      <section className="wrap section move">
        <div className="heading">
          <div>
            <span className="small-title">THE GOOD STUFF</span>
            <h2>Picked for you<span>.</span></h2>
            <p className="sub">A few things we're loving right now.</p>
          </div>
          <NavLink to="/shop" className="more">Shop all <ArrowRight size={17} /></NavLink>
        </div>

        {show.length ? (
          <div className="cards">
            {show.slice(0, 4).map((item) => (
              <Card
                key={item.id}
                product={item}
                addCart={addCart}
                addWish={addWish}
                wished={wish.includes(item.id)}
              />
            ))}
          </div>
        ) : (
          <p className="empty">No products match your search.</p>
        )}
      </section>

      <section className="wrap look move">
        <div className="look-img">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85"
            alt="Modern home interior"
          />
        </div>
        <div className="look-text">
          <span className="small-title">MAKE ROOM FOR BETTER</span>
          <h2>Small details.<br /><em>Big difference.</em></h2>
          <p>Discover little upgrades that make your everyday feel special.</p>
          <NavLink to="/shop" className="btn dark">Discover the edit <ArrowRight size={17} /></NavLink>
        </div>
      </section>
    </main>
  );
}

export default Home;
