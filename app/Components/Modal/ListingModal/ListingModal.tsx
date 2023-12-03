"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "../Modal";
import styles from "./ListingModal.module.scss";
import useListingModal from "@/app/hooks/useListing";
import Header from "../../Header/Header";
import { categoriesItems } from "../../Categories/CategoriesItems";
import SelectedCategory from "./SelectedCategory/SelectedCategory";

enum STEPS {
  CATEGORY,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
}

const initialListings = {
  category: "",
  location: null,
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  imageSrc: "",
  price: 1,
  title: "",
  description: "",
};

const ListingModal = () => {
  const listingModal = useListingModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [listingData, setListingData] = useState(initialListings);

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
      return undefined;
    }
    return "back";
  }, [step]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "create";
    }
    return "next";
  }, [step]);

  //set the category
  const selectCategory = useCallback((label: string) => {
    setListingData((prev) => ({ ...prev, category: label }));
  }, []);

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
            selected={listingData.category === itm.label}
            onClick={() => selectCategory(itm.label)}
          />
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    content = (
      <div className={styles.location}>
        <Header
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    content = (
      <div className={styles.info}>
        <Header
          title="Share some basics about your place"
          subtitle="what amenities do you have?"
        />
      </div>
    );
  }

  const footer = <p>Step: {step} of 5</p>;

  return (
    <Modal
      isOpen={listingModal.isOpen}
      onClose={listingModal.onClose}
      title="Listing"
      action={onNext}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryLabel}
      content={content}
      footer={footer}
    />
  );
};

export default ListingModal;
