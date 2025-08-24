'use client';

import { useState } from 'react';
import Counter from './counter';

type CartItem = {
  name: string;
  quantity: number;
  price: number;
};

const products = [
  { name: 'Entry ticket\n Challenge Day 1 & Autumn Cup II Day 1 Saturday September 20th', price: 35, img: '/ticket1.svg' },
  { name: 'Entry ticket\n Challenge Day 2 & Autumn Cup II Day 2 Sunday September 21st', price: 35, img: '/ticket1.svg' },
  { name: 'Entry ticket\n Challenge & Autumn Cup II\n 2 days Saturday & Sunday September 20 & 21', price: 50, img: '/ticket2.svg' },
  { name: 'Hand bells', price: 3, img: '/hand_bells.jpg' },
  { name: 'Party blower', price: 3, img: '/item2.png' },
  { name: 'Hand Clapper', price: 5, img: '/item3.png' },
  { name: 'Raffle ticket:\n If you win the raffle, you will receive an 18x24 canvas with your team', price: 8, img: '/raffle1.jpg' },
  { name: 'Metal Cowbell', price: 8, img: '/item4.png' },
  { name: 'Raffle ticket:\n If you win the raffle, you will receive a 2026 Calendar with pictures of your team', price: 8, img: '/square_image3.jpeg' },
];

export default function Shop() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleItemChange = (item: CartItem) => {
    setCart((prev) => {
      const index = prev.findIndex((i) => i.name === item.name);
      if (index === -1) {
        if (item.quantity > 0) return [...prev, item];
        return prev;
      } else {
        if (item.quantity > 0) {
          const copy = [...prev];
          copy[index] = item;
          return copy;
        } else {
          return prev.filter((i) => i.name !== item.name);
        }
      }
    });
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Checkout error:', errorText);
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Stripe response missing URL:', data);
      }
    } catch (err) {
      console.error('Checkout exception:', err);
    }
  };

  return (
    <>
<div className="buy_wrapper">
  {products.map(({ name, price, img }) => (
    <div key={name} className="buy_block">
      <div className="buy_img">
        <img src={img} alt={name} />
      </div>
      <p className="buy_description">{name}</p>
      <p className="buy_price">${price}</p>
      <div className="buy_counter">
        <Counter name={name} price={price} onChange={handleItemChange} />
      </div>
    </div>
  ))}
</div>

{cart.length > 0 && (
  <div className="cart_section">
    <h3>Cart:</h3>

    {cart.map(({ name, quantity, price }) => (
      <div key={name}>
        {name} — {quantity} × ${price} = ${(quantity * price).toFixed(2)}
      </div>
    ))}

    <h4>
      Total amount: $
      {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
    </h4>

    <button
      onClick={handleCheckout}
      className="checkout checkout_button text-white px-4 py-2 rounded mt-4"
    >
      Checkout
    </button>
  </div>
)}
    </>
  );
}
