// app/layout.tsx (NOT in /components or /pages)
import { ReactNode } from "react";
import "../styles/global.scss";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Kathir Baby Foods",
  description: "Best Homemade Baby Food",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ReactQueryProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ReactQueryProvider>
        </CartProvider>
      </body>
    </html>
  );
}
