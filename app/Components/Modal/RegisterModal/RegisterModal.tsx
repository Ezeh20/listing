"use client";
import styles from "./RegisterModal.module.scss";
import React, { useCallback, useState } from "react";
import Modal from "../Modal";
import useRegister from "@/app/hooks/useRegister";
import useLoginModal from "@/app/hooks/useLogin";
import axios from "axios";
import Header from "../../Header/Header";
import Input from "../../Input/Input";
import toast from "react-hot-toast";
import Button from "../../Button/Button";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { signIn } from "next-auth/react";

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
  const { isOpen, onClose } = useRegister();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [dataEntry, setDataEntry] = useState(initialEntry);
  const { name, email, password } = dataEntry;

  const data = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  const submit = async () => {
    // setIsLoading(true);
    try {
      const res = await axios.post("/api/register", data);
      console.log(res.data);
      toast.success(res.data.message);
      setTimeout(() => {
        onClose();
      }, 400);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const content = (
    <div className={styles.content}>
      <Header title="Welcome to my show" subtitle="Just a few more steps" />
      <form className={styles.form}>
        <Input
          value={data.name}
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
          value={data.email}
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
          value={data.password}
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

  const footer = (
    <div className={styles.footerContainer}>
      <div className={styles.footer}>
        <Button outline label="signin with google" icon={FcGoogle} onClick={()=> signIn("google")}/>
        <Button outline label="signin with github" icon={ImGithub} onClick={() => signIn("github")} />
      </div>
      <div className={styles.login}>
        <p>already have an account?</p>
        <p
          onClick={() => {
            onClose();
            loginModal.onOpen();
          }}
          className={styles.click}>
          Login
        </p>
      </div>
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
      footer={footer}
    />
  );
};

export default RegisterModal;
