"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetProductsByCategory } from "@/hooks/Hooks";
import styles from "../../../styles/CategoryProducts.module.scss";
import CommonProductCard from "@/component/CommonProductCard";
import Head from "next/head";

interface Product {
  id: number;
  title: string;
  imageUrl: string;
  sizes: { size: string; price: number }[];
}

export default function CategoryPage() {
  const { categoryId } = useParams();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const productsPerPage = 10;

  const {
    data: productsData,
    isLoading,
    isError,
    error,
  } = useGetProductsByCategory(categoryId as string);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  if (isError)
    return (
      <div className={styles.error}>
        Error fetching products: {error.message}
      </div>
    );

  if (!productsData?.products?.length)
    return (
      <div className={styles.empty}>
        No products available for this category.
      </div>
    );

  const sanitizedProducts = productsData.products.map((product: any) => ({
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

  return (
    <>
      <Head>
        <title>{productsData.categoryName} | Kathir Baby Foods</title>
        <meta
          name="description"
          content={`Browse our selection of ${productsData.categoryName} products made with love for your baby.`}
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <button
            onClick={() => router.push("/ourcatalog")}
            className={styles.backBtn}
          >
            ←
          </button>
          <h2 className={styles.title}>{productsData.categoryName}</h2>
        </div>

        {/* {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`${styles.pageBtn} ${
                page === idx + 1 ? styles.active : ""
              }`}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )} */}

        <div className={styles.grid}>
          {paginatedProducts.map((product: Product) => (
            <CommonProductCard key={product.id} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={`${styles.pageBtn} ${
                  page === idx + 1 ? styles.active : ""
                }`}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
