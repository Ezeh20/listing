"use client";
import React, { useCallback, useMemo } from "react";
import { Listing, Reservation } from "@prisma/client";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountry";
import styles from "./ListingCard.module.scss";
import { format } from "date-fns";
import Image from "next/image";

interface ListingCardProps {
  data: Listing;
  currentUser?: SafeUser | null;
  reservation?: Reservation;
  actionId?: string;
  onAction?: (e: string) => void;
  actionLabel?: string;
  disabled?: boolean;
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currentUser,
  reservation,
  actionId = "",
  onAction,
  actionLabel,
  disabled,
}) => {
  const router = useRouter();
  const { getSingleCountry } = useCountries();
  const location = getSingleCountry(data.locationValue);

  //this carries out an action without affect the entire div
  const handleCancle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;
      onAction?.(actionId);
    },
    [onAction, actionId]
  );

  //the price to be rendered shows the listing price or the total reservation price if this card is used for reservations
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  //display the reservation date if used in the reservation component
  const reservationDate = useMemo(() => {
    if (!reservation) return;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div onClick={() => router.push(`/listings/${data.id}`)} className={styles.container}>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image fill src={data.imageSrc} alt="listing image" className={styles.img} />
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
