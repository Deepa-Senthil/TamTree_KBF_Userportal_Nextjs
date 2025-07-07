import { ReactNode } from "react";
import Head from "next/head";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import "../styles/global.scss";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <Head>
        <title>Kathir Baby Foods</title>
      </Head>
      <body>
        <Navbar />
        <main >{children}</main>
        <Footer />
      </body>
    </html>
  );
}

