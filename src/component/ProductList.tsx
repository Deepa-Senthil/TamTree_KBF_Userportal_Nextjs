"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CommonProductCard from "./CommonProductCard";
import { useGetProducts } from "@/hooks/Hooks";
import styles from "@/styles/ProductList.module.scss";

export default function ProductList() {
  const { data: products } = useGetProducts();
  const router = useRouter();

  const [page, setPage] = useState(1);
  const productsPerPage = 10;

  if (!products) return <p>Loading products...</p>;

  const sanitizedProducts = products.map((product: any) => ({
    ...product,
    sizes: product.sizeWithPrice
      ? product.sizeWithPrice.map((item: any) => ({
          size: item.size,
          price: parseInt(item.price, 10),
        }))
      : [],
  }));

  const totalPages = Math.ceil(sanitizedProducts.length / productsPerPage);
  const paginatedProducts = sanitizedProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const handlePageChange = (value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => router.push("/ourcatalog")}
        >
          ←
        </button>
        <h2 className={styles.title}>All Products</h2>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {paginatedProducts.map((product) => (
          <div className={styles.gridItem} key={product.id}>
            <CommonProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`${styles.pageButton} ${
              page === idx + 1 ? styles.active : ""
            }`}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
