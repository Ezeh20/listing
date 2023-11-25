"use client";
import styles from "../RegisterModal/RegisterModal.module.scss";
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
import { useRouter } from "next/navigation";

const initialEntry = {
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

const LoginModal = () => {
  const { isOpen, onClose, onOpen } = useRegister();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [dataEntry, setDataEntry] = useState(initialEntry);
  const { email, password } = dataEntry;
  const router = useRouter();

  const data = {
    email: email.value,
    password: password.value,
  };

  const submit = async () => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (res?.ok) {
      toast.success("Logged in successfully");
      router.refresh();
      setTimeout(() => {
        loginModal.onClose();
      }, 500);
    } else if (!res?.ok) {
      toast.error(res?.error);
    }
  };

  const content = (
    <div className={styles.content}>
      <Header title="Welcome back" subtitle="enter your details" />
      <form className={styles.form}>
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
        <Button outline label="signin with google" icon={FcGoogle} />
        <Button
          outline
          label="signin with github"
          icon={ImGithub}
          onClick={() => signIn("github")}
        />
      </div>
      <div className={styles.login}>
        <p>don`t have an account?</p>
        <p
          onClick={() => {
            loginModal.onClose();
            onOpen();
          }}
          className={styles.click}>
          Register
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Login"
      content={content}
      actionLabel="continue"
      action={submit}
      footer={footer}
    />
  );
};

export default LoginModal;
