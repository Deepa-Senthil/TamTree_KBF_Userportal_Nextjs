"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "../../styles/MyBagDrawer.module.scss";

interface FormData {
  name: string;
  phone: number | null;
  place: string;
}

interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

export default function OrderFormModal({
  isOpen,
  onClose,
  onSubmit,
}: OrderFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: null,
    place: "",
  });
  const [errors, setErrors] = useState({ name: "", phone: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "phone" ? (value ? parseInt(value) : null) : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));

    // Clear error when typing
    if (name === "name" && errors.name) {
      setErrors({ ...errors, name: "" });
    }
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.name.trim()) {
      setErrors({ ...errors, name: "Name is required" });
      return;
    }

    if (!formData.phone || formData.phone.toString().length !== 10) {
      setErrors({
        ...errors,
        phone: "Phone number must be 10 digits",
      });
      return;
    }

    onSubmit(formData);
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.phone !== null &&
      formData.phone.toString().length === 10
    );
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Enter your details</h2>

        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={(e) => {
              // Capitalize each word
              const capitalized = e.target.value
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ");
              setFormData({ ...formData, name: capitalized });
            }}
            className={errors.name ? styles.errorInput : ""}
          />
          {errors.name && (
            <span className={styles.errorText}>{errors.name}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">WhatsApp Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
            maxLength={10}
            pattern="[0-9]*"
            className={
              formData.phone !== null && formData.phone.toString().length !== 10
                ? styles.errorInput
                : ""
            }
          />
          {formData.phone !== null &&
            formData.phone.toString().length !== 10 && (
              <span className={styles.errorText}>
                Phone number must be 10 digits
              </span>
            )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="place">Place</label>
          <input
            type="text"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleInputChange}
            onBlur={(e) => {
              // Capitalize first letter
              const capitalized =
                e.target.value.charAt(0).toUpperCase() +
                e.target.value.slice(1);
              setFormData({ ...formData, place: capitalized });
            }}
          />
        </div>

        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`${styles.submitButton} ${
              !isFormValid() ? styles.disabledButton : ""
            }`}
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              width={20}
              height={20}
              className={styles.whatsappIcon}
            />
            Send your Order
          </button>
        </div>
      </div>
    </div>
  );
}
