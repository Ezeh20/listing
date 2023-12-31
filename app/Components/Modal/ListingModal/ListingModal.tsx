"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "../Modal";
import styles from "./ListingModal.module.scss";
import useListingModal from "@/app/hooks/useListing";
import Header from "../../Header/Header";
import { categoriesItems } from "../../Categories/CategoriesItems";
import SelectedCategory from "./SelectedCategory/SelectedCategory";
import SelectedLocation from "./SelecteLocation/SelectedLocation";
import { ListingType } from "@/app/types";
import dynamic from "next/dynamic";
import Counter from "../../Counter/Counter";
import ImageUpload from "../../ImageUpload/ImageUpload";
import Input from "../../Input/Input";
import TextArea from "../../Input/TextArea/TextArea";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const listingModal = useListingModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [listingData, setListingData] = useState<ListingType>(initialListings);

  //dynamically import the map component
  const Map = useMemo(
    () =>
      dynamic(() => import("../../Map/Map"), {
        ssr: false,
      }),
    [listingData.location]
  );

  const onSubmit = useCallback(async () => {
    try {
      const res = await axios.post("/api/listing", listingData);
      console.log(res);
      toast.success(res?.data.message);
      setListingData(initialListings);
      router.refresh();
      listingModal.onClose();
    } catch (error: any) {
      toast.error("something went wrong try again");
    }
  }, [listingData, listingModal, router]);
  
  //take 1 step back
  const onBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  // take 1 step forward the submit at the end
  const onNext = useCallback(() => {
    if (step < STEPS.PRICE) {
      setStep((prev) => prev + 1);
    } else if (step === STEPS.PRICE) {
      onSubmit();
    }
  }, [step, onSubmit]);

  //secondary label
  const secondaryLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "back";
  }, [step]);

  //action label
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

  //the body of the modal will be declared with let so as to change whenever
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

  //step 2 select location
  if (step === STEPS.LOCATION) {
    content = (
      <div className={styles.location}>
        <Header title="Where is your place located?" subtitle="Help guests find you!" />
        <SelectedLocation
          value={listingData.location}
          onChange={(value) =>
            setListingData((pre: ListingType) => ({ ...pre, location: value }))
          }
        />
        <div className={styles.mapp}>
          <Map center={listingData.location?.latlng} />
        </div>
      </div>
    );
  }

  //step 3 more Information
  if (step === STEPS.INFO) {
    content = (
      <div className={styles.info}>
        <Header
          title="Share some basics about your place"
          subtitle="what amenities do you have?"
        />
        <div className={styles.counter}>
          <Counter
            value={listingData?.guestCount}
            title="How many people are allowed"
            subtitle="guest count"
            onChange={(value) =>
              setListingData((prev) => ({ ...prev, guestCount: value }))
            }
          />
          <Counter
            value={listingData?.bathroomCount}
            title="How many bathrooms do you have"
            subtitle="bathroom count"
            onChange={(value) =>
              setListingData((prev) => ({ ...prev, bathroomCount: value }))
            }
          />
          <Counter
            value={listingData?.roomCount}
            title="How many rooms are available"
            subtitle="room count"
            onChange={(value) =>
              setListingData((prev) => ({ ...prev, roomCount: value }))
            }
          />
        </div>
      </div>
    );
  }

  //step 4 image upload

  if (step === STEPS.IMAGES) {
    content = (
      <div>
        <Header
          title="Show an image of your space"
          subtitle="a cool image will be nice"
        />
        <div className={styles.imgUpload}>
          <ImageUpload
            value={listingData?.imageSrc}
            onChange={(value) => setListingData((prev) => ({ ...prev, imageSrc: value }))}
          />
        </div>
      </div>
    );
  }

  //step 5 title and description
  if (step === STEPS.DESCRIPTION) {
    content = (
      <div>
        <Header title="Describe your place" subtitle="Just be short and simple" />
        <div className={styles.desc}>
          <Input
            type="text"
            id="title"
            label="Title"
            placeholder="title"
            value={listingData.title}
            onChange={(e) =>
              setListingData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <TextArea
            label="Description"
            id="description"
            placeholder="describe your place"
            value={listingData.description}
            onChange={(e) =>
              setListingData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
      </div>
    );
  }

  //step 6 price
  if (step === STEPS.PRICE) {
    content = (
      <div>
        <Header
          title="Set your asking price"
          subtitle="how much do you charge per night"
        />
        <div className={styles.price}>
          <Input
            type="number"
            id="price"
            label="Price"
            placeholder="price"
            formatPrice
            value={listingData.price}
            onChange={(e) =>
              setListingData((prev) => ({ ...prev, price: Number(e.target.value) }))
            }
          />
        </div>
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
