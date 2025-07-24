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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { cartCount } = useCart();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: searchResults = [], isLoading } =
    useGetSearchProducts(debouncedSearchTerm);
  const toggleNav = () => setNavOpen(!navOpen);

  const handleLinkClick = () => setNavOpen(false);

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <img
                src="/asset/images/KathirBabyFoodslogo.svg"
                alt="Kathir Baby Foods"
                width={120}
                height={120}
              />
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
            <div className={styles["search-container"]}>
              <div className={styles["search-box"]}>
                <input
                  type="search"
                  placeholder="Search Products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className={styles.icon}>🔍</span>
              </div>

              {/* Desktop Search Results */}
              {searchTerm && (
                <div className={styles.searchResults}>
                  {isLoading ? (
                    <div className={styles.searchLoading}>Loading...</div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((item: any) => (
                      <Link
                        key={item.id}
                        href={`/productdetail/${item.id}`}
                        className={styles.searchResultItem}
                        onClick={() => setSearchTerm("")}
                      >
                        {item.title}
                      </Link>
                    ))
                  ) : (
                    <div className={styles.searchNoResults}>
                      {searchTerm ? "No products found" : ""}
                    </div>
                  )}
                </div>
              )}
            </div>

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
              className={styles["mobile-search-icon"]}
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

      {/* Mobile Search Drawer */}
      {searchOpen && (
        <div className={styles.searchTopDrawer}>
          <div
            className={styles.searchDrawerOverlay}
            onClick={() => {
              setSearchOpen(false);
              setSearchTerm("");
            }}
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
                autoFocus
              />
              <button
                className={styles.closeSearchBtn}
                onClick={() => {
                  setSearchOpen(false);
                  setSearchTerm("");
                }}
              >
                ❌
              </button>
            </div>

            {/* Mobile Search Results */}
            {searchTerm && (
              <div className={styles.mobileSearchResults}>
                {isLoading ? (
                  <div className={styles.searchLoading}>Loading...</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((item: any) => (
                    <Link
                      key={item.id}
                      href={`/productdetail/${item.id}`}
                      className={styles.searchResultItem}
                      onClick={() => {
                        setSearchTerm("");
                        setSearchOpen(false);
                      }}
                    >
                      {item.title}
                    </Link>
                  ))
                ) : (
                  <div className={styles.searchNoResults}>
                    {searchTerm ? "No products found" : ""}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
