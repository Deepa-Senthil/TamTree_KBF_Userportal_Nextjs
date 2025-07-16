// component/LayoutClient.tsx
"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MyBagDrawer from "./mybagdrawer/MyBagDrawer";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import { CartProvider } from "@/context/CartContext";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <CartProvider>
      <ReactQueryProvider>
        <Navbar onCartClick={() => setDrawerOpen(true)} />
        <MyBagDrawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
        <main>{children}</main>
        <Footer />
      </ReactQueryProvider>
    </CartProvider>
  );
}
