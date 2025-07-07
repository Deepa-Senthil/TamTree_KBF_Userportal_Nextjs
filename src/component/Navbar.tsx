"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../styles/Home.module.scss";

export default function Navbar() {
  const pathname = usePathname();
//   const { cartCount } = useCart();

  return (
    <header className={styles.navbar}>
      <div className={styles.top}>
        {/* Logo & Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <img
              src="/asset/images/kbf-logo.jpg"
              alt="Kathir Baby Foods"
            />
          </Link>
          <div>
            <div className={styles.title}>Kathir Baby Foods</div>
            <Link href="tel:+918095675500" className={styles.phone}>
              📱 +91‑80956‑75500
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className={styles["search-box"]}>
          <input type="search" placeholder="Search Products" />
          <span className={styles.icon}>🔍</span>
        </div>

        {/* Cart */}
        <Link href="/cart" className={styles.cart}>
          🛒
          {/* {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>} */}
        </Link>
      </div>

      {/* Bottom nav links */}
      <nav className={styles.navLinks}>
        {[
          { href: "/", label: "Home" },
          { href: "/catalog", label: "Our Catalog" },
          { href: "/reviews", label: "Customer Reviews" },
          { href: "/about", label: "About Us" },
          { href: "/contact", label: "Contact Us" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? styles.active : ""}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
