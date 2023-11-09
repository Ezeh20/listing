"use client";
import React, { useCallback, useState } from "react";
import Modal from "../Modal";
import useRegister from "@/app/hooks/useRegister";
import { useForm, FieldValue, SubmitHandler } from "react-hook-form";
import axios from "axios";

const RegisterModal = () => {
  const { isOpen, onClose, onOpen } = useRegister();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValue>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const Submit: SubmitHandler<FieldValue> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const content = (
    <div>
      <p>ade</p>
    </div>
  );
 
  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        title="Register"
        actionLabel="continue"
        action={handleSubmit(Submit)}
        content={content}
      />
    </div>
  );
};

export default RegisterModal;
