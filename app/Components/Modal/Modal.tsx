"use client";
import React, { useCallback, useEffect, useState } from "react";

interface ModalProps {
  disabled?: boolean;
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  content?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  disabled,
  isOpen,
  onClose,
  onSubmit,
  title,
  content,
  footer,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  //show modal if isOpen is true
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  /**
   * close the modal onClick
   * check if the modal is disabled first
   * return if disabled else run the function
   */
  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);
  return <div>Modal</div>;
};

export default Modal;
