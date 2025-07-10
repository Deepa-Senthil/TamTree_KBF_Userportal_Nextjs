// app/layout.tsx (NOT in /components or /pages)
import { ReactNode } from "react";
import "../styles/global.scss";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import ReactQueryProvider from "@/provider/ReactQueryProvider";

export const metadata = {
  title: "Kathir Baby Foods",
  description: "Best Homemade Baby Food",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
