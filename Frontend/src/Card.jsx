import React from "react";
import { Heart, Star, Plus } from "lucide-react";
import "./Card.css";

function Card({ product, addCart, addWish, wished }) {
  return (
    <article className="card move">
      <div className="card-img">
        <img src={product.image} alt={product.name} />
        <span className="sale">-{product.off}%</span>
        <button
          className={wished ? "heart liked" : "heart"}
          onClick={() => addWish(product.id)}
          aria-label="Add to wishlist"
        >
          <Heart size={18} fill={wished ? "currentColor" : "none"} />
        </button>
        <span className="tag">{product.tag}</span>
      </div>

      <div className="card-info">
        <span className="kind">{product.category}</span>
        <h3>{product.name}</h3>
        <div className="stars">
          <Star size={14} fill="currentColor" />
          <b>{product.rating}</b>
          <span>({product.reviews} reviews)</span>
        </div>
        <div className="price">
          <div>
            <b>${product.price}</b>
            <del>${product.old}</del>
          </div>
          <button onClick={() => addCart(product)}>
            <Plus size={15} /> Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default Card;
