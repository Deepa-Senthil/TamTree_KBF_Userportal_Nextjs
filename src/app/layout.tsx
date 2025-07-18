// src/app/layout.tsx
import LayoutClient from "@/component/LayoutClient";
import "../styles/global.scss";
import type { Metadata } from "next";
import Loader from "@/component/Loader";

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
        <Loader/>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
