"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";
import { useCart } from "../context/CartContext";
import { useGetSearchProducts } from "@/hooks/Hooks";

export default function Navbar({ onCartClick }: { onCartClick: () => void }) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { cartCount } = useCart();

  const toggleNav = () => setNavOpen(!navOpen);

  // Use your custom search hook
  const { data: searchResults = [], isLoading } =
    useGetSearchProducts(searchTerm);

  // Close nav on link click
  const handleLinkClick = () => setNavOpen(false);

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <img src="/asset/images/kbf-logo.jpg" alt="Kathir Baby Foods" />
            </Link>
            <div className={styles.brandText}>
              <div className={styles.title}>Kathir Baby Foods</div>
              <Link href="tel:+918095675500" className={styles.phone}>
                📱 +91‑80956‑75500
              </Link>
            </div>
          </div>

          {/* Desktop Search & Cart */}
          <div className={styles["search-cart-group"]}>
            <div className={styles["search-box"]}>
              <input
                type="search"
                placeholder="Search Products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className={styles.icon}>🔍</span>
            </div>

            {/* Results for desktop */}
            {searchTerm && searchResults.length > 0 && (
              <ul className={styles.searchResults}>
                {searchResults.map((item: any) => (
                  <li key={item.id}>
                    <Link
                      href={`/productdetail/${item.id}`}
                      onClick={() => setSearchTerm("")}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <a onClick={onCartClick} className={styles.cart}>
              🛒
              {cartCount > 0 && (
                <span className={styles.cartCount}>{cartCount}</span>
              )}
            </a>
          </div>

          {/* Mobile Icons */}
          <div className={styles.mobileIcons}>
            <span
              className={styles["mobile-search"]}
              onClick={() => setSearchOpen(true)}
            >
              🔍
            </span>
            <a onClick={onCartClick} className={styles.cart}>
              🛒
              {cartCount > 0 && (
                <span className={styles.cartCount}>{cartCount}</span>
              )}
            </a>
            <button
              className={styles.hamburger}
              onClick={toggleNav}
              aria-label="Menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Nav Links */}
        <nav className={`${styles.navLinks} ${navOpen ? styles.open : ""}`}>
          {[
            { href: "/", label: "Home" },
            { href: "/ourcatalog", label: "Our Catalog" },
            { href: "/reviews", label: "Customer Reviews" },
            { href: "/about", label: "About Us" },
            { href: "/contactus", label: "Contact Us" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? styles.active : ""}
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* ✅ Mobile Search Drawer */}
      {searchOpen && (
        <div className={styles.searchTopDrawer}>
          <div
            className={styles.searchDrawerOverlay}
            onClick={() => setSearchOpen(false)}
          ></div>
          <div className={styles.searchDrawerPanel}>
            <div className={styles.searchInputWrapper}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="search"
                placeholder="Search Products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <button
                className={styles.closeSearchBtn}
                onClick={() => setSearchOpen(false)}
              >
                ❌
              </button>
            </div>

            {/* Mobile search results */}
            {searchTerm && searchResults.length > 0 && (
              <ul className={styles.searchResults}>
                {searchResults.map((item: any) => (
                  <li key={item.id}>
                    <Link
                      href={`/product/${item.id}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
