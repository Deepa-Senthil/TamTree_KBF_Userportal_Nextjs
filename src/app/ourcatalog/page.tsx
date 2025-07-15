"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGetCategories } from "@/hooks/Hooks";
import styles from "../../styles/OurCatalog.module.scss";

const FeaturedCategories = () => {
  const router = useRouter();
  const { data: categories = [], isLoading, error } = useGetCategories();

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "ALL") {
      router.push("/product");
    } else {
      router.push(`/category/${categoryId}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  

  if (isLoading)
    return <p style={{ textAlign: "center" }}>Loading categories...</p>;

  if (error)
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        Error fetching categories.
      </p>
    );

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Our Featured Categories</h2>

      <div className={styles.categoryGrid}>
        {/* ALL category */}
        <div
          className={styles.categoryItem}
          onClick={() => handleCategoryClick("ALL")}
        >
          <Image
            src="/asset/images/allProducts.jpg" // ✅ Corrected path
            alt="All Categories"
            width={120}
            height={120}
            className={styles.imageCircle}
          />
          <div className={styles.categoryName}>All</div>
        </div>

        {/* Dynamic API categories */}
        {categories.map((category) => (
          <div
            key={category.id}
            className={styles.categoryItem}
            onClick={() => handleCategoryClick(category.id)}
          >
            <Image
              src={category.imageURL || "/default-category.jpg"}
              alt={category.categoryName}
              width={120}
              height={120}
              className={styles.imageCircle}
            />
            <div className={styles.categoryName}>{category.categoryName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
