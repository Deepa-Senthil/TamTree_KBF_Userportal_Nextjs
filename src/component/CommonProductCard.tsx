"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../styles/CommonProductCard.module.scss";

interface Product {
  id: number;
  title: string;
  imageUrl: string;
  sizes: { size: string; price: number }[];
}

export default function CommonProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState(
    product.sizes[0]?.size || ""
  );
  const [selectedPrice, setSelectedPrice] = useState(
    product.sizes[0]?.price || 0
  );
  const [quantity, setQuantity] = useState(1);
  const MAX_QUANTITY = 20;

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    const found = product.sizes.find((s) => s.size === size);
    setSelectedSize(size);
    setSelectedPrice(found?.price || 0);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < MAX_QUANTITY) {
      setQuantity((prev) => prev + 1);
    } else {
      alert(`Maximum quantity is ${MAX_QUANTITY}`);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardImage} onClick={handleCardClick}>
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          style={{ objectFit: "cover" }}
          className={styles.bannerImage}
        />
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.title}>{product.title}</h3>

        <select
          className={styles.select}
          value={selectedSize}
          onChange={handleSizeChange}
        >
          {product.sizes.map((item, index) => (
            <option key={index} value={item.size}>
              {item.size}&nbsp; - &nbsp; ₹{item.price}
            </option>
          ))}
        </select>

        <div className={styles.quantityWrapper}>
          <div className={styles.quantityBox}>
            <button onClick={handleDecreaseQuantity} disabled={quantity === 1}>
              -
            </button>
            <input
            //   type="number"
              value={quantity}
              min={1}
              max={MAX_QUANTITY}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val >= 1 && val <= MAX_QUANTITY) {
                  setQuantity(val);
                }
              }}
            />
            <button onClick={handleIncreaseQuantity}>+</button>
          </div>

          <button className={styles.addToCart}>🛒</button>
        </div>
      </div>
    </div>
  );
}
