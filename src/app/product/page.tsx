"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetProducts } from "@/hooks/Hooks";
import styles from "@/styles/ProductList.module.scss";
import CommonProductCard from "@/component/CommonProductCard";
import Head from "next/head";

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
    <>
      <Head>
        <title>All Products | Sindhus Kitchen</title>
        <meta
          name="description"
          content="Browse our full catalog of delicious snacks and meals. Discover your next favorite dish at Sindhus Kitchen."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <button
            className={styles.backButton}
            onClick={() => router.push("/ourcatalog")}
          >
            ←
          </button>
          <h1 className={styles.title}>All Products</h1>
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
    </>
  );
}
