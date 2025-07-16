"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/MyBagDrawer.module.scss";

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
}

export default function OrderSuccessModal({
  isOpen,
  onClose,
  orderNumber,
}: OrderSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.successModalContent}>
        <button className={styles.closeSuccessModal} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.successTitle}>
          Your Order <b># {orderNumber}</b> has been received successfully!
        </h2>
        <div className={styles.successMessage}>
          <p>
            Thank you for choosing Kathir Baby Foods!
            <br />
            We will get back to you to confirm your order shortly via WhatsApp.
          </p>
        </div>
        <div className={styles.successActions}>
          <button
            className={styles.whatsappButton}
            onClick={() => {
              const whatsappUrl = `https://wa.me/918095675500?text=Hi%20Kathir%20Baby%20Foods,%20Reg-Order%23${orderNumber}`;
              window.open(whatsappUrl, "_blank");
            }}
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              width={20}
              height={20}
              className={styles.whatsappIcon}
            />
            Open WhatsApp
          </button>
          <Link href="/" className={styles.homeButton} onClick={onClose}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
