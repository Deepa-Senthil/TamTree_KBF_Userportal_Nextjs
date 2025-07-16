"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "../styles/AddToBagModel.module.scss";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import MyBagDrawer from "./mybagdrawer/MyBagDrawer";
// import MyBagDrawer from "../drawer/MyBagDrawer";

interface AddToBagModalProps {
  open: boolean;
  onClose: () => void;
  product: {
    title: string;
    imageUrl: string;
    selectedSize: string;
    selectedPrice: number;
  } | null;
}

export default function AddToBagModal({
  open,
  onClose,
  product,
}: AddToBagModalProps) {
  const { cartCount } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  if (!product) return null;

  const handleViewCartClick = () => {
    setIsDrawerOpen(true);
    onClose();
  };

  const handleContinueShopping = () => {
    onClose();
    router.push("/ourcatalog");
  };

  return (
    <>
      {open && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.closeButton} onClick={onClose}>
              ✕
            </div>

            <h2 className={styles.heading}>Added to Bag</h2>

            <p className={styles.productTitle}>
              {product.title} - {product.selectedSize}
            </p>

            <div className={styles.imageWrapper}>
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className={styles.productImage}
              />
            </div>

            <div className={styles.buttonGroup}>
              <button
                className={styles.outlinedBtn}
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
              <button
                className={styles.filledBtn}
                onClick={handleViewCartClick}
              >
                View Bag
              </button>
            </div>

            <p className={styles.cartCount}>
              Your bag has {cartCount} item(s).
            </p>
          </div>
        </div>
      )}
      <MyBagDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
