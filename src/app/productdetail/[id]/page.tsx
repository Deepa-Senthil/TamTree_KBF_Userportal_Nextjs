"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import styles from "../../../styles/ProductDetail.module.scss";
import { useProductDetailById } from "@/hooks/Hooks";
import { useCart } from "@/context/CartContext";
import AddToBagModal from "@/component/AddToBagModel";

interface SizeWithPrice {
  size: string;
  price: number;
}

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  methods: string;
  ingredients: string;
  howToStore: string;
  sizeWithPrice?: SizeWithPrice[];
}

interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  selectedSize: string;
  selectedPrice: number;
  Quantity: number;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: product, isLoading, isError } = useProductDetailById(id);
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const { cartItems, addToCart, updateCartItemQuantity } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [existingCartItemIndex, setExistingCartItemIndex] =
    useState<number>(-1);

  useEffect(() => {
    if (!product) return;

    if (product.sizeWithPrice?.length) {
      const firstSize = product.sizeWithPrice[0];
      setSelectedSize(firstSize.size);
      setSelectedPrice(firstSize.price);

      const existingIndex = cartItems.findIndex(
        (item: CartItem) =>
          item.id === product.id && item.selectedSize === firstSize.size
      );

      setExistingCartItemIndex(existingIndex);
      setQuantity(existingIndex !== -1 ? cartItems[existingIndex].Quantity : 1);
    } else {
      setSelectedSize("");
      setSelectedPrice(0);
      setQuantity(1);
      setExistingCartItemIndex(-1);
    }
  }, [product, cartItems]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    const price =
      product?.sizeWithPrice?.find((s) => s.size === size)?.price || 0;
    setSelectedSize(size);
    setSelectedPrice(price);

    if (product) {
      const existingIndex = cartItems.findIndex(
        (item: CartItem) => item.id === product.id && item.selectedSize === size
      );
      setExistingCartItemIndex(existingIndex);
      setQuantity(existingIndex !== -1 ? cartItems[existingIndex].Quantity : 1);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 20) {
      alert(
        "Maximum Allowed Quantity: 20 Units per Product. Please review the Quantity in your Bag."
      );
      return;
    }
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      if (existingCartItemIndex !== -1 && product) {
        const diff = newQuantity - quantity;
        updateCartItemQuantity(existingCartItemIndex, diff);
      }
    }
  };

  const handleAddToCart = () => {
    if (quantity <= 0) {
      alert("This product requires a minimum order quantity of 1. Please check the quantity selection.");
      return;
    }
    if (!product?.sizeWithPrice?.length) {
      console.error("No size/price info");
      return;
    }

    if (existingCartItemIndex === -1 && product) {
      addToCart({
        id: product.id,
        title: product.title,
        imageUrl: product.imageUrl,
        selectedSize,
        selectedPrice,
        Quantity: quantity,
      });
    }
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  if (isLoading)
    return <div className={styles.loadingContainer}>Loading...</div>;
  if (isError || !product) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>Error loading product details</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button
        onClick={() => router.back()}
        className={styles.backButton}
        aria-label="Back"
      >
        ←
      </button>

      <div className={styles.gridContainer}>
        {/* Product Image Section */}
        <div className={styles.imageSection}>
          <div className={styles.imageCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={600}
                height={450}
                className={styles.productImage}
                priority
              />
            </div>

            <div className={styles.productInfoOverlay}>
              <h1 className={styles.productTitle}>{product.title}</h1>

              {product.sizeWithPrice?.length ? (
                <div className={styles.productControls}>
                  <select
                    value={selectedSize}
                    onChange={handleSizeChange}
                    className={styles.sizeSelect}
                  >
                    {product.sizeWithPrice.map((item) => (
                      <option key={item.size} value={item.size}>
                        {item.size}&nbsp;&nbsp; - &nbsp;&nbsp;₹{item.price}
                      </option>
                    ))}
                  </select>

                  <div className={styles.quantityControls}>
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity === 1}
                      className={`${styles.quantityButton} ${
                        quantity === 1 ? styles.disabled : ""
                      }`}
                    >
                      -
                    </button>

                    <input
                      value={quantity === 0 ? "" : quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);

                        // If empty input (user is typing), don't process yet
                        if (e.target.value === "") {
                          setQuantity(0); // Temporarily set 0 to make input controlled
                          return;
                        }

                        if (!isNaN(val)) {
                          if (val < 1) {
                            alert(
                              "This product requires a minimum order quantity of 1. Please check the quantity selection."
                            );
                            setQuantity(0); // Clear input
                            return;
                          }
                          if (val > 20) {
                            alert(
                              "Maximum Allowed Quantity: 20 Units per Product. Please review the Quantity in your Bag."
                            );
                            // setQuantity(0); // Clear input
                            return;
                          }
                          handleQuantityChange(val);
                        }
                      }}
                      className={styles.quantityInput}
                    />

                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={styles.addToCartButton}
                  >
                    <span className={styles.cartIcon}>🛒</span>
                    Add to Bag
                  </button>
                </div>
              ) : (
                <p className={styles.sizeUnavailable}>Size info unavailable</p>
              )}
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className={styles.detailsSection}>
          <div className={styles.detailsCard}>
            <h1 className={styles.detailsTitle}>{product.title}</h1>
            <p className={styles.productDescription}>{product.description}</p>

            {/* Accordions for Additional Information */}
            <details className={styles.accordion} open>
              <summary className={styles.accordionSummary}>
                Handy & Quick Guide
                <span className={styles.accordionIcon}>▼</span>
              </summary>
              <div className={styles.accordionContent}>
                <p className={styles.accordionText}>{product.methods}</p>
              </div>
            </details>

            <details className={styles.accordion}>
              <summary className={styles.accordionSummary}>
                Ingredients
                <span className={styles.accordionIcon}>▼</span>
              </summary>
              <div className={styles.accordionContent}>
                <p className={styles.accordionText}>{product.ingredients}</p>
              </div>
            </details>

            <details className={styles.accordion}>
              <summary className={styles.accordionSummary}>
                How To Store
                <span className={styles.accordionIcon}>▼</span>
              </summary>
              <div className={styles.accordionContent}>
                <p className={styles.accordionText}>{product.howToStore}</p>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Add to Bag Modal */}
      <AddToBagModal
        open={openModal}
        onClose={closeModal}
        product={{
          title: product.title,
          imageUrl: product.imageUrl,
          selectedSize,
          selectedPrice,
        }}
      />
    </div>
  );
}
