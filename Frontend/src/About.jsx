import React from "react";
import { NavLink } from "react-router-dom";
import { Leaf, Heart, Award, ArrowRight } from "lucide-react";
import "./About.css";

function About() {
  const values = [
    {
      icon: Leaf,
      title: "Thoughtful by nature",
      text: "We look for quality, usefulness and a lighter footprint in every choice.",
    },
    {
      icon: Heart,
      title: "People come first",
      text: "Good service is personal. We keep things simple, warm and helpful.",
    },
    {
      icon: Award,
      title: "Quality over noise",
      text: "Fewer, better finds selected to earn a place in your everyday.",
    },
  ];

  return (
    <main className="page">
      <section className="about-top">
        <div className="wrap about-in">
          <div>
            <span className="small-title">A LITTLE ABOUT US</span>
            <h1>Shopping should<br />feel <em>good.</em></h1>
            <p>We make discovering everyday essentials feel more considered, inspiring and a little more you.</p>
            <div className="crumb"><NavLink to="/">Home</NavLink> / About</div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85"
            alt="Bright creative studio"
          />
        </div>
      </section>

      <section className="wrap story move">
        <div className="story-img">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85"
            alt="Team working together"
          />
          <span>Good things happen together.</span>
        </div>
        <div className="story-text">
          <span className="small-title">OUR STORY</span>
          <h2>A better way to<br /><em>find your favourites.</em></h2>
          <p>ShopVista started with a simple thought: finding the things you love shouldn't feel like work. We set out to create a calmer shopping experience filled with useful discoveries, honest value and pieces that bring joy to everyday life.</p>
          <p>We curate with care, keep the experience easy and put people at the heart of what we do.</p>
          <NavLink to="/shop" className="btn dark">Explore ShopVista <ArrowRight size={17} /></NavLink>
        </div>
      </section>

      <section className="values">
        <div className="wrap">
          <div className="center">
            <span className="small-title">WHAT MATTERS TO US</span>
            <h2>Good choices, by design<span>.</span></h2>
            <p>Three simple ideas guide everything we do.</p>
          </div>
          <div className="values-list">
            {values.map(({ icon: Icon, title, text }) => (
              <article className="value" key={title}>
                <span><Icon size={23} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap facts">
        <div><b>Curated</b><span>with intention</span></div>
        <div><b>Everyday</b><span>made more lovely</span></div>
        <div><b>Always</b><span>here to help</span></div>
      </section>
    </main>
  );
}

export default About;
