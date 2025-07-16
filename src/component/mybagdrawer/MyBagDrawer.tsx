"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/MyBagDrawer.module.scss";
import { useCart } from "../../context/CartContext";
import OrderSuccessModal from "./OrderSuccessModal";
import { useCreateOrders } from "@/hooks/Hooks";
import OrderFormModal from "./OrderFormModel";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

interface MyBagDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface OrderSuccessData {
  orderNumber: string;
  showSuccess: boolean;
}

export default function MyBagDrawer({ open, onClose }: MyBagDrawerProps) {
  const router = useRouter();
  const {
    cartItems,
    setCartItems,
    totalPrice,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<OrderSuccessData>({
    orderNumber: "",
    showSuccess: false,
  });
  const [selectedItemTitle, setSelectedItemTitle] = useState<string | null>(
    null
  );
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const createOrderMutation = useCreateOrders();
//   const { updateSnackBarState } = useSnackBar();
  const MAX_QUANTITY = 20;

  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index);
    setSelectedItemTitle(cartItems[index].title);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      removeFromCart(deleteIndex);
    //   updateSnackBarState(
    //     true,
    //     `${selectedItemTitle} removed from the cart!`,
    //     SnackbarSeverityEnum.SUCCESS
    //   );
    }
    setOpenConfirm(false);
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.Quantity, 0);

  if (!open) return null;

  return (
    <div className={styles.drawer}>
      <div className={styles.drawerHeader}>
        <h2 className={styles.drawerTitle}>My Bag</h2>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.drawerContent}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Your bag is empty.</p>
            <Link
              href="/ourcatalog"
              className={styles.backButton}
              onClick={onClose}
            >
              ← Back to Shop
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.cartTableContainer}>
              <table className={styles.cartTable}>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          width={50}
                          height={50}
                          className={styles.productImage}
                        />
                      </td>
                      <td>
                        {item.title} [{item.selectedSize}]
                      </td>
                      <td>₹{item.selectedPrice}</td>
                      <td>
                        <div className={styles.quantityControl}>
                          <button
                            onClick={() => updateCartItemQuantity(index, -1)}
                            className={styles.quantityButton}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.Quantity === 0 ? "" : item.Quantity}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "") {
                                setCartItems((prevCart: any) => {
                                  const updatedCart = [...prevCart];
                                  updatedCart[index].Quantity = 0;
                                  return updatedCart;
                                });
                                return;
                              }
                              const newQuantity = Number(value);
                              if (!isNaN(newQuantity)) {
                                if (newQuantity <= MAX_QUANTITY) {
                                  updateCartItemQuantity(
                                    index,
                                    newQuantity - item.Quantity
                                  );
                                } else {
                                  alert(
                                    `Maximum Allowed Quantity: ${MAX_QUANTITY} Units per Product. Please review the Quantity in your Bag.`
                                  );
                                  updateCartItemQuantity(
                                    index,
                                    MAX_QUANTITY - item.Quantity
                                  );
                                }
                              }
                            }}
                            onBlur={() => {
                              if (item.Quantity === 0) {
                                removeFromCart(index);
                              }
                            }}
                            className={styles.quantityInput}
                            min={0}
                          />
                          <button
                            onClick={() => {
                              if (item.Quantity < MAX_QUANTITY) {
                                updateCartItemQuantity(index, 1);
                              } else {
                                alert(
                                  `Maximum Allowed Quantity: ${MAX_QUANTITY} Units per Product. Please review the Quantity in your Bag.`
                                );
                              }
                            }}
                            className={styles.quantityButton}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        ₹{(item.selectedPrice * item.Quantity).toFixed(2)}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteClick(index)}
                          className={styles.deleteButton}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.summary}>
              <p>
                <strong>Total Price:</strong> ₹{totalPrice.toFixed(2)}
              </p>
              <p>
                <strong>Total Quantity:</strong> {totalQuantity}
              </p>
            </div>
          </>
        )}

        <div className={styles.footer}>
          <div className={styles.orderInfo}>
            <p className={styles.infoHeader}>
              <span className={styles.starIcon}>★</span> Every order is freshly
              prepared and dispatched safely.
            </p>
            <h3>Order Processing & Shipping Details:</h3>
            <ol className={styles.infoList}>
              <li>
                <strong>Confirm & Send Your Order</strong> - Share your product
                list with us along with your details.
              </li>
              <li>
                <strong>Shipping Charges</strong> - Once we receive your order
                list, we'll calculate the exact shipping charges based on box
                weight and delivery distance.
              </li>
              <li>
                <strong>Payment</strong> - Total amount (including shipping)
                will be shared to you via WhatsApp for payment.
              </li>
              <li>
                <strong>Order Processing</strong> - Once payment is received,
                we'll begin preparing your order.
              </li>
              <li>
                <strong>
                  For any further assistance, please{" "}
                  <a
                    href="https://wa.me/+918095675500?text=Hi%20!%20Kathir%20Baby%20Foods%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappLink}
                  >
                    WhatsApp us – 8095675500
                  </a>
                </strong>
              </li>
            </ol>
          </div>

          {cartItems.length > 0 && (
            <div className={styles.actionButtons}>
              <button
                className={styles.confirmButton}
                onClick={() => setIsFormOpen(true)}
              >
                Confirm Order
              </button>
              <Link
                href="/ourcatalog"
                className={styles.continueButton}
                onClick={onClose}
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
      <OrderFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={(formData: any) => {
          const orderData = {
            Name: formData.name,
            phoneNumber: formData.phone || 0,
            place: formData.place,
            cartItems,
            totalPrice,
            totalQuantity,
          };

          createOrderMutation.mutate(orderData, {
            onSuccess: (data: any) => {
              const orderNumber = data.orderNumber;
              setOrderSuccess({
                orderNumber,
                showSuccess: true,
              });
              setIsFormOpen(false);
              clearCart();
            },
            onError: () => {
              //   updateSnackBarState(
              //     true,
              //     "Failed to send order. Please try again.",
              //     SnackbarSeverityEnum.ERROR
              //   );
            },
          });
        }}
      />

      <DeleteConfirmationModal
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        itemTitle={selectedItemTitle || ""}
      />

      <OrderSuccessModal
        isOpen={orderSuccess.showSuccess}
        onClose={() => setOrderSuccess({ ...orderSuccess, showSuccess: false })}
        orderNumber={orderSuccess.orderNumber}
      />
    </div>
  );
}
