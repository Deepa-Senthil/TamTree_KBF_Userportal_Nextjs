"use client";

import styles from "../../styles/MyBagDrawer.module.scss";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemTitle: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemTitle,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.confirmationModalContent}>
        <h3>Confirm Deletion</h3>
        <p>
          Are you sure you want to remove <strong>{itemTitle}</strong> from the
          cart?
        </p>
        <div className={styles.confirmationActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={onConfirm} className={styles.confirmDeleteButton}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
