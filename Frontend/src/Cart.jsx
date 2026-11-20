import React from "react";
import { NavLink } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import "./Cart.css";

function Cart({ cart, changeQty, removeCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <main className="page cart-page">
      <section className="cart-top">
        <div className="cart-bg"></div>
        <div className="wrap cart-top-in">
          <span className="small-title">YOUR PERSONAL EDIT</span>
          <h1>Your bag,<br /><em>your good finds.</em></h1>
          <p>A few thoughtful choices, all in one place.</p>
          <div className="crumb"><NavLink to="/">Home</NavLink> / Shopping bag</div>
        </div>
      </section>

      <section className="wrap cart-area">
        <div className="cart-title">
          <div>
            <span className="small-title">SHOPPING BAG</span>
            <h2>Your selected pieces<span>.</span></h2>
          </div>
          <span>{count} {count === 1 ? "item" : "items"}</span>
        </div>

        {cart.length ? (
          <div className="cart-layout">
            <div className="cart-list">
              {cart.map((item) => (
                <article className="cart-item move" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-info">
                    <span>{item.category}</span>
                    <h3>{item.name}</h3>
                    <b>${item.price.toFixed(2)}</b>
                    <div className="cart-actions">
                      <div className="qty">
                        <button onClick={() => changeQty(item.id, -1)} aria-label="Decrease quantity"><Minus size={14} /></button>
                        <span>{item.qty}</span>
                        <button onClick={() => changeQty(item.id, 1)} aria-label="Increase quantity"><Plus size={14} /></button>
                      </div>
                      <button className="remove" onClick={() => removeCart(item.id)}><Trash2 size={15} /> Remove</button>
                    </div>
                  </div>
                  <strong className="cart-line">${(item.price * item.qty).toFixed(2)}</strong>
                </article>
              ))}
              <NavLink to="/shop" className="continue"><ArrowLeft size={16} /> Continue shopping</NavLink>
            </div>

            <aside className="summary move">
              <h3>Order summary</h3>
              <div><span>Subtotal</span><b>${total.toFixed(2)}</b></div>
              <div><span>Delivery</span><b className="free">FREE</b></div>
              <div className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
              <button className="checkout" onClick={() => window.alert("Your cart is ready. Connect your payment provider to enable checkout.")}>Continue to checkout <ArrowLeft size={16} /></button>
              <p><ShieldCheck size={15} /> Secure shopping experience</p>
              <p><Truck size={15} /> Free delivery on selected orders</p>
            </aside>
          </div>
        ) : (
          <div className="cart-empty move">
            <div><ShoppingBag size={34} /></div>
            <h3>Your bag is waiting for something lovely.</h3>
            <p>You haven't added anything yet. Explore the collection and find your favourites.</p>
            <NavLink to="/shop" className="btn">Explore the shop <ArrowLeft size={16} /></NavLink>
          </div>
        )}
      </section>
    </main>
  );
}

export default Cart;
