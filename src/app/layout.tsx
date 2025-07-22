// src/app/layout.tsx
import LayoutClient from "@/component/LayoutClient";
import "../styles/global.scss";
import type { Metadata } from "next";
import Loader from "@/component/Loader";
import ScrollToTop from "@/component/ScrollToTop";
import WhatsAppButton from "@/component/WhatsApp";

export const metadata: Metadata = {
  title: "Kathir Baby Foods",
  description: "Best Homemade Baby Food",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Loader />
        <ScrollToTop />
        <WhatsAppButton/>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
