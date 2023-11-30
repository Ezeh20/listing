"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "../Modal";
import styles from "./ListingModal.module.scss";
import useListingModal from "@/app/hooks/useListing";
import Header from "../../Header/Header";
import { categoriesItems } from "../../Categories/CategoriesItems";
import SelectedCategory from "../../SelectedCategory/SelectedCategory";

enum STEPS {
  CATEGORY,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
}

const ListingModal = () => {
  const listingModal = useListingModal();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const onNext = useCallback(() => {
    if (step < STEPS.PRICE) {
      setStep((prev) => prev + 1);
    } else if (step === STEPS.PRICE) {
      alert("listing created successfully");
    }
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return null;
    }
    return "back";
  }, [step]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "create";
    }
    return "next";
  }, [step]);

  const footer = <p>Step: {step} of 5</p>;

  let content = (
    <div className={styles.category}>
      <Header
        title="Which of these best describes your place"
        subtitle="pick a category"
      />
      <div className={styles.categories}>
        {categoriesItems.map((itm) => (
          <SelectedCategory
            key={itm.label}
            label={itm.label}
            icon={itm.icon}
            selected={false}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={listingModal.isOpen}
      onClose={listingModal.onClose}
      title="Listing"
      action={onNext}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? null : onBack}
      secondaryActionLabel={secondaryLabel}
      content={content}
      footer={footer}
    />
  );
};

export default ListingModal;
