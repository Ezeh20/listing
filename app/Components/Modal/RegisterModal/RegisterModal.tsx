"use client";
import styles from "./RegisterModal.module.scss";
import React, { useCallback, useState } from "react";
import Modal from "../Modal";
import useRegister from "@/app/hooks/useRegister";
import { useForm, FieldValue, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Header from "../../Header/Header";
import Input from "../../Input/Input";

const initialValue = {
  name: {
    value: "",
    error: false,
  },
  email: {
    value: "",
    error: false,
  },
  password: {
    value: "",
    error: false,
  },
};
const RegisterModal = () => {
  const { isOpen, onClose, onOpen } = useRegister();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialValue);
  
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
    <div className={styles.content}>
      <Header title="Welcome to my show" subtitle="Just a few more steps" />
      <form className={styles.form}>
        <Input label="Name" placeholder="fullname" id="fullname" />
        <Input
          label="Email"
          placeholder="email address"
          type="email"
          id="email"
        />
        <Input
          label="Password"
          placeholder="password"
          type="password"
          id="password"
        />
      </form>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      title="Register"
      content={content}
      actionLabel="continue"
      action={handleSubmit(Submit)}
    />
  );
};

export default RegisterModal;
