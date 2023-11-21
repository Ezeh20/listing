"use client";
import styles from "./RegisterModal.module.scss";
import React, { useCallback, useState } from "react";
import Modal from "../Modal";
import useRegister from "@/app/hooks/useRegister";
import axios from "axios";
import Header from "../../Header/Header";
import Input from "../../Input/Input";

const initialEntry = {
  name: {
    value: "",
    error: false,
    errorMessage: "your name should atleast be 2 characters long",
  },
  email: {
    value: "",
    error: false,
    errorMessage: "enter a valid email address",
  },
  password: {
    value: "",
    error: false,
    errorMessage: "enter atleast 8 characters",
  },
};

const RegisterModal = () => {
  const { isOpen, onClose, onOpen } = useRegister();
  const [isLoading, setIsLoading] = useState(false);
  const [dataEntry, setDataEntry] = useState(initialEntry);
  const { name, email, password } = dataEntry;

  const data = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  
  const submit = () => {
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
        <Input
          value={name.value}
          label="Name"
          placeholder="fullname"
          id="fullname"
          error={name.error}
          errorMessage={name.errorMessage}
          onChange={(e) =>
            setDataEntry((prev) => ({
              ...prev,
              name: { value: e.target.value },
            }))
          }
        />
        <Input
          value={email.value}
          label="Email"
          placeholder="email address"
          type="email"
          id="email"
          error={email.error}
          errorMessage={email.errorMessage}
          onChange={(e) =>
            setDataEntry((prev) => ({
              ...prev,
              email: { value: e.target.value },
            }))
          }
        />
        <Input
          value={password.value}
          label="Password"
          placeholder="password"
          type="password"
          id="password"
          error={password.error}
          errorMessage={password.errorMessage}
          onChange={(e) =>
            setDataEntry((prev) => ({
              ...prev,
              password: { value: e.target.value },
            }))
          }
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
      action={submit}
    />
  );
};

export default RegisterModal;
