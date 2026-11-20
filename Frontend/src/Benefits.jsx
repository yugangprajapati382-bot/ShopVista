import React from "react";
import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";
import "./Benefits.css";

function Benefits() {
  const items = [
    { icon: Truck, title: "Free shipping", text: "On orders over $99" },
    { icon: ShieldCheck, title: "Secure payment", text: "Safe checkout every time" },
    { icon: RefreshCw, title: "Easy returns", text: "30-day return window" },
    { icon: Headphones, title: "Friendly support", text: "We're here to help" },
  ];

  return (
    <section className="benefits move">
      {items.map(({ icon: Icon, title, text }) => (
        <div className="benefit" key={title}>
          <span><Icon size={21} /></span>
          <div>
            <b>{title}</b>
            <small>{text}</small>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Benefits;
