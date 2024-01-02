"use client";
import React, { useCallback, useMemo, useState } from "react";
import { SafeUser } from "../types";
import useLoginModal from "./useLogin";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Params {
  id: string;
  currentUser?: SafeUser | null;
}

const useFavorites = ({ id, currentUser }: Params) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const loginModal = useLoginModal((state) => state.onOpen);

  //returns true or false
  const hasLiked = useMemo(() => {
    const list = currentUser?.favoritesId || [];
    return list.includes(id);
  }, [currentUser, id]);

  const toggleLike = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setDisabled(true);
      if (!currentUser) {
        return loginModal();
      }
      try {
        let request;
        if (hasLiked) {
          request = () => axios.delete(`/api/favourites/${id}`);
        } else {
          request = () => axios.post(`/api/favourites/${id}`);
        }
        const res = await request();

        if (res.status === 201) {
          toast.success("success");
          router.refresh();
          setDisabled(false);
        }
      } catch (error) {
        toast.error("something went wrong");
        setDisabled(false);
      }
    },
    [currentUser, hasLiked, id, loginModal, router]
  );

  return {
    disabled,
    hasLiked,
    toggleLike,
  };
};

export default useFavorites;
