// app/pickles/veg/[slug]/layout.js
"use client";

import { CartProvider } from "../../components/context/CartContext"; // adjust the path if needed

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
